const mongoose= require('mongoose')

async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }
    catch(err){
        console.error("Database connection error:", err.message)
        process.exit(1)
    }
}

module.exports=connectToDb
