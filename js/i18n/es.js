export default {
    title: "Traductor",
    inputPlaceholder: "Escribe el texto a traducir...",
    outputPlaceholder: "Texto traducido...",
    labels: {
        textToTranslate: "Texto a traducir",
        targetLanguage: "Idioma objetivo",
        activation: "Estado del Traductor",
    },
    buttons: {
        translate: "Traducir",
        activateTranslator: "Activar Traductor",
        extractText: "Extraer Texto",
        clear: "Limpiar",
        copy: "Copiar",
        download: "Descargar"
    },
    languages: {
        automatic: "Automático",
        english: "Inglés",
        spanish: "Español",
        french: "Francés",
        german: "Alemán",
        italian: "Italiano",
        portuguese: "Portugués",
        japanese: "Japonés",
        chinese: "Chino"
    },
    messages: {
        activating: "🔄 Activando Traductor...",
        activated: "Traductor Activado ✅",
        enterText: "Por favor, ingresa texto para traducir.",
        translationError: "Error de traducción: ",
        modelRequired: "Por favor, haz clic en 'Activar Traductor' para permitir la descarga del modelo, luego intenta de nuevo.",
        pdfExtractor: {
            ready: "Aplicación lista. Selecciona un archivo PDF.",
            loading: "Cargando PDF...",
            pdfLoaded: "PDF cargado: {0} páginas",
            extracting: "Extrayendo texto...",
            processing: "Procesando página {0} de {1} ({2}%)",
            noFile: "Por favor carga un archivo PDF primero",
            extracted: "Texto extraído correctamente",
            error: "Error extrayendo texto: {0}",
            fileInfo: "Archivo: {0}",
            pageInfo: "Página: {0}",
            pagesInfo: "Páginas: {0}-{1}",
            allPages: "Todas las páginas ({0})",
            characters: "Caracteres: {0}",
            interfaceCleared: "Interfaz limpiada",
            noCopyText: "No hay texto para copiar",
            copied: "Texto copiado al portapapeles",
            copyError: "Error al copiar el texto",
            noDownloadText: "No hay texto para descargar",
            downloaded: "Texto descargado correctamente"
        }
    },
    navigation: {
        resources: "Recursos",
        language: "Idioma",
        help: "Ayuda"
    }
};