// ===== PDF PROCESSING =====
// Fixed version without ES6 modules for better browser compatibility

/**
 * Extract text from PDF using PDF.js
 * @param {File} file - The PDF file to extract text from
 * @returns {Promise<string>} - Extracted text from the PDF
 */
async function extractTextFromPDF(file) {
    try {
        console.log('📄 Starting PDF text extraction...');
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        const totalPages = pdf.numPages;
        
        console.log(`📖 Processing ${totalPages} pages...`);
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
            
            // Update progress
            const progress = Math.round((pageNum / totalPages) * 100);
            console.log(`📄 Page ${pageNum}/${totalPages} (${progress}%)`);
        }
        
        console.log(`✅ Extracted ${fullText.length} characters from PDF`);
        return fullText.trim();
        
    } catch (error) {
        console.error('❌ Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF. The file may be corrupted or password-protected.');
    }
}

/**
 * Extract text from PDF with OCR support (for scanned documents)
 * This uses the Gemini Vision API to process PDF pages as images
 * @param {File} file - The PDF file to process
 * @returns {Promise<string>} - Extracted text using OCR
 */
async function extractTextFromPDFWithOCR(file) {
    try {
        console.log('🖼️ Starting PDF OCR extraction...');
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        const totalPages = pdf.numPages;
        
        console.log(`📖 Processing ${totalPages} pages with OCR...`);
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            
            // Render page to canvas
            const viewport = page.getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Convert canvas to blob
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            
            // Use Gemini Vision API for OCR
            const pageText = await extractTextFromImageBlob(blob);
            fullText += pageText + '\n\n';
            
            const progress = Math.round((pageNum / totalPages) * 100);
            console.log(`🖼️ Page ${pageNum}/${totalPages} (${progress}%)`);
        }
        
        console.log(`✅ Extracted ${fullText.length} characters using OCR`);
        return fullText.trim();
        
    } catch (error) {
        console.error('❌ Error in PDF OCR extraction:', error);
        throw new Error('Failed to extract text using OCR. Please try the standard PDF option.');
    }
}

/**
 * Extract text from image using Gemini Vision API
 * @param {Blob} imageBlob - The image blob to process
 * @returns {Promise<string>} - Extracted text
 */
async function extractTextFromImageBlob(imageBlob) {
    try {
        // Convert blob to base64
        const base64 = await blobToBase64(imageBlob);
        const base64Data = base64.split(',')[1]; // Remove data:image/png;base64, prefix
        
        const selectedModel = document.getElementById('model-select').value;
        const modelConfig = CONFIG.MODELS[selectedModel];
        const url = `${CONFIG.API_BASE_URL}/${modelConfig.endpoint}?key=${CONFIG.API_KEY}`;
        
        const payload = {
            contents: [{
                parts: [
                    { text: "Extract all text from this image. Preserve formatting and structure." },
                    {
                        inline_data: {
                            mime_type: "image/png",
                            data: base64Data
                        }
                    }
                ]
            }]
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
    } catch (error) {
        console.error('❌ Error in image OCR:', error);
        return '';
    }
}

/**
 * Convert blob to base64
 * @param {Blob} blob - The blob to convert
 * @returns {Promise<string>} - Base64 string
 */
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Extract text from a single image file
 * @param {File} file - The image file
 * @returns {Promise<string>} - Extracted text
 */
async function extractTextFromImage(file) {
    try {
        console.log('🎴 Starting image text extraction...');
        const text = await extractTextFromImageBlob(file);
        console.log(`✅ Extracted ${text.length} characters from image`);
        return text;
    } catch (error) {
        console.error('❌ Error extracting text from image:', error);
        throw new Error('Failed to extract text from image.');
    }
}
