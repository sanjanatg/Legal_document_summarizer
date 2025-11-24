# Vercel Deployment Guide

## 🔐 API Key Security

This application uses a **user-provided API key** approach. Each user must set up their own Google Gemini API key via the `setup.html` page.

✅ **No API keys in GitHub** - Your repository is secure  
✅ **No Vercel environment variables needed** - Users provide their own keys  
✅ **No backend required** - Pure client-side application  

---

## 📋 Deployment Steps

### 1. Push to GitHub

Make sure all your changes are committed and pushed:

```bash
git add .
git commit -m "Update API key configuration"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Import Project**
3. Select your GitHub repository
4. Click **Deploy**

That's it! No environment variables needed.

---

## ✅ How It Works

### User Flow:
1. User visits your deployed site
2. If no API key is set, they're prompted to go to `setup.html`
3. User enters their own Google Gemini API key
4. Key is saved to browser's `localStorage`
5. User can now use the application

### Code:
```javascript
// config.js
API_KEY: localStorage.getItem('gemini_api_key') || ''
```

---

## 🔒 Security Benefits

✅ **No API keys in source code** - Safe to commit to GitHub  
✅ **No API keys in Vercel** - No environment variables needed  
✅ **User-controlled** - Each user uses their own API key  
✅ **No quota sharing** - Each user has their own Gemini API quota  

---

## 🧪 Testing

### Local Development:
```bash
npm run dev
```

Visit `http://localhost:5173/setup.html` to set your API key.

### Production (Vercel):
After deployment, visit your Vercel URL and go to `/setup.html` to configure your API key.

---

## ⚠️ Important Notes

- **`.env` is gitignored** - Never commit `.env` to GitHub
- **API keys are client-side** - Stored in user's browser localStorage
- **No backend needed** - This is a pure frontend application
- **Free Gemini API** - Users can get free API keys at [Google AI Studio](https://aistudio.google.com/app/apikey)
