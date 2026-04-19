# Quick Start Deployment Guide

Follow these steps to deploy your GenAI application to Render (Backend) and Vercel (Frontend).

## ⏱️ Expected Time: 30 minutes

## Prerequisites

- GitHub account with your code pushed
- Render account (free): https://render.com
- Vercel account (free): https://vercel.com
- MongoDB Atlas cluster: https://mongodb.com/atlas
- Google Gemini API key: https://ai.google.dev/

## 📋 Step 1: Prepare Your Code (5 minutes)

```bash
# From project root
git add .
git commit -m "Prepare for deployment"
git push origin main
```

**Verify changes are in your repository:**
- Check [Backend/package.json](Backend/package.json) has `"start"` script
- Check [Frontend/.env](Frontend/.env) has production API URL
- Check [Frontend/vercel.json](Frontend/vercel.json) exists

## 🖥️ Step 2: Deploy Backend to Render (10 minutes)

### 2.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +" → "Web Service"**
3. Click **"Connect account"** and authorize GitHub
4. Select your GenAI repository
5. Choose **main** branch

### 2.2 Configure Service

Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | `genai-api` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` (or paid) |
| **Root Directory** | `Backend` |

### 2.3 Add Environment Variables

Click **"Advanced"** and add these variables:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=generate_secure_random_string
GOOGLE_GENAI_API_KEY=your_google_genai_key
FRONTEND_URL=https://gen-ai-bice.vercel.app
```

**To generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (2-3 minutes)
3. Copy your backend URL: `https://genai-kmyr.onrender.com` (or similar)
4. **Save this URL** - you'll need it for frontend

✅ Your backend is now live!

## 🌐 Step 3: Deploy Frontend to Vercel (10 minutes)

### 3.1 Import Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..." → "Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub repository URL
5. Click **"Import"**

### 3.2 Configure Project

| Field | Value |
|-------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `Frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 3.3 Add Environment Variables

Before clicking Deploy, scroll to **"Environment Variables"**:

```
VITE_API_URL=https://genai-kmyr.onrender.com
```

(Replace with your actual Render backend URL from Step 2.4)

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (1-2 minutes)
3. Copy your frontend URL when ready
4. **Save this URL** - it's your live application

✅ Your frontend is now live!

## ✅ Step 4: Verify Deployment (5 minutes)

### Test Backend

```bash
curl https://genai-kmyr.onrender.com/api/auth/get-me
# Should return 401 (unauthorized) - this is expected
```

### Test Frontend

1. Open https://gen-ai-bice.vercel.app
2. Register a new account
3. Login
4. Try generating an interview report
5. Check browser console for any errors

### Update Backend FRONTEND_URL

If you changed your frontend URL, update it in Render:

1. Go to https://dashboard.render.com
2. Select your genai-api service
3. Go to **"Settings"**
4. Find **"Environment"**
5. Update `FRONTEND_URL` to your actual frontend URL
6. Click **"Save Changes"**

## 🔄 Making Updates

### Update Backend

```bash
# In project root
cd Backend
# Make your changes
git add .
git commit -m "Update backend"
git push origin main
# Render automatically redeploys
```

### Update Frontend

```bash
# In project root
cd Frontend
# Make your changes
git add .
git commit -m "Update frontend"
git push origin main
# Vercel automatically redeploys
```

## 📚 Documentation Reference

For detailed information, see:

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [ENV_CONFIGURATION_GUIDE.md](ENV_CONFIGURATION_GUIDE.md) - Environment variables
- [README.md](README.md) - Project overview
- [Backend/README.md](Backend/README.md) - Backend documentation
- [Frontend/README.md](Frontend/README.md) - Frontend documentation

## 🆘 Common Issues

### Backend won't start

**Check Render logs:**
1. Go to dashboard.render.com
2. Select your service
3. Click **"Logs"**
4. Look for error messages

**Common causes:**
- Missing environment variables
- MongoDB connection error (check MONGO_URI)
- Node version mismatch

### Frontend shows blank page

**Check browser console (F12):**
- API URL errors?
- CORS errors?
- JavaScript errors?

**Solution:**
1. Verify `VITE_API_URL` in Vercel settings
2. Trigger redeploy: Go to Vercel, click **"Redeploy"**
3. Clear browser cache (Ctrl+Shift+Delete)

### API calls fail with CORS error

**Solution:**
1. Check backend environment variable `FRONTEND_URL`
2. Ensure it matches your Vercel frontend URL exactly
3. Update it if needed in Render dashboard
4. Wait for service to redeploy

### Database connection fails

**Check MongoDB Atlas:**
1. Go to https://mongodb.com/atlas
2. Click **"Database"**
3. Click **"Security" → "Network Access"**
4. Add `0.0.0.0/0` to allow all IPs (for testing)
5. For production, add specific IPs

## 🚀 Performance Tips

- Free tier services sleep after 15 minutes of inactivity
- Use UptimeRobot to keep backend awake: https://uptimerobot.com/
- Monitor Vercel Analytics for frontend performance

## 📊 Monitor Your Apps

### Render Dashboard
- Check logs and deployment status
- Monitor resource usage
- View error messages

### Vercel Dashboard
- Check deployment history
- View analytics
- Monitor performance

## 🔐 Security Reminders

- ✅ Never commit `.env` files
- ✅ Use strong `JWT_SECRET`
- ✅ Keep Google API key confidential
- ✅ Rotate secrets periodically
- ✅ Monitor application logs regularly

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Backend URL updated in Frontend
- [ ] Environment variables configured
- [ ] Registration/Login tested
- [ ] Interview report generation tested
- [ ] No console errors
- [ ] Both applications accessible

## 🎉 You're Done!

Your application is now deployed to:
- **Frontend**: https://gen-ai-bice.vercel.app
- **Backend**: https://genai-kmyr.onrender.com

Share the frontend URL with users!

For ongoing maintenance, refer to [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

