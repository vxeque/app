import { $, $$ } from "./dom.js";
import { ModalManager } from "./extract_module/modal.js";
// import { PDFTextExtractor } from "./extract_module/PDFTextExtractor.js";

class TranslatorApp {
  static DEFAULT_SOURCE_LANG = "es";
  static DEFAULT_TARGET_LANG = "en";

  constructor() {
    this.detector = null;
    this.hasNativeDetector = false;
    this.hasNativeTranslator = false;
    this.translators = {}; // Cache of translators by language pair
    this.currentTranslator = null;
    this.currentDetectedLang = null;
    this.isModelLoaded = false;
  }

  async init() {
    this.checkAPIAvailability();
    // get DOM elements
    this.inputTextArea = $("#input-text");
    this.outputTextArea = $("#output-text");
    this.sourceLangSelect = $("#source-lang");
    this.targetLangSelect = $("#target-lang");

    // BOTON TRANSLATE
    this.translateButton = $("#translate-button");

    this.targetLangSelect.value = TranslatorApp.DEFAULT_TARGET_LANG;

    this.sourceLangSelect.value = TranslatorApp.DEFAULT_SOURCE_LANG;



    // detectar version chrome
    this.checkChromeVersion();

    this.setupEventListeners();

    // detector
    this.initDetector();

    const extractor = new PDFTextExtractor();
  }

  checkChromeVersion() {
    const userAgent = navigator.userAgent;
    const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
    if (chromeMatch) {
      const chromeVersion = parseInt(chromeMatch[1], 10);
      console.log(`Chrome version detected: ${chromeVersion}`);
    } else {
      console.log("Chrome version not detected");
    }
  }

  async activateTranslator() {
    try {
      const activateBtn = $("#label-text-activation");

      activateBtn.textContent = "🔄 Activating Translator...";
      activateBtn.disabled = true;

      // preload the model
      await this.createTranslator(
        TranslatorApp.DEFAULT_SOURCE_LANG,
        TranslatorApp.DEFAULT_TARGET_LANG
      );

      this.isModelLoaded = true;
      activateBtn.textContent = "Translator Activated ✅";
    } catch (error) {
      console.error("Error activating translator:", error);
    }
  }

  checkAPIAvailability() {
    this.hasNativeTranslator = "Translator" in window;
    this.hasNativeDetector = "LanguageDetector" in window;

    if (!this.hasNativeTranslator || !this.hasNativeDetector) {
      console.warn("Native translation or detection API not available.");
    } else {
      console.log("Native translation and detection API available.");
    }
  }

  async initDetector() {
    if (!this.hasNativeDetector) return false;
    try {
      this.detector = await LanguageDetector.create();
      console.log("Language detector initialized");
      return true;
    } catch (error) {
      console.error("Error creating detector:", error);
      return false;
    }
  }

  // Detect the language of a text
  async detectLanguage(text) {
    if (!this.detector) {
      await this.initDetector();
    }
    const results = await this.detector.detect(text);
    return results[0]; // Returns the most probable result
  }

  async createTranslator(sourceLang, targetLang) {
    const key = `${sourceLang}-${targetLang}`;
    if (this.translators[key]) {
      return this.translators[key];
    }

    try {
      // Primero verificamos la disponibilidad
      const status = await Translator.availability({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });

      console.log(
        `Translator availability for ${sourceLang} to ${targetLang}: ${status}`
      );

      //
      this.agregarOptionSiNoExiste(
        this.sourceLangSelect.id,
        sourceLang,
        sourceLang
      );

      // Manejamos los diferentes estados de disponibilidad.
      // Si el modelo es "downloadable" o "downloading", intentamos crear el traductor
      // porque la llamada debería realizarse tras un gesto del usuario (click).
      if (status === "unavailable") {
        throw new Error(
          `La traducción de ${sourceLang} a ${targetLang} no está disponible`
        );
      }

      // Intentamos crear el traductor; si el navegador bloquea la descarga por no haber
      // interacción del usuario, Translator.create debería rechazar y lo capturamos abajo.
      const translator = await Translator.create({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });

      this.translators[key] = translator;
      return translator;
    } catch (error) {
      console.error("Error creating translator:", error);
      throw error;
    }
  }

  agregarOptionSiNoExiste(selectId, valor, texto) {
    const select = document.getElementById(selectId);
    const existe = Array.from(select.options).some(
      (opt) => opt.value === valor
    );

    if (!existe) {
      const nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = valor;
      nuevaOpcion.text = texto;
      select.appendChild(nuevaOpcion);
    }

    // (Opcional) seleccionar automáticamente la nueva opción
    select.value = valor;
  }

  // Traducir un texto
  async translateText(text, targetLang = "en") {
    try {
      // detectar el idioma del texto
      const detection = await this.detectLanguage(text);
      const sourceLang = detection.detectedLanguage;

      // console.log(`Detected language: ${sourceLang} (${detection.confidence})`);

      // Si ya está en el idioma objetivo, no traducir
      if (sourceLang === targetLang) {
        return {
          translatedText: text,
          sourceLanguage,
          targetLanguage,
          wasTranslated: false,
        };
      }

      // Crear/obtener el traductor
      const translator = await this.createTranslator(sourceLang, targetLang);

      console.log("Translator ready:", translator);

      // Traducir
      const translatedText = await translator.translate(text);
      console.log(`Translated text: ${translatedText}`);

      return {
        translatedText: translatedText,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        wasTranslated: true,
      };
    } catch (error) {
      console.error("Error translating text:", error);
      throw error;
    }
  }

  // Traducir con idioma de origen conocido
  async translateFromTo(text, sourceLanguage, targetLanguage) {
    try {
      const translator = await this.createTranslator(
        sourceLanguage,
        targetLanguage
      );
      const translatedText = await translator.translate(text);

      return {
        translatedText,
        sourceLanguage,
        targetLanguage,
        wasTranslated: true,
      };
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  }

  async setupEventListeners() {
    // Agregamos un manejador de eventos para el botón de traducción
    const translateButton = $("#translate-button"); // Asegúrate de tener este botón en tu HTML
    const activateButton = $("#activate-translator-button");

    // boton para activar extractor de texto de pdf
    const buttonAttachFile = $(".button-attach-file");

    // Activation button must be clicked by user to allow model download
    if (activateButton) {
      activateButton.addEventListener("click", async () => {
        try {
          await this.activateTranslator();
        } catch (err) {
          console.error("Activation failed:", err);
        }
      });
    }

    translateButton.addEventListener("click", async () => {
      const text = this.inputTextArea.value.trim();

      if (!text) {
        this.outputTextArea.value = "Please enter text to translate.";
        return;
      }

      const targetLang = this.targetLangSelect.value;

      try {
        // If model not loaded yet, try to create translator now (this click is a user gesture)
        if (!this.isModelLoaded) {
          try {
            await this.createTranslator(
              TranslatorApp.DEFAULT_SOURCE_LANG,
              targetLang
            );
            this.isModelLoaded = true;
            const label = $("#label-text-activation");
            // if (label) label.textContent = "Traductor Activado ✅";

            // Cambiar el ícono del botón a "download_done.svg"
            const closeImgEl = $(".button-close-download");
            if (closeImgEl) {
              // If the selected element is the <img> itself
              if (
                closeImgEl.tagName &&
                closeImgEl.tagName.toLowerCase() === "img"
              ) {
                closeImgEl.src = "static/download_done.svg";
              } else if (closeImgEl.querySelector) {
                // Otherwise, look for an <img> inside it
                const imgChild = closeImgEl.querySelector("img");
                if (imgChild) imgChild.src = "static/download_done.svg";
              }
            }
          } catch (createErr) {
            console.error(
              "Error creating translator on user gesture:",
              createErr
            );
            // If creation failed because the model requires more explicit user interaction,
            // instruct the user to click the activation button.
            if (createErr.message && createErr.message.includes("interactúa")) {
              this.outputTextArea.value =
                "Please click 'Activate Translator' to allow model download, then try again.";
              return;
            } else {
              this.outputTextArea.value = "Error: " + createErr.message;
              return;
            }
          }
        }

        const result = await this.translateText(text, targetLang);
        this.outputTextArea.value = result.translatedText;
      } catch (error) {
        console.error("Translation failed:", error);
        this.outputTextArea.value = "Error: " + error.message;
      }
    });

    /**
     * 
     * creación de modal para extraer texto de PDF
     * 
     * */
    // PDF extractor button
    // buttonAttachFile.addEventListener("click", async () => {
    //   const pdfExtractorContainer = $(".pdf-extractor-container");
    //   pdfExtractorContainer.style.display = pdfExtractorContainer.style.display === "none" ? "block" : "none";

    //   // modal open button
    //   const modal1Button = $(".modal1");

    //   if (modal1Button) {
    //     modal1Button.addEventListener("click",
    //       () => {
    //         openModal('miModal1');
    //       });
    //   }
    // });

    const modalManager = new ModalManager();
    buttonAttachFile.addEventListener("click", async () => {
      // abrir modal 
      modalManager.open('miModal1');
      // if (modalManager.getStateModal('miModal1')) {
      //   modalManager.close('miModal1');
      // }
    })
  
    const modalcloseButton = $(".close-button");
    
      modalcloseButton.addEventListener("click", () => {
        modalManager.close('miModal1');
      });}

    
  /**
   *
   * Extract text from uploaded PDF
   *
   */

  async extractTextFromPDF(file) {
    // uso independiente del PDFTextExtractor
    const extractor = new PDFTextExtractor();

    // cargar pdf
    const pdfInfo = await extractor.loadPDFFromFile(file);

    // extraer texto
    const text = await extractor.extractTextAllPages((current, total, page) => {
      console.log(`Extracting page ${current} of ${total}`);
    });

    return {
      text,
    };
  }
}
const translatorApp = new TranslatorApp();

document.addEventListener("DOMContentLoaded", () => {
  translatorApp.init();
});
