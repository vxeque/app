# Translator App

A modern web application for text and PDF document translation with multilingual support.

## 🌟 Features

- Real-time text translation
- Support for multiple languages (Spanish, English, French, German, Italian, Portuguese, Japanese, Chinese)
- Text extraction from PDF files
- Multilingual interface
- Automatic language detection
- Responsive design

## 🏗️ Architecture

### Project Structure
```
app/
├── css/
│   ├── modal.css        # Modal window styles
│   ├── style.css        # Main styles
│   └── style.pdf.css    # PDF handling specific styles
├── js/
│   ├── app.js          # Main entry point
│   ├── dom.js          # DOM manipulation
│   ├── extract_module/ # PDF extraction module
│   │   ├── modal.js
│   │   ├── PDFTextExtractor.js
│   │   └── useExtractModule.js
│   ├── i18n/          # Internationalization system
│   │   ├── de.js      # German
│   │   ├── en.js      # English
│   │   ├── es.js      # Spanish
│   │   ├── fr.js      # French
│   │   ├── i18n.js    # i18n system core
│   │   ├── it.js      # Italian
│   │   └── zh.js      # Chinese
│   └── lib/           # External libraries
│       ├── pdf.min.js
│       └── pdf.worker.min.js
└── static/            # Static resources (images, icons)
```

### Translation Flow

1. **Text Input**
   - User enters text or uploads a PDF file
   - Source language is automatically detected (if selected)

2. **Processing**
   - For text: Directly sent to the translation engine
   - For PDF: 
     - Text is extracted using PDF.js
     - Processed page by page or in specific ranges
     - Extracted text is sent to the translator

3. **Internationalization System (i18n)**
   - Handles interface translations
   - Dynamically loads language files
   - Updates interface in real-time

## 🚀 Installation and Setup

### Prerequisites
- Modern web browser with ES6+ JavaScript support
- Local web server (recommended for development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vxeque/app.git
   cd app
   ```

2. **Local server setup**
   - Option 1: Using Python
     ```bash
     python -m http.server 8000
     ```
   - Option 2: Using Node.js with http-server
     ```bash
     npm install -g http-server
     http-server
     ```
   - Option 3: Using VS Code's Live Server extension
     - Install Live Server extension
     - Right-click on index.html -> "Open with Live Server"

3. **Access the application**
   - Open your browser
   - Visit `http://localhost:8000` (or the appropriate port)

## 💡 Usage

1. **Text Translation**
   - Select source language (or use automatic detection)
   - Enter text to translate
   - Select target language
   - Click the translation button (arrow)

2. **PDF Translation**
   - Click the attach file button
   - Select PDF file
   - Choose extraction mode (all pages, range, or specific page)
   - Extract text
   - The extracted text will be placed in the input area for translation

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- PDF.js for PDF file handling
- Custom internationalization system

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

Developed by [vxeque](https://github.com/vxeque)