# Vercel Environment Variable Setup

## 🔐 Secure Your API Key

Your API key is now configured to use environment variables instead of being hardcoded.

---

## 📋 Setup Instructions

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 2. Select Your Project
Click on: **legal-document-summarizer**

### 3. Open Settings
Navigate to: **Settings** → **Environment Variables**

### 4. Add Environment Variable

| Field | Value |
|-------|-------|
| **Name** | `VITE_GEMINI_API_KEY` |
| **Value** | `AIzaSyCBVCpxQsmhghspdpTGzqPzuTcBCe2BH9s` |
| **Environment** | ✅ Production, ✅ Preview, ✅ Development |

### 5. Save and Redeploy

1. Click **Save**
2. Go to **Deployments** tab
3. Click **⋯** (three dots) on latest deployment
4. Click **Redeploy**
5. **Uncheck** "Use existing Build Cache"
6. Click **Redeploy** button

---

## ✅ How It Works Now

### Priority Order:
1. **Environment Variable** (`import.meta.env.VITE_GEMINI_API_KEY`) - Vercel deployment
2. **localStorage** (`gemini_api_key`) - User's browser storage
3. **Empty string** - Will show error if neither is set

### Code:
```javascript
API_KEY: import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || ''
```

---

## 🔒 Security Benefits

✅ **API key not in source code** - Safe to commit to GitHub  
✅ **Different keys per environment** - Can use different keys for dev/prod  
✅ **Easy key rotation** - Update in Vercel dashboard, no code changes  
✅ **No accidental exposure** - Key never appears in git history  

---

## 🧪 Testing

### Local Development:
Your `.env` file already has:
```
VITE_GEMINI_API_KEY=AIzaSyCBVCpxQsmhghspdpTGzqPzuTcBCe2BH9s
```
This works automatically with Vite!

### Vercel Deployment:
After adding the environment variable in Vercel dashboard, your app will use it automatically.

---

## ⚠️ Important Notes

- **Never commit `.env`** - It's already in `.gitignore`
- **Vite prefix required** - Environment variables must start with `VITE_`
- **Rebuild required** - After changing env vars, redeploy on Vercel
