export default {
    title: "Traducteur",
    inputPlaceholder: "Écrivez le texte à traduire...",
    outputPlaceholder: "Texte traduit...",
    labels: {
        textToTranslate: "Texte à traduire",
        targetLanguage: "Langue cible",
        activation: "État du traducteur",
    },
    buttons: {
        translate: "Traduire",
        activateTranslator: "Activer le traducteur",
        extractText: "Extraire le texte",
        clear: "Effacer",
        copy: "Copier",
        download: "Télécharger"
    },
    languages: {
        automatic: "Automatique",
        english: "Anglais",
        spanish: "Espagnol",
        french: "Français",
        german: "Allemand",
        italian: "Italien",
        portuguese: "Portugais",
        japanese: "Japonais",
        chinese: "Chinois"
    },
    messages: {
        activating: "🔄 Activation du traducteur...",
        activated: "Traducteur activé ✅",
        enterText: "Veuillez entrer le texte à traduire.",
        translationError: "Erreur de traduction: ",
        modelRequired: "Veuillez cliquer sur 'Activer le traducteur' pour permettre le téléchargement du modèle, puis réessayez.",
        pdfExtractor: {
            ready: "Application prête. Sélectionnez un fichier PDF.",
            loading: "Chargement du PDF...",
            pdfLoaded: "PDF chargé: {0} pages",
            extracting: "Extraction du texte...",
            processing: "Traitement de la page {0} sur {1} ({2}%)",
            noFile: "Veuillez d'abord charger un fichier PDF",
            extracted: "Texte extrait avec succès",
            error: "Erreur lors de l'extraction du texte: {0}",
            fileInfo: "Fichier: {0}",
            pageInfo: "Page: {0}",
            pagesInfo: "Pages: {0}-{1}",
            allPages: "Toutes les pages ({0})",
            characters: "Caractères: {0}",
            interfaceCleared: "Interface nettoyée",
            noCopyText: "Pas de texte à copier",
            copied: "Texte copié dans le presse-papiers",
            copyError: "Erreur lors de la copie du texte",
            noDownloadText: "Pas de texte à télécharger",
            downloaded: "Texte téléchargé avec succès"
        }
    },
    navigation: {
        resources: "Ressources",
        language: "Langue",
        help: "Aide"
    }
};