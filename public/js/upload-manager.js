// ===== UPLOAD MANAGER =====
// Handles the three upload boxes and mutual exclusion logic

const UploadManager = {
    activeBox: null,
    activeFile: null,
    activeType: null,
    
    /**
     * Initialize upload manager
     */
    init() {
        // Setup click handlers for upload boxes
        for (let i = 1; i <= 3; i++) {
            const box = document.getElementById(`upload-box-${i}`);
            const fileInput = document.getElementById(`file-input-${i}`);
            
            // Click on box triggers file input
            box.addEventListener('click', (e) => {
                if (!box.classList.contains('disabled')) {
                    fileInput.click();
                }
            });
            
            // Handle file selection
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(i, e.target.files[0]);
            });
        }
        
        console.log('✅ Upload manager initialized');
    },
    
    /**
     * Handle file selection
     * @param {number} boxNumber - Which box was used (1, 2, or 3)
     * @param {File} file - The selected file
     */
    handleFileSelect(boxNumber, file) {
        if (!file) {
            this.clearSelection();
            return;
        }
        
        const box = document.getElementById(`upload-box-${boxNumber}`);
        const type = box.dataset.type;
        const fileNameEl = document.getElementById(`file-name-${boxNumber}`);
        
        // Validate file type
        if (!this.validateFile(file, type)) {
            showError('Invalid file type for this upload option.');
            return;
        }
        
        // Set active box
        this.activeBox = boxNumber;
        this.activeFile = file;
        this.activeType = type;
        
        // Update UI
        box.classList.add('active');
        fileNameEl.textContent = file.name;
        
        // Disable other boxes
        for (let i = 1; i <= 3; i++) {
            if (i !== boxNumber) {
                const otherBox = document.getElementById(`upload-box-${i}`);
                otherBox.classList.add('disabled');
            }
        }
        
        // Enable summarize button
        document.getElementById('summarize-btn').disabled = false;
        
        // Hide error messages
        hideError();
        hideSuccess();
        
        console.log(`✅ File selected: ${file.name} (Type: ${type})`);
    },
    
    /**
     * Validate file based on upload type
     * @param {File} file - The file to validate
     * @param {string} type - The upload type (pdf-text, pdf-ocr, image)
     * @returns {boolean} - Whether file is valid
     */
    validateFile(file, type) {
        switch (type) {
            case 'pdf-text':
            case 'pdf-ocr':
                return file.type === 'application/pdf';
            case 'image':
                return file.type.startsWith('image/');
            default:
                return false;
        }
    },
    
    /**
     * Clear current selection and re-enable all boxes
     */
    clearSelection() {
        this.activeBox = null;
        this.activeFile = null;
        this.activeType = null;
        
        // Reset all boxes
        for (let i = 1; i <= 3; i++) {
            const box = document.getElementById(`upload-box-${i}`);
            const fileInput = document.getElementById(`file-input-${i}`);
            const fileNameEl = document.getElementById(`file-name-${i}`);
            
            box.classList.remove('active', 'disabled');
            fileInput.value = '';
            fileNameEl.textContent = '';
        }
        
        // Disable summarize button
        document.getElementById('summarize-btn').disabled = true;
        
        console.log('🔄 Selection cleared');
    },
    
    /**
     * Get the current file and process it based on type
     * @returns {Promise<string>} - Extracted text
     */
    async processFile() {
        if (!this.activeFile) {
            throw new Error('No file selected');
        }
        
        console.log(`🔄 Processing file as: ${this.activeType}`);
        
        switch (this.activeType) {
            case 'pdf-text':
                return await extractTextFromPDF(this.activeFile);
            case 'pdf-ocr':
                return await extractTextFromPDFWithOCR(this.activeFile);
            case 'image':
                return await extractTextFromImage(this.activeFile);
            default:
                throw new Error('Unknown upload type');
        }
    }
};
