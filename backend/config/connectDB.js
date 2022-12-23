const mongoose = require("mongoose");

const connectDB = (databaseURI) => {
    try {
        mongoose.connect(databaseURI, () => {
            console.log(`Mongo DB connected`);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;