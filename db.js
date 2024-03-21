
const mongoose = require("mongoose");

const db = 'mongodb://localhost:27017/Zithara';

async function connectDB() {
    try {
        await mongoose.connect(db,{
            family: 4,
        });

        console.log("MongoDB is connected");
    } 
    catch (err) {
        console.error(err);
        // process.exit(1);
    }
};

module.exports = connectDB;