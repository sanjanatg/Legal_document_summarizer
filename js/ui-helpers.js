// ===== UI HELPER FUNCTIONS =====

/**
 * Set loading state
 * @param {boolean} isLoading - Whether the app is loading
 */
function setLoading(isLoading) {
    DOM.summarizeBtn.disabled = isLoading;
    DOM.buttonText.textContent = isLoading ? 'Processing...' : 'Summarize Document';
    DOM.loader.classList.toggle('hidden', !isLoading);
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    DOM.errorMessage.textContent = `❌ ${message}`;
    DOM.errorContainer.classList.remove('hidden');
    DOM.statusMessage.classList.add('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    DOM.errorContainer.classList.add('hidden');
    DOM.errorMessage.textContent = '';
}

/**
 * Update progress bar and status
 * @param {number} current - Current progress value
 * @param {number} total - Total progress value
 * @param {string} message - Status message
 */
function updateProgress(current, total, message) {
    const percentage = Math.round((current / total) * 100);
    
    if (DOM.progressBar) {
        DOM.progressBar.style.width = `${percentage}%`;
    }
    
    if (DOM.progressText) {
        DOM.progressText.textContent = `${percentage}%`;
    }
    
    // Add loading emoji to message
    const emojiMessage = `⏳ ${message}`;
    DOM.statusMessage.textContent = emojiMessage;
    DOM.statusMessage.classList.remove('hidden');
}

/**
 * Show progress container
 */
function showProgress() {
    const progressContainer = document.getElementById('progress-container');
    if (progressContainer) {
        progressContainer.classList.remove('hidden');
    }
}

/**
 * Hide progress container
 */
function hideProgress() {
    const progressContainer = document.getElementById('progress-container');
    if (progressContainer) {
        progressContainer.classList.add('hidden');
    }
}

/**
 * Display summary in the output area
 * @param {string} summary - Summary text to display
 */
function displaySummary(summary) {
    DOM.summaryOutput.innerHTML = `<div class="prose">${marked.parse(summary)}</div>`;
    DOM.statusMessage.textContent = '✅ Summary generated successfully!';
    DOM.copyBtn.classList.remove('hidden');
    STATE.currentSummary = summary;
}

/**
 * Copy summary to clipboard
 */
function copySummaryToClipboard() {
    const summaryText = DOM.summaryOutput.innerText;
    
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = summaryText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    
    try {
        const successful = document.execCommand('copy');
        DOM.copyText.textContent = successful ? 'Copied!' : 'Failed to copy';
    } catch (err) {
        console.error('Failed to copy:', err);
        DOM.copyText.textContent = 'Failed to copy';
    }
    
    document.body.removeChild(tempTextArea);
    
    setTimeout(() => {
        DOM.copyText.textContent = 'Copy Summary';
    }, 2000);
}
