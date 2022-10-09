const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = () => {
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (error) {
        console.log(`MONGO DB connection error: ${error}`)
    }
}

module.exports = connectDB