export default {
    title: "Translator",
    inputPlaceholder: "Write the text to be translated...",
    outputPlaceholder: "Translated text...",
    labels: {
        textToTranslate: "Text to translate",
        targetLanguage: "Target Language",
        activation: "Translator Status",
    },
    buttons: {
        translate: "Translate",
        activateTranslator: "Activate Translator",
        extractText: "Extract Text",
        clear: "Clear",
        copy: "Copy",
        download: "Download"
    },
    languages: {
        automatic: "Automatic",
        english: "English",
        spanish: "Spanish",
        french: "French",
        german: "German",
        italian: "Italian",
        portuguese: "Portuguese",
        japanese: "Japanese",
        chinese: "Chinese"
    },
    messages: {
        activating: "🔄 Activating Translator...",
        activated: "Translator Activated ✅",
        enterText: "Please enter text to translate.",
        translationError: "Translation error: ",
        modelRequired: "Please click 'Activate Translator' to allow model download, then try again.",
        pdfExtractor: {
            ready: "Application ready. Select a PDF file.",
            loading: "Loading PDF...",
            pdfLoaded: "PDF loaded: {0} pages",
            extracting: "Extracting text...",
            processing: "Processing page {0} of {1} ({2}%)",
            noFile: "Please load a PDF file first",
            extracted: "Text extracted successfully",
            error: "Error extracting text: {0}",
            fileInfo: "File: {0}",
            pageInfo: "Page: {0}",
            pagesInfo: "Pages: {0}-{1}",
            allPages: "All pages ({0})",
            characters: "Characters: {0}",
            interfaceCleared: "Interface cleared",
            noCopyText: "No text to copy",
            copied: "Text copied to clipboard",
            copyError: "Error copying text",
            noDownloadText: "No text to download",
            downloaded: "Text downloaded successfully"
        }
    },
    navigation: {
        resources: "Resources",
        language: "Language",
        help: "Help"
    }
};