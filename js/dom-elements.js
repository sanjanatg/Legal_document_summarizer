// ===== DOM ELEMENT REFERENCES =====
// Cache all DOM elements for better performance
const DOM = {
    fileInput: document.getElementById('pdf-file'),
    fileNameSpan: document.getElementById('file-name'),
    summarizeBtn: document.getElementById('summarize-btn'),
    buttonText: document.getElementById('button-text'),
    loader: document.getElementById('loader'),
    summaryOutput: document.getElementById('summary-output'),
    errorContainer: document.getElementById('error-container'),
    errorMessage: document.getElementById('error-message'),
    statusMessage: document.getElementById('status-message'),
    copyBtn: document.getElementById('copy-btn'),
    copyText: document.getElementById('copy-text'),
    progressBar: document.getElementById('progress-bar'),
    progressText: document.getElementById('progress-text')
};

// Global state
const STATE = {
    pdfText: '',
    currentSummary: ''
};
