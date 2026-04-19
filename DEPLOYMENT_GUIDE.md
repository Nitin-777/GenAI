# Deployment Guide

This guide covers deploying the GenAI application to Render (Backend) and Vercel (Frontend).

## Backend Deployment (Render.com)

### Prerequisites
- Render account created at https://render.com
- MongoDB Atlas cluster (or other MongoDB service)
- Google Gemini AI API key

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create a Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

3. **Configure the service**
   - **Name**: genai-api (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid)

4. **Add Environment Variables**
   Click "Environment" and add:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   JWT_SECRET=your_secure_jwt_secret_key
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   FRONTEND_URL=https://gen-ai-bice.vercel.app
   ```

   **Note**: Replace with your actual values:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a secure random string
   - `GOOGLE_GENAI_API_KEY`: Your Google Gemini API key
   - `FRONTEND_URL`: Your Vercel frontend URL

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - You'll get a URL like: `https://genai-kmyr.onrender.com`

6. **Keep service running** (Free tier)
   - Free tier services go to sleep after 15 minutes of inactivity
   - To keep it running, add a cron job or use Render's paid tier
   - You can use tools like UptimeRobot to ping the service periodically

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account created at https://vercel.com
- GitHub repository connected to Vercel
- Backend API URL (from Render deployment)

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables and add:
   ```
   VITE_API_URL=https://genai-kmyr.onrender.com
   ```

   **Note**: Replace with your actual Render backend URL

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a URL like: `https://gen-ai-bice.vercel.app`

6. **Configure Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

---

## Post-Deployment Checklist

- [ ] Backend is running on Render
- [ ] Frontend is running on Vercel
- [ ] CORS is configured correctly (Frontend URL set in Backend)
- [ ] Environment variables are set correctly on both platforms
- [ ] Test user registration and login
- [ ] Test interview report generation
- [ ] Check browser console for any errors
- [ ] Verify API calls are going to correct backend URL

---

## Troubleshooting

### Backend Issues

**Application won't start**
- Check environment variables are set correctly
- Verify MongoDB connection string is valid
- Check backend logs in Render dashboard

**CORS errors**
- Ensure `FRONTEND_URL` in Backend environment matches deployed frontend URL
- Check that credentials are being sent correctly (`withCredentials: true`)

**Cold start delays**
- Free tier services sleep after inactivity
- Either upgrade plan or add uptime monitoring

### Frontend Issues

**API calls fail**
- Verify `VITE_API_URL` environment variable is set in Vercel
- Check that backend URL in env doesn't have trailing slash
- Clear browser cache and restart

**Build fails**
- Check build logs in Vercel dashboard
- Ensure all dependencies are installed
- Verify npm scripts exist in package.json

**Environment variable not working**
- Rebuild the project after adding env vars
- Use `import.meta.env.VITE_API_URL` (not `process.env`)

---

## Local Development

To test locally before deployment:

### Backend
```bash
cd Backend
npm install
# Create .env file with local values
npm run dev
```

### Frontend
```bash
cd Frontend
npm install
# Update .env with local backend URL
npm run dev
```

---

## Monitoring and Maintenance

1. **Check application health regularly**
   - Monitor error logs on both platforms
   - Test key features periodically

2. **Keep dependencies updated**
   - Regular security patches
   - Run `npm audit` to check vulnerabilities

3. **Monitor performance**
   - Use browser DevTools
   - Check network requests in Vercel Analytics
   - Monitor API response times

---

## Database Backups

- Ensure MongoDB Atlas has backup enabled
- Monitor storage usage
- Plan for scaling if needed

---

## Security Notes

- Never commit `.env` files to Git
- Use strong JWT secrets
- Rotate API keys periodically
- Keep dependencies updated
- Monitor for suspicious API activity

