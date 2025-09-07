# 📄 Legal Document Summarizer  

An AI-powered web application that generates structured summaries of Indian legal documents.  
Built with **Gemini API**, **PDF.js**, and **TailwindCSS**, it extracts text from uploaded PDFs and produces concise summaries focusing on key provisions, clauses, reasoning, and implications.  

<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/4886344e-5dd2-4b74-b122-de9cf9312394" />

---

## 🚀 Features  
- **Upload PDFs** → Extracts text from judgments, contracts, or affidavits  
- **AI Summarization** → Uses Google’s Gemini model with a domain-specific legal prompt  
- **Structured Output** → Sections include:  
  - Document Overview  
  - Procedural History (for judgments)  
  - Key Provisions & Clauses  
  - Court’s Reasoning  
  - Final Order / Relief Granted  
  - Legal Precedents & References  
  - Implications & Consequences  
- **Copy to Clipboard** → Quickly copy summaries for further use  
- **Error Handling & Retry** → Graceful handling of API failures and PDF parsing issues  

---

## 🛠️ Tech Stack  
- **Frontend:** HTML, TailwindCSS, JavaScript  
- **PDF Processing:** [PDF.js](https://mozilla.github.io/pdf.js/)  
- **Markdown Rendering:** [Marked.js](https://marked.js.org/)  
- **AI Backend:** [Gemini API](https://ai.google.dev/) (2.5 Flash)  

---

## ⚙️ Setup & Usage  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/legal-document-summarizer.git
   cd legal-document-summarizer


2. Open `index.html` in a browser

3. Replace the placeholder in the script with your Gemini API key:

   ```js
   const API_KEY = "your_api_key_here";
   ```

4. Upload a legal PDF and click **Summarize Document**

---

## 📌 Example Workflow

* Upload: *Supreme Court Judgment PDF*
* Output:

  * Overview of case and parties
  * Key statutes cited (IPC, CrPC, BNSS, etc.)
  * Court’s reasoning & final order
  * Implications for legal practice


## ⚖️ Disclaimer

This tool provides **AI-generated summaries** of legal documents.
It is **not legal advice**. Please consult a qualified advocate or legal professional for official interpretation.


## 🔮 Future Improvements

* Support for scanned/image-based PDFs with OCR
* Export summaries to PDF/Word
* Multi-document batch summarization
* Fine-tuned models for specific legal domains (e.g., corporate contracts, criminal judgments)



