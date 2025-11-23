import { extractTextFromPDF } from './pdf-processor.js';
import { extractTextFromImage, validateLegalDocument, generateSummary } from './ai-service.js';

// State management
const STATE = {
    text: '',
    fileType: null
};

// DOM Elements (will be initialized after DOMContentLoaded)
const DOM = {};

/**
 * Initialize DOM elements
 */
function initDOM() {
    DOM.fileInput = document.getElementById('file-input'); // Changed ID to match plan/new HTML
    DOM.summarizeBtn = document.getElementById('summarize-btn');
    DOM.copyBtn = document.getElementById('copy-btn');
    DOM.copyText = document.getElementById('copy-text');
    DOM.fileNameSpan = document.getElementById('file-name');
    DOM.buttonText = document.getElementById('button-text');
    DOM.loader = document.getElementById('loader');
    DOM.summaryOutput = document.getElementById('summary-output');
    DOM.errorContainer = document.getElementById('error-container');
    DOM.errorMessage = document.getElementById('error-message');
    DOM.statusMessage = document.getElementById('status-message');
    DOM.modelSelect = document.getElementById('model-select');
    DOM.ocrStatus = document.getElementById('ocr-status');
    DOM.ocrProgress = document.getElementById('ocr-progress');
    DOM.ocrPercent = document.getElementById('ocr-percent');
}

/**
 * Handle file upload
 */
async function handleFileUpload(e) {
    const file = e.target.files[0];
    
    if (!file) {
        DOM.summarizeBtn.disabled = true;
        DOM.fileNameSpan.textContent = 'No file selected';
        return;
    }
    
    // Reset state
    STATE.text = '';
    STATE.fileType = file.type;
    
    DOM.fileNameSpan.textContent = file.name;
    hideError();
    DOM.ocrStatus.classList.add('hidden');
    
    try {
        DOM.statusMessage.textContent = '📖 Processing file...';
        DOM.statusMessage.classList.remove('hidden');
        
        if (file.type === 'application/pdf') {
            STATE.text = await extractTextFromPDF(file);
        } else if (file.type.startsWith('image/')) {
            DOM.ocrStatus.classList.remove('hidden');
            STATE.text = await extractTextFromImage(file);
        } else {
            throw new Error('Unsupported file type. Please upload PDF or Image.');
        }
        
        if (!STATE.text || STATE.text.trim().length === 0) {
            showError('Could not extract text. The file may be empty or unreadable.');
            DOM.summarizeBtn.disabled = true;
        } else {
            // Validate Legal Document
            const validation = validateLegalDocument(STATE.text);
            if (!validation.isLegal) {
                alert(`Warning: This does not appear to be a legal document (Confidence: ${validation.confidence.toFixed(1)}%).\n\nYou can still try to summarize, but results may vary.`);
                // We allow proceeding but warn, or block as per user request?
                // User request: "Block non-legal docs with alert" -> "if (!validation.isLegal) { alert(...); return; }"
                // I will follow the user request to BLOCK.
                alert(`⛔ Not a legal document (Confidence: ${validation.confidence.toFixed(1)}%).\n\nPlease upload a valid legal document.`);
                DOM.summarizeBtn.disabled = true;
                DOM.statusMessage.textContent = '❌ Validation failed: Not a legal document.';
                return;
            }

            DOM.summarizeBtn.disabled = false;
            DOM.statusMessage.textContent = `✅ File loaded successfully! (${STATE.text.length} characters)`;
            console.log(`✅ File loaded: ${STATE.text.length} characters`);
        }
    } catch (error) {
        showError('Error reading file: ' + error.message);
        DOM.summarizeBtn.disabled = true;
        console.error(error);
    }
}

/**
 * Handle summarize button click
 */
async function handleSummarize() {
    if (!STATE.text) {
        showError('Please upload and process a file first.');
        return;
    }
    
    setLoading(true);
    hideError();
    DOM.copyBtn.classList.add('hidden');
    
    try {
        console.log('🚀 Starting summarization...');
        DOM.statusMessage.textContent = '🔄 Analyzing document...';
        
        const selectedModel = DOM.modelSelect.value;
        const summary = await generateSummary(STATE.text, selectedModel);
        
        displaySummary(summary);
        DOM.statusMessage.textContent = '🎉 Summary generated successfully!';
        
    } catch (error) {
        console.error('❌ Summarization error:', error);
        showError('Error generating summary: ' + error.message);
        DOM.summaryOutput.innerHTML = '<p class="text-gray-500 text-center">Failed to generate summary.</p>';
    } finally {
        setLoading(false);
    }
}

/**
 * Display summary in the output container
 */
function displaySummary(summary) {
    // Use marked if available, else plain text
    if (typeof marked !== 'undefined') {
        DOM.summaryOutput.innerHTML = `<div class="prose prose-invert">${marked.parse(summary)}</div>`;
    } else {
        DOM.summaryOutput.innerText = summary;
    }
    DOM.copyBtn.classList.remove('hidden');
}

/**
 * Copy summary to clipboard
 */
function copySummaryToClipboard() {
    const summaryText = DOM.summaryOutput.innerText;
    navigator.clipboard.writeText(summaryText).then(() => {
        DOM.copyText.textContent = 'Copied!';
        setTimeout(() => {
            DOM.copyText.textContent = 'Copy Summary';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        DOM.copyText.textContent = 'Failed to copy';
    });
}

// UI Helpers
function setLoading(isLoading) {
    DOM.summarizeBtn.disabled = isLoading;
    DOM.buttonText.textContent = isLoading ? 'Processing...' : 'Summarize Document';
    DOM.loader.classList.toggle('hidden', !isLoading);
}

function showError(message) {
    DOM.errorMessage.textContent = message;
    DOM.errorContainer.classList.remove('hidden');
    DOM.statusMessage.classList.add('hidden');
}

function hideError() {
    DOM.errorContainer.classList.add('hidden');
    DOM.errorMessage.textContent = '';
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    initDOM();
    
    if (DOM.fileInput) DOM.fileInput.addEventListener('change', handleFileUpload);
    if (DOM.summarizeBtn) DOM.summarizeBtn.addEventListener('click', handleSummarize);
    if (DOM.copyBtn) DOM.copyBtn.addEventListener('click', copySummaryToClipboard);
    
    console.log('✅ Event listeners initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
    initializeEventListeners();
}
