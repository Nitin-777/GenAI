require("dotenv").config()
const connectToDb= require('./src/config/database')
const app= require("./src/app")



connectToDb()


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // Server running
});