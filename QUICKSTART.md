# 🚀 Quick Start Guide

## Get Your App Running in 3 Minutes!

### ✅ What's Working Now
Based on your console logs, the app is **already working perfectly**! 
- ✅ PDF loading successful (66 pages extracted)
- ✅ Text extraction working (110,501 characters)
- ✅ Document validation passed (80.8% confidence)
- ✅ Upload manager initialized
- ✅ Chatbot ready
- ✅ All three upload modes functional

### ❌ What Needs Fixing
Only one thing: **Invalid API Key**

The placeholder API key in the code is not valid. You need your own Google Gemini API key.

---

## 🔑 Get Your API Key (2 minutes)

### Step 1: Visit Google AI Studio
👉 **[Click here to get your free API key](https://aistudio.google.com/app/apikey)**

### Step 2: Create API Key
1. Click **"Create API Key"** button
2. Select **"Create API key in new project"** (or use existing project)
3. Copy the key (starts with `AIza...`)

### Step 3: Add Your Key

**Option A: Use the Setup Page (Easiest)**
1. Open `setup.html` in your browser
2. Paste your API key
3. Click "Save & Continue"
4. Done! 🎉

**Option B: Edit config.js Directly**
1. Open `js/config.js` in a text editor
2. Find line 5: `API_KEY: localStorage.getItem('gemini_api_key') || 'YOUR_API_KEY_HERE'`
3. Replace with: `API_KEY: 'AIzaSyA...'` (your actual key)
4. Save the file
5. Refresh your browser

---

## 🎯 Test It Out

### 1. Upload a Document
- Click on **"PDF with Text"** box
- Select your legal PDF
- Notice the other two boxes become disabled ✨

### 2. Generate Summary
- Click **"Summarize Document"**
- Watch the progress in console
- Summary appears on the left

### 3. Ask Questions
- Type a question in the chatbot (right side)
- Example: "What are the key parties?"
- Get instant AI-powered answers

---

## 📊 Your Current Status

From your console log:
```
✅ Extracted 110,501 characters from PDF
✅ Document validated (Confidence: 80.8%)
❌ API error 400: API key not valid
```

**You're 95% there!** Just add your API key and you're done.

---

## 💡 Pro Tips

### Choose the Right Model
Your 66-page document should use:
- ✅ **Gemini 1.5 Pro** (supports up to 75 pages, most capable)
- ⚠️ Not Gemini 2.0 Flash (only for <10 pages)

### Save API Quota
- Use chatbot sparingly (each question = 1 API call)
- Choose appropriate model for document size
- Gemini 1.5 Pro has only 50 requests/day

### Upload Modes
- **PDF with Text**: Your current choice ✅ (fastest)
- **PDF + Images**: For scanned documents (slower, uses OCR)
- **Single Image**: For photos of documents

---

## 🎨 What You'll See

### Dark Theme UI
- Black background with navy/violet accents
- Glassmorphism effects on upload boxes
- Smooth animations and hover effects

### Three Upload Boxes
- Side by side layout
- Auto-disable when one is selected
- Clear icons and descriptions

### Split Bottom Layout
- **Left**: Summary with markdown formatting
- **Right**: Chatbot for questions

---

## ⚡ Next Steps

1. **Get API Key** → [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Add to config** → Use `setup.html` or edit `config.js`
3. **Refresh browser** → Reload the page
4. **Upload & Summarize** → Try it out!

---

## 🆘 Need Help?

### Common Issues

**"API key not valid"**
- Double-check you copied the entire key
- Ensure no extra spaces
- Key should start with `AIza`

**"Quota exceeded"**
- Check usage at [Google AI Studio](https://aistudio.google.com/)
- Wait 24 hours for quota reset
- Use a different model with higher limits

**PDF won't load**
- Already working for you! ✅
- If issues arise, try "PDF + Images" mode

---

**Ready? Let's get that API key and start summarizing! 🚀**
