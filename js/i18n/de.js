export default {
    title: "Übersetzer",
    inputPlaceholder: "Text zum Übersetzen eingeben...",
    outputPlaceholder: "Übersetzter Text...",
    labels: {
        textToTranslate: "Zu übersetzender Text",
        targetLanguage: "Zielsprache",
        activation: "Übersetzer-Status",
    },
    buttons: {
        translate: "Übersetzen",
        activateTranslator: "Übersetzer aktivieren",
        extractText: "Text extrahieren",
        clear: "Löschen",
        copy: "Kopieren",
        download: "Herunterladen"
    },
    languages: {
        automatic: "Automatisch",
        english: "Englisch",
        spanish: "Spanisch",
        french: "Französisch",
        german: "Deutsch",
        italian: "Italienisch",
        portuguese: "Portugiesisch",
        japanese: "Japanisch",
        chinese: "Chinesisch"
    },
    messages: {
        activating: "🔄 Übersetzer wird aktiviert...",
        activated: "Übersetzer aktiviert ✅",
        enterText: "Bitte geben Sie Text zum Übersetzen ein.",
        translationError: "Übersetzungsfehler: ",
        modelRequired: "Bitte klicken Sie auf 'Übersetzer aktivieren', um den Download des Modells zu ermöglichen, und versuchen Sie es dann erneut.",
        pdfExtractor: {
            ready: "Anwendung bereit. Wählen Sie eine PDF-Datei aus.",
            loading: "PDF wird geladen...",
            pdfLoaded: "PDF geladen: {0} Seiten",
            extracting: "Text wird extrahiert...",
            processing: "Verarbeite Seite {0} von {1} ({2}%)",
            noFile: "Bitte laden Sie zuerst eine PDF-Datei",
            extracted: "Text erfolgreich extrahiert",
            error: "Fehler beim Extrahieren des Textes: {0}",
            fileInfo: "Datei: {0}",
            pageInfo: "Seite: {0}",
            pagesInfo: "Seiten: {0}-{1}",
            allPages: "Alle Seiten ({0})",
            characters: "Zeichen: {0}",
            interfaceCleared: "Oberfläche gelöscht",
            noCopyText: "Kein Text zum Kopieren",
            copied: "Text in die Zwischenablage kopiert",
            copyError: "Fehler beim Kopieren des Textes",
            noDownloadText: "Kein Text zum Herunterladen",
            downloaded: "Text erfolgreich heruntergeladen"
        }
    },
    navigation: {
        resources: "Ressourcen",
        language: "Sprache",
        help: "Hilfe"
    }
};