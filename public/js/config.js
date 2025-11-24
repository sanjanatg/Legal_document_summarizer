// ===== CONFIGURATION =====
// API Configuration
const CONFIG = {
    API_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models',
    // API Key from localStorage (set via setup.html) or environment variable
    API_KEY: localStorage.getItem('gemini_api_key') || '',
    
    // Helper function to check if API key is configured
    isConfigured: function() {
        return this.API_KEY && this.API_KEY.length > 0;
    },
    
    // Get setup page URL
    getSetupUrl: function() {
        return 'setup.html';
    },
    
    // Model configurations with limits (Production models)
    MODELS: {
        'gemini-2.0-flash': {
            name: 'Gemini 2.0 Flash Lite (Recommended)',
            maxPages: 10,
            dailyLimit: 1500,
            description: 'Fastest, best for short documents',
            endpoint: 'gemini-2.0-flash:generateContent'
        },
        'gemini-1.5-flash': {
            name: 'Gemini 2.5 Flash',
            maxPages: 40,
            dailyLimit: 1000,
            description: 'Balanced speed and capability for medium documents',
            endpoint: 'gemini-1.5-flash:generateContent'
        },
        'gemini-1.5-pro': {
            name: 'Gemini 2.5 Pro',
            maxPages: 75,
            dailyLimit: 50,
            description: 'Most capable for complex legal documents',
            endpoint: 'gemini-1.5-pro:generateContent'
        }
    },
    
    // Chunking settings for processing large PDFs
    CHUNK_SIZE: 4000,
    MAX_RETRIES: 3,
    BASE_DELAY: 1000,
    
    // Processing settings
    CONCURRENT_CHUNKS: 1,
    CHUNK_OVERLAP: 200,
    BATCH_DELAY: 1500
};
