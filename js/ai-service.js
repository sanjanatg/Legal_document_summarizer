// ===== AI SERVICE =====
// Handles all Gemini API interactions

/**
 * Generate summary using Gemini AI
 * @param {string} text - Text to summarize
 * @returns {Promise<string>} - Summary text
 */
async function generateSummary(text) {
    const selectedModel = document.getElementById('model-select').value;
    const modelConfig = CONFIG.MODELS[selectedModel];
    const url = `${CONFIG.API_BASE_URL}/${modelConfig.endpoint}?key=${CONFIG.API_KEY}`;
    
    const systemPrompt = `You are a Legal Document Analyzer for Indian courts.

Structure summaries with these sections:
## Document Overview
- Type, Court, Case Number, Date

## Parties Involved
- Petitioner/Appellant vs Respondent/Defendant

## Key Legal Provisions
- IPC/CrPC sections, Acts cited

## Issues Framed
- Main legal questions

## Court's Reasoning
- Analysis of each issue

## Final Order
- Judgment outcome

## Precedents
- Case law citations

Use Indian legal terminology. Format in Markdown.`;

    const payload = {
        contents: [{
            parts: [{ text: `${systemPrompt}\n\nSummarize the following legal document:\n\n${text}` }]
        }],
        generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048
        }
    };
    
    return await makeAPICall(url, payload, 'Summary Generation');
}

/**
 * Answer a question about the document
 * @param {string} documentText - The original document text
 * @param {Array} conversationHistory - Previous messages
 * @param {string} question - User's question
 * @returns {Promise<string>} - Answer text
 */
async function answerQuestion(documentText, conversationHistory, question) {
    const selectedModel = document.getElementById('model-select').value;
    const modelConfig = CONFIG.MODELS[selectedModel];
    const url = `${CONFIG.API_BASE_URL}/${modelConfig.endpoint}?key=${CONFIG.API_KEY}`;
    
    const systemPrompt = `You are a legal expert assistant. Answer questions about the provided legal document accurately and concisely. Use Indian legal terminology.`;
    
    // Build conversation context
    let contextText = `${systemPrompt}\n\nDocument:\n${documentText}\n\n`;
    
    // Add conversation history
    if (conversationHistory.length > 0) {
        contextText += 'Previous conversation:\n';
        conversationHistory.forEach(msg => {
            contextText += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        });
    }
    
    contextText += `\nUser: ${question}\nAssistant:`;
    
    const payload = {
        contents: [{
            parts: [{ text: contextText }]
        }],
        generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024
        }
    };
    
    return await makeAPICall(url, payload, 'Question Answering');
}

/**
 * Validate if text appears to be a legal document
 * @param {string} text - Text to validate
 * @returns {Object} - { isLegal: boolean, confidence: number }
 */
function validateLegalDocument(text) {
    const legalKeywords = [
        'plaintiff', 'defendant', 'petition', 'court', 'judge', 'ipc', 'section',
        'appellant', 'respondent', 'bail', 'jurisdiction', 'affidavit', 'tribunal',
        'order', 'judgment', 'advocate', 'counsel', 'case', 'law', 'act', 'crpc',
        'supreme court', 'high court', 'district court', 'civil', 'criminal'
    ];
    
    const lowerText = text.toLowerCase();
    const matchCount = legalKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    const isLegal = matchCount >= 5; // Require at least 5 legal keywords
    const confidence = Math.min((matchCount / legalKeywords.length) * 100, 100);
    
    return { isLegal, confidence };
}

/**
 * Make API call with retry logic
 * @param {string} url - API endpoint URL
 * @param {Object} payload - Request payload
 * @param {string} operation - Operation name for logging
 * @returns {Promise<string>} - API response text
 */
async function makeAPICall(url, payload, operation = 'API Call') {
    let lastError = null;
    
    for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
        try {
            console.log(`📡 ${operation} - Attempt ${attempt}/${CONFIG.MAX_RETRIES}`);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            // Handle rate limiting with longer delays
            if (response.status === 429) {
                // Use longer delays for rate limiting: 3s, 6s, 12s
                const delay = 3000 * Math.pow(2, attempt - 1);
                console.warn(`⚠️ Rate limited. Waiting ${delay / 1000}s before retry...`);
                await sleep(delay);
                continue;
            }
            
            // Handle other errors
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error ${response.status}: ${errorText}`);
            }
            
            // Parse response
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!text) {
                throw new Error('No response text from API');
            }
            
            console.log(`✅ ${operation} successful`);
            return text;
            
        } catch (error) {
            lastError = error;
            console.error(`❌ ${operation} attempt ${attempt} failed:`, error?.message || 'Unknown error');
            
            if (attempt < CONFIG.MAX_RETRIES) {
                const delay = 3000 * Math.pow(2, attempt - 1);
                console.log(`⏳ Retrying in ${delay / 1000}s...`);
                await sleep(delay);
            }
        }
    }
    
    // Fix: Safely access error message
    const errorMsg = lastError?.message || 'Unknown error occurred';
    throw new Error(`${operation} failed after ${CONFIG.MAX_RETRIES} attempts: ${errorMsg}`);
}

/**
 * Sleep utility
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
