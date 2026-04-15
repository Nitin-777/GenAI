const userModel = require("../models/user.model")
const jwt= require('jsonwebtoken')  
const bcrypt = require('bcryptjs');


 async function  registerUserController(req,res) {
      const {username,email,password}= req.body;

      if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide required information"
        })
      }
      const isUserAlreadyExist= await userModel.findOne({
        $or: [{username},{email}]
      })

      if(isUserAlreadyExist){
        return res.status(401).json({
            message: "User already exist with this user name and password"
        })
      }

      const hash=await bcrypt.hash(password,10)

      const user= await userModel.create({
        username,
        email,
        password: hash
      })
    
      const token=jwt.sign(
        { id:user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
      )

      res.cookie("token", token);
       res.status(201).json({
        message: " User Registered Successfully",
  user:{
        id: user._id,
        username: user.username,
        email: user.email
  }
       })

}

async function loginUserController(req,res){
     const {email, password}= req.body;
     const user= await userModel.findOne({email})

     if(!user){
        return res.status(401).json({
            message: "User not registered"
        })
     }

     const isPasswordValid= await bcrypt.compare(password, user.password)

     if(!isPasswordValid){
        return res.status(401).json({
            message: "Password is invalid"
        })
     }

     const token= jwt.sign(
        {id:user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn :"1d"}
     )

     res.cookie("token", token);
     res.status(201).json({
        message: "User logged in successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email,
        }
     })
}

module.exports= {
    registerUserController,
    loginUserController,
}