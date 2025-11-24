/**
 * Environment Variable Loader
 * This file is loaded as a module to access import.meta.env
 * It bridges the gap between Vite's env vars and the non-module app code
 */

// Get API key from Vite environment variables
console.log('🔌 Env Loader: Checking for environment variables...');

let envApiKey = '';
try {
    // Check if import.meta.env exists (Vite)
    if (import.meta && import.meta.env) {
        envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
        console.log('🔌 Env Loader: VITE_GEMINI_API_KEY found:', envApiKey ? 'Yes (Length: ' + envApiKey.length + ')' : 'No');
    } else {
        console.warn('⚠️ Env Loader: import.meta.env is undefined. This file might be served statically.');
    }
} catch (e) {
    console.error('❌ Env Loader Error:', e);
}

// If found, save to localStorage so config.js can read it
if (envApiKey) {
    console.log('🔑 Loaded API key from environment variables into localStorage');
    localStorage.setItem('gemini_api_key', envApiKey);
    
    // Also update global CONFIG if it exists (fixes race condition)
    if (typeof CONFIG !== 'undefined') {
        CONFIG.API_KEY = envApiKey;
        console.log('✅ Updated global CONFIG with environment API key');
    }
} else {
    console.log('ℹ️ No environment API key found. Using existing localStorage value if any.');
}
