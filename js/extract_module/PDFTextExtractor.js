// Módulo para extracción de texto de PDF
class PDFTextExtractor {
    constructor() {
        this.pdfDoc = null;
        this.isInitialized = false;
        
        // Configurar PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/lib/pdf.worker.min.js';
        
        this.initialize();
    }

    async initialize() {
        try {
            // Verificar que PDF.js esté cargado
            if (typeof pdfjsLib === 'undefined') {
                throw new Error('PDF.js no está cargado correctamente');
            }
            this.isInitialized = true;
            console.log('PDFTextExtractor inicializado correctamente');
        } catch (error) {
            console.error('Error inicializando PDFTextExtractor:', error);
            throw error;
        }
    }

    /**
     * Carga un PDF desde un archivo
     * @param {File} file - Archivo PDF
     * @returns {Promise<Object>} - Información del PDF cargado
     */
    async loadPDFFromFile(file) {
        if (!this.isInitialized) {
            throw new Error('PDFTextExtractor no está inicializado');
        }

        if (!file || file.type !== 'application/pdf') {
            throw new Error('Por favor selecciona un archivo PDF válido');
        }

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            
            fileReader.onload = async () => {
                try {
                    const typedarray = new Uint8Array(fileReader.result);
                    const loadingTask = pdfjsLib.getDocument(typedarray);
                    
                    this.pdfDoc = await loadingTask.promise;
                    
                    resolve({
                        numPages: this.pdfDoc.numPages,
                        fileSize: file.size,
                        fileName: file.name
                    });
                } catch (error) {
                    reject(new Error('Error al cargar el PDF: ' + error.message));
                }
            };
            
            fileReader.onerror = () => {
                reject(new Error('Error al leer el archivo'));
            };
            
            fileReader.readAsArrayBuffer(file);
        });
    }

    /**
     * Carga un PDF desde una URL
     * @param {string} url - URL del PDF
     * @returns {Promise<Object>} - Información del PDF cargado
     */
    async loadPDFFromURL(url) {
        if (!this.isInitialized) {
            throw new Error('PDFTextExtractor no está inicializado');
        }

        try {
            const loadingTask = pdfjsLib.getDocument(url);
            this.pdfDoc = await loadingTask.promise;
            
            return {
                numPages: this.pdfDoc.numPages,
                fileSize: null,
                fileName: url.split('/').pop() || 'document.pdf'
            };
        } catch (error) {
            throw new Error('Error al cargar el PDF desde la URL: ' + error.message);
        }
    }

    /**
     * Extrae texto de una página específica
     * @param {number} pageNum - Número de página (1-based)
     * @returns {Promise<string>} - Texto extraído
     */
    async extractTextFromPage(pageNum) {
        if (!this.pdfDoc) {
            throw new Error('No hay PDF cargado');
        }

        if (pageNum < 1 || pageNum > this.pdfDoc.numPages) {
            throw new Error(`Número de página inválido. Debe estar entre 1 y ${this.pdfDoc.numPages}`);
        }

        try {
            const page = await this.pdfDoc.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            // Concatenar y limpiar el texto
            let text = '';
            for (const item of textContent.items) {
                text += item.str + ' ';
            }
            
            return this.cleanText(text);
        } catch (error) {
            throw new Error(`Error extrayendo texto de página ${pageNum}: ${error.message}`);
        }
    }

    /**
     * Extrae texto de un rango de páginas
     * @param {number} startPage - Página inicial
     * @param {number} endPage - Página final
     * @param {Function} onProgress - Callback de progreso
     * @returns {Promise<string>} - Texto extraído
     */
    async extractTextFromRange(startPage, endPage, onProgress = null) {
        if (!this.pdfDoc) {
            throw new Error('No hay PDF cargado');
        }

        if (startPage < 1 || endPage > this.pdfDoc.numPages || startPage > endPage) {
            throw new Error('Rango de páginas inválido');
        }

        try {
            let fullText = '';
            const totalPages = endPage - startPage + 1;
            
            for (let i = 0; i < totalPages; i++) {
                const currentPage = startPage + i;
                
                if (onProgress) {
                    onProgress(i + 1, totalPages, currentPage);
                }
                
                const pageText = await this.extractTextFromPage(currentPage);
                fullText += `--- Página ${currentPage} ---\n${pageText}\n\n`;
                
                // Pequeña pausa para no sobrecargar
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            return fullText;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Extrae texto de todas las páginas
     * @param {Function} onProgress - Callback de progreso
     * @returns {Promise<string>} - Texto extraído
     */
    async extractAllText(onProgress = null) {
        if (!this.pdfDoc) {
            throw new Error('No hay PDF cargado');
        }

        return this.extractTextFromRange(1, this.pdfDoc.numPages, onProgress);
    }

    /**
     * Extrae texto según diferentes opciones
     * @param {Object} options - Opciones de extracción
     * @param {Function} onProgress - Callback de progreso
     * @returns {Promise<string>} - Texto extraído
     */
    async extractText(options = {}, onProgress = null) {
        const { 
            mode = 'all', 
            singlePage = 1, 
            startPage = 1, 
            endPage = 1 
        } = options;

        switch (mode) {
            case 'single':
                return await this.extractTextFromPage(singlePage);
            
            case 'range':
                return await this.extractTextFromRange(startPage, endPage, onProgress);
            
            case 'all':
            default:
                return await this.extractAllText(onProgress);
        }
    }

    /**
     * Limpia y formatea el texto extraído
     * @param {string} text - Texto a limpiar
     * @returns {string} - Texto limpio
     */
    cleanText(text) {
        return text
            .replace(/\s+/g, ' ') // Múltiples espacios por uno
            .replace(/([.!?])\s+/g, '$1\n') // Nuevas líneas después de puntuación
            .replace(/\s+\./g, '.') // Espacios antes de puntos
            .trim();
    }

    /**
     * Obtiene información del PDF cargado
     * @returns {Object|null} - Información del PDF
     */
    getPDFInfo() {
        if (!this.pdfDoc) return null;
        
        return {
            numPages: this.pdfDoc.numPages,
            isLoaded: true
        };
    }

    /**
     * Libera recursos
     */
    destroy() {
        if (this.pdfDoc) {
            this.pdfDoc.destroy();
            this.pdfDoc = null;
        }
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.PDFTextExtractor = PDFTextExtractor;
}