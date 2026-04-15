const mongoose= require('mongoose')

async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
    console.log("Database Connected")
    }
    catch(err){
        console.log("Cannot connect to Database", err)
    }
}

module.exports=connectToDb
