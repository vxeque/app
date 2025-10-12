import { $, $$ } from "./dom.js";

class Translator {
  static LENGUAGES = {
    es: "Español",
    en: "Inglés",
    fr: "Francés",
    de: "Alemán",
    it: "Italiano",
    pt: "Portugués",
    ja: "Japonés",
    zh: "Chino",
  };

  static FULL_LANGUAGES = {
    es: "es-ES",
    en: "en-US",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    pt: "pt-PT",
    ja: "ja-JP",
    zh: "zh-CN",
  };

  static DEFAULT_SOURCE_LANG = "es";
  static DEFAULT_TARGET_LANG = "en";

  constructor() {
    this.init();
    // this.setupEventListeners();

    this.currentTranslator = null;
    this.currentDetectedLang = null;
  }

  init() {
    this.checkAPIAvailability();
console.log("hola");
    // elementos del dom
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
}

const translator = new Translator();
