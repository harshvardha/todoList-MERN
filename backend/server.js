const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 5000
const app = express()
const connectDB = require("./config/dbConnect")

connectDB()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use("/users", require("./routes/Users"))
app.use("/tasks", require("./routes/Tasks"))

mongoose.connection.once('open', () => {
    console.log("MONGO DB CONNECTED")
    app.listen(PORT, () => console.log(`Server listening at port ${PORT}`))
})