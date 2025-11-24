# ⚖️ Legal Document Summarizer

**Legal Document Summarizer** is a powerful, AI-driven web application designed to simplify the analysis of Indian legal documents. Built with the **Google Gemini API**, it transforms complex legal judgments, case files, and contracts into structured, easy-to-understand summaries.

Designed for legal professionals, students, and anyone needing quick insights into legal texts.

<img width="1825" height="912" alt="image" src="https://github.com/user-attachments/assets/b0502006-540d-437d-8253-88c2afbfe7d7" />



---

## ✨ Key Features

* **📄 Smart Summarization**: Instantly generates structured summaries including:
  * Case Overview & Parties
  * Key Legal Provisions (IPC/CrPC)
  * Issues Framed & Reasoning
  * Final Order & Precedents
* **🤖 Multi-Model AI Support**: Choose between **Gemini 2.0 Flash** (Speed), **Gemini 1.5 Flash** (Balanced), and **Gemini 1.5 Pro** (Deep Reasoning).
* **📥 Versatile Upload Options**:
  * **PDF (Text)**: For standard digital PDFs.
  * **PDF (OCR)**: For scanned documents and images.
  * **Image Upload**: Directly analyze JPG/PNG snapshots of documents.
* **💬 Interactive Legal Chatbot**: Ask follow-up questions about the document (e.g., *"What was the main argument of the defense?"*) and get context-aware answers.
* **🎨 Modern Dark UI**: A professional, glassmorphism-inspired dark theme designed for long reading sessions.
* **🔒 Privacy-First**: API keys are stored locally in your browser. No data is sent to any third-party server other than Google's secure API.

### Privacy Guarantee

* PDF processed in browser RAM (never uploaded to your server)
* No database (no MongoDB, PostgreSQL, etc.)
* No user accounts or tracking
* Data deleted when tab closes

**Google Gemini API** ✅:
* Data NOT used for training (API tier)
* Stored only 24-48 hours for abuse detection
* TLS 1.3 encrypted in transit
* GDPR/CCPA compliant
* SOC 2 Type II certified

**Combined Result** ✅:
* Most private legal AI tool possible - data only exists in:
  * User's browser (temporary)
  * Google's encrypted API pipeline (24-48 hours max)
  * Then permanently deleted
* No third-party access, no permanent storage, no training data use

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3 (Custom Properties + Glassmorphism), Vanilla JavaScript (ES6+)
* **AI Engine**: [Google Gemini API](https://ai.google.dev/) (Multimodal capabilities)
* **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/)
* **Markdown Rendering**: [Marked.js](https://marked.js.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Icons**: Native Emoji & CSS Shapes

---

## 🚀 Getting Started

### Prerequisites

* A modern web browser (Chrome, Edge, Firefox, Safari).
* **Node.js** (v16 or higher) and **npm**
* A **Google Gemini API Key**. [Get it for free here](https://aistudio.google.com/app/apikey).

### Installation

1. **Clone the Repository**
git clone https://github.com/sanjanatg/legal-document-summarizer.git
cd legal-document-summarizer

text

2. **Install Dependencies**
npm install

text

3. **Run Development Server**
npm run dev

text

4. **Configure Your API Key**
* Visit `http://localhost:5173/setup.html` in your browser
* Enter your Google Gemini API key
* Click "Save & Continue to App"
* Your API key is securely stored in your browser's localStorage

---

## 📖 Usage Guide

1. **Select AI Model**: Use the dropdown at the top to choose a model based on your document size and daily quota needs.
2. **Upload Document**:
* Select **PDF with Text** for digital files.
* Select **PDF + Images** if your document is scanned.
* Select **Single Image** for quick snapshots.
3. **Generate Summary**: Click **"Summarize Document"**. The AI will process the file and display a structured summary on the left.
4. **Ask Questions**: Use the chat interface on the right to ask specific questions about the case.

---

## 📂 Project Structure

legal-document-summarizer/

├── css/

│ └── dark-theme.css # Styling and glassmorphism effects

├── js/

│ ├── ai-service.js # Gemini API integration

│ ├── chatbot.js # Chat interface logic

│ ├── config.js # App configuration

│ ├── main.js # Entry point

│ ├── pdf-processor.js # PDF text extraction & OCR

│ └── upload-manager.js # File handling logic

├── public/
│ └── js/ # Production build copies

├── index.html # Main application interface

├── setup.html # First-time setup page

├── package.json # Dependencies

├── vite.config.js # Build configuration

└── README.md # Project documentation



---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project" and select your repository
4. Click "Deploy"

**No environment variables needed!** Users will set up their own API keys via `setup.html`.

See [VERCEL_ENV_SETUP.md](VERCEL_ENV_SETUP.md) for detailed deployment instructions.

---

## ⚠️ Important Notes

* **API Quotas**: Be mindful of the daily limits for each Gemini model. The app provides a guide to help you choose.
* **Document Privacy**: This is a client-side application. Your documents are processed in memory and sent directly to Google's API. They are not stored on any intermediate server.
* **API Key Security**: API keys are stored in your browser's localStorage. They are never sent to any server except Google's Gemini API.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Project Link**: [https://github.com/sanjanatg/Legal_document_summarizer](https://github.com/sanjanatg/Legal_document_summarizer)

**Live Demo**: [https://legal-document-summarizer-ebon.vercel.app](https://legal-document-summarizer-ebon.vercel.app)

---

## 🙏 Acknowledgments

* [Google Gemini API](https://ai.google.dev/) for powerful multimodal AI capabilities
* [PDF.js](https://mozilla.github.io/pdf.js/) by Mozilla for client-side PDF processing
* [Vercel](https://vercel.com/) for seamless deployment
* Indian legal community for inspiration and use case validation
