# GenAI - Interview Report Generator

A full-stack web application that generates AI-powered interview reports by analyzing job descriptions, self-descriptions, and resumes using Google's Gemini AI.

## 🌐 Live Demo

- **Frontend**: https://gen-ai-bice.vercel.app/
- **Backend API**: https://genai-kmyr.onrender.com

## 📋 Features

- **User Authentication**: Secure registration and login
- **Interview Report Generation**: AI-powered analysis using Google Gemini
- **Resume Parsing**: PDF and text document support
- **Report Management**: View and manage all generated interview reports
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **SASS/SCSS** - Styling

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Google Gemini AI** - AI analysis
- **Multer** - File upload handling

## 📁 Project Structure

```
GenAi/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── style/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── DEPLOYMENT_GUIDE.md
└── README.md
```

## 🔧 Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_GENAI_API_KEY=your_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
```

5. Start development server:
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```
VITE_API_URL=http://localhost:3000
```

5. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/get-me` - Get current user info

### Interview Reports
- `POST /api/interview` - Generate interview report
- `GET /api/interview` - Get all user's reports
- `GET /api/interview/report/:interviewId` - Get specific report

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Quick Deployment Steps

1. **Backend to Render**:
   - Push code to GitHub
   - Connect repository to Render
   - Add environment variables
   - Deploy

2. **Frontend to Vercel**:
   - Push code to GitHub
   - Import project to Vercel
   - Add environment variables
   - Deploy

## 🔒 Environment Variables

### Backend (.env)
```
MONGO_URI=                    # MongoDB connection string
JWT_SECRET=                   # Secret for JWT tokens
GOOGLE_GENAI_API_KEY=         # Google Gemini API key
FRONTEND_URL=                 # Frontend application URL
NODE_ENV=                     # development/production
PORT=                         # Server port
```

### Frontend (.env)
```
VITE_API_URL=                 # Backend API base URL
```

## 🧪 Testing

### Backend
```bash
cd Backend
npm test
```

### Frontend
```bash
cd Frontend
npm test
```

## 🐛 Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your frontend URL
- Check that credentials are properly configured

### API Connection Failures
- Verify backend is running
- Check `VITE_API_URL` in frontend .env
- Ensure backend URL doesn't have trailing slash

### MongoDB Connection Issues
- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Nitin

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

