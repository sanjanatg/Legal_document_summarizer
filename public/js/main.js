// ===== MAIN APPLICATION =====
// Coordinates all modules and handles the main application flow

// Global state
const AppState = {
    documentText: '',
    summary: '',
    isProcessing: false
};

/**
 * Initialize the application
 */
function initApp() {
    console.log('🚀 Initializing Legal Document Summarizer...');
    
    // Initialize modules
    UploadManager.init();
    Chatbot.init();
    
    // Setup summarize button
    const summarizeBtn = document.getElementById('summarize-btn');
    summarizeBtn.addEventListener('click', handleSummarize);
    
    console.log('✅ Application initialized successfully');
}

/**
 * Handle summarize button click
 */
async function handleSummarize() {
    if (AppState.isProcessing) return;
    
    AppState.isProcessing = true;
    setLoading(true);
    hideError();
    hideSuccess();
    
    try {
        // Step 1: Extract text from file
        showSuccess('📄 Extracting text from document...');
        const text = await UploadManager.processFile();
        
        if (!text || text.trim().length === 0) {
            throw new Error('No text could be extracted from the file. The file may be empty or unreadable.');
        }
        
        console.log(`✅ Extracted ${text.length} characters`);
        
        // Step 2: Validate legal document
        showSuccess('🔍 Validating legal document...');
        const validation = validateLegalDocument(text);
        
        if (!validation.isLegal) {
            const proceed = confirm(
                `⚠️ This document may not be a legal document (Confidence: ${validation.confidence.toFixed(1)}%).\n\n` +
                `Do you want to proceed anyway?`
            );
            
            if (!proceed) {
                throw new Error('Document validation failed. Please upload a legal document.');
            }
        }
        
        console.log(`✅ Document validated (Confidence: ${validation.confidence.toFixed(1)}%)`);
        
        // Step 3: Generate summary
        showSuccess('🤖 Generating AI summary...');
        const summary = await generateSummary(text);
        
        console.log(`✅ Summary generated (${summary.length} characters)`);
        
        // Step 4: Display summary
        displaySummary(summary);
        
        // Step 5: Enable chatbot
        Chatbot.enable(text);
        
        // Store in state
        AppState.documentText = text;
        AppState.summary = summary;
        
        showSuccess('✅ Summary generated successfully! You can now ask questions in the chatbot.');
        
    } catch (error) {
        console.error('❌ Summarization error:', error);
        
        // Check if it's a rate limit error
        if (error.message && error.message.includes('429')) {
            showError(
                '⚠️ Rate Limit Exceeded: You\'ve made too many requests to the Gemini API. ' +
                'Please try one of these solutions:\n\n' +
                '1. Wait 1-2 minutes and try again\n' +
                '2. Switch to a different model (Gemini 1.5 Flash or 1.5 Pro)\n' +
                '3. Check your API quota at Google AI Studio'
            );
        } else {
            showError(error.message || 'An error occurred while processing the document.');
        }
        
        // Clear summary
        const summaryContent = document.getElementById('summary-content');
        summaryContent.innerHTML = '<p class="empty">Failed to generate summary. Please try again.</p>';
        summaryContent.classList.add('empty');
        
    } finally {
        AppState.isProcessing = false;
        setLoading(false);
    }
}

/**
 * Display summary in the UI
 * @param {string} summary - The summary text (markdown)
 */
function displaySummary(summary) {
    const summaryContent = document.getElementById('summary-content');
    summaryContent.classList.remove('empty');
    
    // Render markdown
    if (typeof marked !== 'undefined') {
        summaryContent.innerHTML = marked.parse(summary);
    } else {
        summaryContent.textContent = summary;
    }
    
    // Scroll to summary
    summaryContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Set loading state
 * @param {boolean} isLoading - Whether app is loading
 */
function setLoading(isLoading) {
    const btn = document.getElementById('summarize-btn');
    const btnText = document.getElementById('btn-text');
    const loader = document.getElementById('loader');
    
    btn.disabled = isLoading;
    btnText.textContent = isLoading ? 'Processing...' : 'Summarize Document';
    loader.classList.toggle('hidden', !isLoading);
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
    
    // Hide success message
    document.getElementById('success-container').classList.add('hidden');
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Hide error message
 */
function hideError() {
    document.getElementById('error-container').classList.add('hidden');
}

/**
 * Show success message
 * @param {string} message - Success message
 */
function showSuccess(message) {
    const successContainer = document.getElementById('success-container');
    const successMessage = document.getElementById('success-message');
    
    successMessage.textContent = message;
    successContainer.classList.remove('hidden');
    
    // Hide error message
    document.getElementById('error-container').classList.add('hidden');
}

/**
 * Hide success message
 */
function hideSuccess() {
    document.getElementById('success-container').classList.add('hidden');
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
