# GenAI Backend

Express.js backend server for the GenAI Interview Report Generator application.

## Features

- User authentication with JWT
- MongoDB integration for data persistence
- Google Gemini AI integration for interview analysis
- PDF resume parsing and analysis
- RESTful API endpoints
- CORS support for frontend communication
- File upload handling with Multer

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Google Gemini API key

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in root directory:
```bash
cp .env.example .env
```

3. Update `.env` with your values:
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key
GOOGLE_GENAI_API_KEY=your-api-key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
```

## Development

Start development server with hot reload:
```bash
npm run dev
```

The server will run on http://localhost:3000

## Production

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Project Structure

```
src/
├── config/
│   └── database.js          # MongoDB connection
├── controller/
│   ├── auth.controller.js   # Authentication logic
│   └── interview.controller.js # Interview report logic
├── middlewares/
│   ├── auth.middleware.js   # JWT authentication
│   └── file.middleware.js   # File upload handling
├── models/
│   ├── user.model.js        # User schema
│   ├── interviewReport.model.js # Report schema
│   └── blacklist.model.js   # Token blacklist
├── routes/
│   ├── auth.routes.js       # Auth endpoints
│   └── interview.routes.js  # Interview endpoints
├── services/
│   └── ai.service.js        # AI analysis service
└── app.js                   # Express app config

server.js                      # Entry point
```

## API Endpoints

### Authentication Routes (`/api/auth`)

**POST /register**
- Register new user
- Body: `{ username, email, password }`
- Returns: User data and JWT token

**POST /login**
- Login user
- Body: `{ email, password }`
- Returns: User data and JWT token

**POST /logout**
- Logout user
- Sets token blacklist

**GET /get-me**
- Get current logged-in user (requires auth)
- Returns: Current user data

### Interview Routes (`/api/interview`)

**POST /**
- Generate interview report
- Requires: Authentication
- Body: FormData with `jobDescription`, `selfDescription`, `resume` file
- Returns: Generated report

**GET /**
- Get all user's interview reports
- Requires: Authentication
- Returns: Array of user's reports

**GET /report/:interviewId**
- Get specific interview report
- Requires: Authentication
- Returns: Report details

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | Secret for JWT signing | your-secret-key |
| GOOGLE_GENAI_API_KEY | Google Gemini API key | AIzaSy... |
| FRONTEND_URL | Frontend application URL | http://localhost:5173 |
| NODE_ENV | Environment | development/production |
| PORT | Server port | 3000 |

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - CORS middleware
- **multer** - File upload
- **dotenv** - Environment variables
- **@google/genai** - Google Gemini API
- **cookie-parser** - Cookie handling
- **zod** - Data validation

## Deployment

### Render.com

1. Connect GitHub repository to Render
2. Set environment variables in Render dashboard
3. Configure build command: `npm install`
4. Configure start command: `npm start`
5. Deploy

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for detailed steps.

## Error Handling

The API returns standardized error responses:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Security Features

- Password hashing with bcryptjs
- JWT authentication
- Token blacklisting for logout
- CORS configuration
- Secure cookie flags in production
- Input validation with Zod

## Monitoring & Logs

The application logs:
- Server startup
- Database connections
- Authentication events
- API errors
- AI service calls

## Testing

```bash
npm test
```

## Performance Tips

1. Enable MongoDB indexing on frequently queried fields
2. Implement caching for interview reports
3. Optimize file uploads (limit size, supported formats)
4. Monitor API response times
5. Use database connection pooling

## Troubleshooting

**MongoDB connection fails**
- Verify MONGO_URI
- Check IP whitelist in MongoDB Atlas
- Ensure user has correct permissions

**CORS errors**
- Update FRONTEND_URL environment variable
- Restart server

**JWT token issues**
- Verify JWT_SECRET is set
- Check token expiration time
- Clear browser cookies and login again

## License

ISC

