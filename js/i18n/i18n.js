class I18nManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = new Map();
        this.defaultLanguage = 'en';
        this.setupLanguageSelector();
    }

    setupLanguageSelector() {
        document.querySelectorAll('.language-list li[data-lang]').forEach(li => {
            li.addEventListener('click', () => {
                const lang = li.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    async init() {
        try {
            // Load default language first
            await this.loadLanguage(this.defaultLanguage);
            
            // Try to load browser's language
            const browserLang = navigator.language.split('-')[0];
            if (browserLang !== this.defaultLanguage) {
                await this.loadLanguage(browserLang);
                this.currentLanguage = browserLang;
            }

            this.updatePageContent();
        } catch (error) {
            console.error('Error initializing i18n:', error);
        }
    }

    async loadLanguage(lang) {
        try {
            const module = await import(`./${lang}.js`);
            this.translations.set(lang, module.default);
            return true;
        } catch (error) {
            console.error(`Error loading language ${lang}:`, error);
            return false;
        }
    }

    async setLanguage(lang) {
        if (this.currentLanguage === lang) return;

        if (!this.translations.has(lang)) {
            const loaded = await this.loadLanguage(lang);
            if (!loaded) return;
        }

        this.currentLanguage = lang;
        this.updatePageContent();
        this.saveLanguagePreference(lang);
    }

    t(key, ...params) {
        const keys = key.split('.');
        let value = this.translations.get(this.currentLanguage) || 
                   this.translations.get(this.defaultLanguage);

        for (const k of keys) {
            if (value === undefined) break;
            value = value[k];
        }

        if (value === undefined) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }

        if (params.length > 0) {
            return this.interpolate(value, params);
        }

        return value;
    }

    interpolate(text, params) {
        return text.replace(/\{(\d+)\}/g, (match, index) => {
            return params[index] !== undefined ? params[index] : match;
        });
    }

    updatePageContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.placeholder = text;
                } else {
                    element.value = text;
                }
            } else {
                element.textContent = text;
            }
        });

        // Update page title
        document.title = this.t('title');
    }

    saveLanguagePreference(lang) {
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (error) {
            console.warn('Could not save language preference:', error);
        }
    }

    getLanguagePreference() {
        try {
            return localStorage.getItem('preferredLanguage');
        } catch (error) {
            console.warn('Could not read language preference:', error);
            return null;
        }
    }
}

export const i18n = new I18nManager();