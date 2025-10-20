import { $, $$ } from "./dom.js";
import { Modal } from "./modal.js";

class TranslatorApp {
  static DEFAULT_SOURCE_LANG = "es";
  static DEFAULT_TARGET_LANG = "en";

  constructor() {
    this.detector = null;
    this.hasNativeDetector = false;
    this.hasNativeTranslator = false;
    this.translators = {}; // Cache de traductores por par de idiomas
    this.currentTranslator = null;
    this.currentDetectedLang = null;
    this.isModelLoaded = false;
  }

  async init() {
    this.checkAPIAvailability();
    // recuperamos los elementos del DOM
    this.inputTextArea = $("#input-text");
    this.outputTextArea = $("#output-text");
    this.sourceLangSelect = $("#source-lang");
    this.targetLangSelect = $("#target-lang");

    // BOTON TRANSLATE
    this.translateButton = $("#translate-button");

    this.targetLangSelect.value = TranslatorApp.DEFAULT_TARGET_LANG;

    this.sourceLangSelect.value = TranslatorApp.DEFAULT_SOURCE_LANG;

    this.setupEventListeners();

    // detector
    this.initDetector();
  }

  async activateTranslator() {
    try {
      const activateBtn = $("#label-text-activation");
      activateBtn.textContent = "🔄 Activando Traductor...";
      activateBtn.disabled = true;

      // precargar el modelo
      await this.createTranslator(
        TranslatorApp.DEFAULT_SOURCE_LANG,
        TranslatorApp.DEFAULT_TARGET_LANG
      );

      this.isModelLoaded = true;
      activateBtn.textContent = "";

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
      // console.log("Native translation and detection API available.");
    }
  }

  async initDetector() {
    if (!this.hasNativeDetector) return false;
    try {
      this.detector = await LanguageDetector.create();
      // console.log("Language detector initialized");
      return true;
    } catch (error) {
      // console.error("Error creating detector:", error);
      return false;
    }
  }

  // Detectar el idioma de un texto
  async detectLanguage(text) {
    if (!this.detector) {
      await this.initDetector();
    }
    const results = await this.detector.detect(text);
    return results[0]; // Retorna el resultado más probable
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

      // console.log(
      //   `Translator availability for ${sourceLang} to ${targetLang}: ${status}`
      // );

      // Manejamos los diferentes estados de disponibilidad
      switch (status) {
        case "ready":
          break; // Podemos continuar
        case "downloadable":
        case "downloading":
          throw new Error(
            "Por favor, interactúa con la página para permitir la descarga del modelo de traducción"
          );
        case "unavailable":
          throw new Error(
            `La traducción de ${sourceLang} a ${targetLang} no está disponible`
          );
      }

      // Creamos el traductor solo si está disponible
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

      // console.log("Translator ready:", translator);

      // Traducir
      const translatedText = await translator.translate(text);
      // console.log(`Translated text: ${translatedText}`);

      return {
        translatedText: translatedText,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        wasTranslated: true,
      };
    } catch (error) {
      // console.error("Error translating text:", error);
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

    // Evento para activar el traductor
    this.activateTranslator();

    translateButton.addEventListener("click", async () => {
      const text = this.inputTextArea.value.trim();

      if (!text) {
        this.outputTextArea.value = "Please enter text to translate.";
        return;
      }

      const targetLang = this.targetLangSelect.value;

      try {
        const result = await this.translateText(text, targetLang);
        this.outputTextArea.value = result.translatedText;
      } catch (error) {
        // console.error("Translation failed:", error);
        this.outputTextArea.value = "Error: " + error.message;

        if (error.message.includes("interactúa con la página")) {
          this.outputTextArea.value =
            "Please click 'Translate' again to download the translation model.";
        }
      }
    });
  }
}

const translatorApp = new TranslatorApp();

document.addEventListener("DOMContentLoaded", () => {
  translatorApp.init();
});
