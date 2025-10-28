export default {
    title: "Traduttore",
    inputPlaceholder: "Scrivi il testo da tradurre...",
    outputPlaceholder: "Testo tradotto...",
    labels: {
        textToTranslate: "Testo da tradurre",
        targetLanguage: "Lingua di destinazione",
        activation: "Stato del traduttore",
    },
    buttons: {
        translate: "Traduci",
        activateTranslator: "Attiva traduttore",
        extractText: "Estrai testo",
        clear: "Cancella",
        copy: "Copia",
        download: "Scarica"
    },
    languages: {
        automatic: "Automatico",
        english: "Inglese",
        spanish: "Spagnolo",
        french: "Francese",
        german: "Tedesco",
        italian: "Italiano",
        portuguese: "Portoghese",
        japanese: "Giapponese",
        chinese: "Cinese"
    },
    messages: {
        activating: "🔄 Attivazione traduttore...",
        activated: "Traduttore attivato ✅",
        enterText: "Inserisci il testo da tradurre.",
        translationError: "Errore di traduzione: ",
        modelRequired: "Clicca su 'Attiva traduttore' per consentire il download del modello, poi riprova.",
        pdfExtractor: {
            ready: "Applicazione pronta. Seleziona un file PDF.",
            loading: "Caricamento PDF...",
            pdfLoaded: "PDF caricato: {0} pagine",
            extracting: "Estrazione del testo...",
            processing: "Elaborazione pagina {0} di {1} ({2}%)",
            noFile: "Carica prima un file PDF",
            extracted: "Testo estratto con successo",
            error: "Errore nell'estrazione del testo: {0}",
            fileInfo: "File: {0}",
            pageInfo: "Pagina: {0}",
            pagesInfo: "Pagine: {0}-{1}",
            allPages: "Tutte le pagine ({0})",
            characters: "Caratteri: {0}",
            interfaceCleared: "Interfaccia pulita",
            noCopyText: "Nessun testo da copiare",
            copied: "Testo copiato negli appunti",
            copyError: "Errore nella copia del testo",
            noDownloadText: "Nessun testo da scaricare",
            downloaded: "Testo scaricato con successo"
        }
    },
    navigation: {
        resources: "Risorse",
        language: "Lingua",
        help: "Aiuto"
    }
};