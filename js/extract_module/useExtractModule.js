import { $, $$ } from "../dom.js";

class PDFExtractorApp {
  constructor() {
    this.extractor = null;
    this.currentFile = null;
    this.initializeApp();
  }

  initializeApp() {
    this.initializeExtractor();
    this.setupEventListeners();
    this.showMessage("Aplicación lista. Selecciona un archivo PDF.", "info");
  }

  async initializeExtractor() {
    try {
      this.extractor = new PDFTextExtractor();
      console.log("Extractor inicializado");
    } catch (error) {
      this.showMessage(
        "Error inicializando el extractor: " + error.message,
        "error"
      );
    }
  }

  setupEventListeners() {
    // File input
    document.getElementById("pdf-file").addEventListener("change", (e) => {
      this.handleFileSelect(e.target.files[0]);
    });

    // Extraction mode
    document
      .querySelectorAll('input[name="extraction-mode"]')
      .forEach((radio) => {
        radio.addEventListener("change", (e) => {
          this.handleExtractionModeChange(e.target.value);
        });
      });

    // Extract button
    document.getElementById("extract-btn").addEventListener("click", () => {
      this.handleExtraction();
    });

    // Clear button
    document.getElementById("clear-btn").addEventListener("click", () => {
      this.clearResults();
    });

    // Copy button
    document.getElementById("copy-btn").addEventListener("click", () => {
      this.copyToClipboard();
    });

    // Download button
    document.getElementById("download-btn").addEventListener("click", () => {
      this.downloadText();
    });

    // text  area 
    this.inputTextArea = $("#input-text");
    this.outputTextArea = $("#output-text");
  }

  async handleFileSelect(file) {
    if (!file) return;

    this.currentFile = file;

    try {
      this.showMessage("Cargando PDF...", "info");
      this.toggleExtractButton(false);

      const pdfInfo = await this.extractor.loadPDFFromFile(file);

      this.showMessage(`PDF cargado: ${pdfInfo.numPages} páginas`, "success");
      this.toggleExtractButton(true);
      this.updatePageInputs(pdfInfo.numPages);
    } catch (error) {
      this.showMessage("Error: " + error.message, "error");
      this.toggleExtractButton(false);
    }
  }

  handleExtractionModeChange(mode) {
    const rangeInputs = document.querySelector(".range-inputs");
    const singleInput = document.querySelector(".single-input");

    rangeInputs.style.display = mode === "range" ? "flex" : "none";
    singleInput.style.display = mode === "single" ? "flex" : "none";

    // Habilitar/deshabilitar inputs
    document.getElementById("start-page").disabled = mode !== "range";
    document.getElementById("end-page").disabled = mode !== "range";
    document.getElementById("single-page").disabled = mode !== "single";
  }

  async handleExtraction() {
    if (!this.extractor || !this.currentFile) {
      this.showMessage("Primero carga un archivo PDF", "error");
      return;
    }

    try {
      const options = this.getExtractionOptions();
      this.showProgress(true);
      this.toggleExtractButton(false);

      const text = await this.extractor.extractText(
        options,
        (current, total, page) => {
          this.updateProgress(current, total, page);
        }
      );

      this.displayResults(text, options);
      this.showMessage("Texto extraído correctamente", "success");
    } catch (error) {
      this.showMessage("Error extrayendo texto: " + error.message, "error");
    } finally {
      this.showProgress(false);
      this.toggleExtractButton(true);
    }
  }

  getExtractionOptions() {
    const mode = document.querySelector(
      'input[name="extraction-mode"]:checked'
    ).value;

    const options = { mode };

    if (mode === "single") {
      options.singlePage =
        parseInt(document.getElementById("single-page").value) || 1;
    } else if (mode === "range") {
      options.startPage =
        parseInt(document.getElementById("start-page").value) || 1;
      options.endPage =
        parseInt(document.getElementById("end-page").value) || 1;
    }

    return options;
  }

  displayResults(text, options) {
    const resultsSection = document.getElementById("results-section");
    const textOutput = document.getElementById("text-output");
    const resultsInfo = document.getElementById("results-info");

    this.outputTextArea = $("#output-text");
    this.inputTextArea = $("#input-text");

    // Actualizar información
    let infoText = `Archivo: ${this.currentFile.name} | `;

    if (options.mode === "single") {
      infoText += `Página: ${options.singlePage}`;
    } else if (options.mode === "range") {
      infoText += `Páginas: ${options.startPage}-${options.endPage}`;
    } else {
      infoText += `Todas las páginas (${this.extractor.getPDFInfo().numPages})`;
    }

    infoText += ` | Caracteres: ${text.length}`;

    resultsInfo.textContent = infoText;
    // textOutput.textContent = text;
    this.inputTextArea.value = text;
    resultsSection.style.display = "block";

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: "smooth" });
  }

  clearResults() {
    document.getElementById("pdf-file").value = "";
    document.getElementById("results-section").style.display = "none";
    document.getElementById("text-output").textContent = "";
    this.toggleExtractButton(false);
    this.currentFile = null;

    if (this.extractor) {
      this.extractor.destroy();
    }

    this.showMessage("Interfaz limpiada", "info");
  }

  async copyToClipboard() {
    const textOutput = document.getElementById("text-output");

    if (!textOutput.textContent) {
      this.showMessage("No hay texto para copiar", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(textOutput.textContent);
      this.showMessage("Texto copiado al portapapeles", "success");
    } catch (error) {
      this.showMessage("Error al copiar el texto", "error");
    }
  }

  downloadText() {
    const textOutput = document.getElementById("text-output");

    if (!textOutput.textContent) {
      this.showMessage("No hay texto para descargar", "error");
      return;
    }

    const blob = new Blob([textOutput.textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    const filename = this.currentFile
      ? this.currentFile.name.replace(".pdf", "_texto.txt")
      : "texto_extraido.txt";

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showMessage("Texto descargado correctamente", "success");
  }

  updateProgress(current, total, page) {
    const percentage = (current / total) * 100;
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `Procesando página ${page} de ${total} (${Math.round(
      percentage
    )}%)`;
  }

  showProgress(show) {
    document.getElementById("progress-section").style.display = show
      ? "block"
      : "none";

    if (!show) {
      document.getElementById("progress-fill").style.width = "0%";
      document.getElementById("progress-text").textContent = "Procesando...";
    }
  }

  toggleExtractButton(enabled) {
    document.getElementById("extract-btn").disabled = !enabled;
  }

  updatePageInputs(maxPages) {
    document.getElementById("single-page").max = maxPages;
    document.getElementById("start-page").max = maxPages;
    document.getElementById("end-page").max = maxPages;
    document.getElementById("end-page").value = maxPages;
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll(".status-message");
    existingMessages.forEach((msg) => msg.remove());

    const messageElem = document.createElement("div");
    messageElem.className = `status-message message-${type}`;
    messageElem.textContent = message;

    document.getElementById("status-messages").appendChild(messageElem);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (messageElem.parentNode) {
        messageElem.parentNode.removeChild(messageElem);
      }
    }, 4000);
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new PDFExtractorApp();
});
