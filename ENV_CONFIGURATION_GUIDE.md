# Environment Configuration Guide

This guide explains all environment variables and how to configure them for different environments.

## Backend Environment Variables

Create `.env` file in the Backend directory with the following variables:

### Database Configuration

**MONGO_URI** (Required)
- MongoDB connection string
- For local MongoDB: `mongodb://localhost:27017/genai`
- For MongoDB Atlas: `mongodb+srv://username:password@cluster-name.mongodb.net/dbname`

### Authentication

**JWT_SECRET** (Required)
- Secret key for signing JWT tokens
- Should be a long, random string
- Generate one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Example: `abc123def456abc123def456abc123def456abc123def456abc123def456abc123`

### AI Configuration

**GOOGLE_GENAI_API_KEY** (Required)
- API key for Google Gemini AI
- Get from: https://ai.google.dev/
- Format: Starts with `AIzaSy...`

### Application URLs

**FRONTEND_URL** (Required)
- URL of your frontend application
- Used for CORS configuration
- Development: `http://localhost:5173`
- Production: `https://gen-ai-bice.vercel.app`

### Environment & Server

**NODE_ENV**
- Sets application mode
- Values: `development` or `production`
- Affects: Cookie security flags, error messages
- Default: `development`

**PORT**
- Port where server listens
- Development: `3000`
- Production: Leave empty (Render assigns automatically)
- Default: `3000`

## Frontend Environment Variables

Create `.env` or `.env.production` file in Frontend directory:

### API Configuration

**VITE_API_URL** (Required)
- Backend API base URL
- Development: `http://localhost:3000`
- Production: `https://genai-kmyr.onrender.com`
- Cannot be relative path in production

## Configuration by Environment

### Development Setup

**Backend/.env**
```env
MONGO_URI=mongodb://localhost:27017/genai
JWT_SECRET=your-dev-secret-key
GOOGLE_GENAI_API_KEY=your-api-key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
```

**Frontend/.env**
```env
VITE_API_URL=http://localhost:3000
```

### Production Setup (Render + Vercel)

**Backend - Environment Variables in Render Dashboard:**
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/genai
JWT_SECRET=generated-secure-string
GOOGLE_GENAI_API_KEY=AIzaSy...
FRONTEND_URL=https://gen-ai-bice.vercel.app
NODE_ENV=production
PORT=10000
```

**Frontend - Environment Variables in Vercel Dashboard:**
```
VITE_API_URL=https://genai-kmyr.onrender.com
```

**Frontend/.env.production** (local file)
```env
VITE_API_URL=https://genai-kmyr.onrender.com
```

## Security Recommendations

### JWT_SECRET Generation

Generate a secure random secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using OpenSSL
openssl rand -hex 32

# Or using Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### MongoDB Atlas Setup

1. Create cluster at https://mongodb.com/atlas
2. Create database user:
   - Username: Your choice
   - Password: Auto-generated (strong)
3. Whitelist IP addresses
4. Copy connection string
5. Replace `<password>` with actual password

### Google Gemini API

1. Go to https://ai.google.dev/
2. Click "Get API key"
3. Create new project if needed
4. Copy the API key
5. Keep it confidential

## Testing Configuration

To verify your configuration:

### Backend
```bash
cd Backend

# Load and validate env
node -e "require('dotenv').config(); console.log(process.env.MONGO_URI ? 'MONGO_URI: ✓' : 'MONGO_URI: ✗')"

# Test connection
npm run dev
# Check for "Database connected" or connection error
```

### Frontend
```bash
cd Frontend

# Check env variable
npm run build
# Should use VITE_API_URL from .env or .env.production
```

## Troubleshooting

### "Cannot find module 'dotenv'"
- Ensure dotenv is installed: `npm install dotenv`
- In backend, `require('dotenv').config()` is called in server.js

### "MongoDB connection failed"
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure username and password are correct
- Try connecting with MongoDB Compass

### "JWT verification failed"
- Ensure JWT_SECRET is the same in development and production
- Don't change JWT_SECRET if users have existing tokens
- Clear cookies and login again if changed

### "CORS errors in browser"
- Verify FRONTEND_URL matches your frontend URL exactly
- No trailing slashes
- Include protocol (http:// or https://)
- Reload browser after changing

### "API calls return 401 Unauthorized"
- Verify JWT token is being sent (check cookies)
- Ensure JWT_SECRET matches between auth and verification
- Check token expiration (currently 1 day)

## Environment-Specific Behavior

### Development
- Cookies use `secure: false` (HTTP)
- Error messages include full details
- CORS uses proxy settings in vite.config.js
- JWT token expires in 1 day

### Production
- Cookies use `secure: true` (HTTPS required)
- Error messages are generic
- CORS uses FRONTEND_URL environment variable
- JWT token expires in 1 day

## Changing Environment Variables

### During Development
- Edit `.env` file
- Restart server (`npm run dev`)
- Clear browser cache if needed

### On Render (Backend)
1. Go to Render dashboard
2. Select your service
3. Go to Settings
4. Find Environment section
5. Edit variables
6. Service automatically redeploys

### On Vercel (Frontend)
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Edit variables
5. Trigger redeploy or use "Redeploy" button

## Best Practices

1. **Never commit `.env` files** - Keep in `.gitignore`
2. **Use strong secrets** - Generate random strings for JWT_SECRET
3. **Use different secrets per environment** - Dev and prod should differ
4. **Rotate secrets regularly** - Especially in production
5. **Use environment-specific URLs** - Don't hardcode URLs
6. **Document required variables** - Keep `.env.example` updated
7. **Validate on startup** - Check all required env vars exist
8. **Use consistent naming** - Follow pattern in this guide

## Reference

### Variable Quick Reference

| Name | Required | Type | Example |
|------|----------|------|---------|
| MONGO_URI | Yes | String | mongodb://... |
| JWT_SECRET | Yes | String | abc123... |
| GOOGLE_GENAI_API_KEY | Yes | String | AIzaSy... |
| FRONTEND_URL | Yes | URL | https://... |
| NODE_ENV | No | String | production |
| PORT | No | Number | 3000 |
| VITE_API_URL | Yes (Frontend) | URL | https://... |

