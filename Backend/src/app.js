const express= require('express')
const cookieParser = require('cookie-parser')
const cors= require('cors')

const app= express();
app.use(express.json()) 
app.use(cookieParser());
app.use(cors({
  origin: "https://visionary-paletas-dd34d0.netlify.app",
  credentials: true
}));
const authRouter= require('./routes/auth.routes')
const interviewRouter= require("./routes/interview.routes")


    app.use("/api/auth", authRouter);
    app.use("/api/interview", interviewRouter)

module.exports=app;
