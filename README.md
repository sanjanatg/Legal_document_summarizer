# ⚖️ Legal Document Summarizer



**Legal Document Summarizer** is a powerful, AI-driven web application designed to simplify the analysis of Indian legal documents. Built with the **Google Gemini API**, it transforms complex legal judgments, case files, and contracts into structured, easy-to-understand summaries.

Designed for legal professionals, students, and anyone needing quick insights into legal texts.
![Uploading image.png…]()

---

## ✨ Key Features

*   **📄 Smart Summarization**: Instantly generates structured summaries including:
    *   Case Overview & Parties
    *   Key Legal Provisions (IPC/CrPC)
    *   Issues Framed & Reasoning
    *   Final Order & Precedents
*   **🤖 Multi-Model AI Support**: Choose between **Gemini 2.0 Flash** (Speed), **Gemini 1.5 Flash** (Balanced), and **Gemini 1.5 Pro** (Deep Reasoning).
*   **📥 Versatile Upload Options**:
    *   **PDF (Text)**: For standard digital PDFs.
    *   **PDF (OCR)**: For scanned documents and images.
    *   **Image Upload**: Directly analyze JPG/PNG snapshots of documents.
*   **💬 Interactive Legal Chatbot**: Ask follow-up questions about the document (e.g., *"What was the main argument of the defense?"*) and get context-aware answers.
*   **🎨 Modern Dark UI**: A professional, glassmorphism-inspired dark theme designed for long reading sessions.
*   **🔒 Privacy-First**: API keys are stored locally in your browser. No data is sent to any third-party server other than Google's secure API.

---

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3 (Custom Properties + Glassmorphism), Vanilla JavaScript (ES6+)
*   **AI Engine**: [Google Gemini API](https://ai.google.dev/) (Multimodal capabilities)
*   **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/)
*   **Markdown Rendering**: [Marked.js](https://marked.js.org/)
*   **Icons**: Native Emoji & CSS Shapes

---

## 🚀 Getting Started

### Prerequisites

*   A modern web browser (Chrome, Edge, Firefox, Safari).
*   A **Google Gemini API Key**. [Get it for free here](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/legal-document-summarizer.git
    cd legal-document-summarizer
    ```

2.  **Configure your API key**
    
    **Option A: Using Setup Page (Recommended)**
    *   Open `setup.html` in your browser
    *   Paste your API key
    *   Click "Save & Continue to App"
    
    **Option B: Manual Configuration**
    *   Rename `js/config.example.js` to `js/config.js`
    *   Open `js/config.js`
    *   Replace `YOUR_API_KEY_HERE` with your actual API key
    ```javascript
    API_KEY: 'AIzaSyA...' // Your actual key here
    ```

3.  **Run the Application**
    You can run it using a simple local server:

    **Using Python:**
    ```bash
    python -m http.server 8000
    ```
    
    **Using Node.js (npx):**
    ```bash
    npx http-server -p 8000
    ```

    Then open `http://localhost:8000` in your browser.

---

## 📖 Usage Guide

1.  **Select AI Model**: Use the dropdown at the top to choose a model based on your document size and daily quota needs.
2.  **Upload Document**:
    *   Select **PDF with Text** for digital files.
    *   Select **PDF + Images** if your document is scanned.
    *   Select **Single Image** for quick snapshots.
3.  **Generate Summary**: Click **"Summarize Document"**. The AI will process the file and display a structured summary on the left.
4.  **Ask Questions**: Use the chat interface on the right to ask specific questions about the case.

---

## 📂 Project Structure

```
legal-document-summarizer/
├── css/
│   └── dark-theme.css      # Styling and glassmorphism effects
├── js/
│   ├── ai-service.js       # Gemini API integration
│   ├── chatbot.js          # Chat interface logic
│   ├── config.js           # App configuration
│   ├── main.js             # Entry point
│   ├── pdf-processor.js    # PDF text extraction & OCR
│   └── upload-manager.js   # File handling logic
├── index.html              # Main application interface
├── setup.html              # First-time setup page
└── README.md               # Project documentation
```

---

## ⚠️ Important Notes

*   **API Quotas**: Be mindful of the daily limits for each Gemini model. The app provides a guide to help you choose.
*   **Document Privacy**: This is a client-side application. Your documents are processed in memory and sent directly to Google's API. They are not stored on any intermediate server.

---

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
