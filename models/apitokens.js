const mongoose = require("mongoose");

const apiTokenSchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true,
        unique : true
    },
    apiKey : {
        type : String,
        default : new mongoose.Types.ObjectId().toString(),
        unique : true
    },
    apiSecret : {
        type : String,
        default : new mongoose.Types.ObjectId().toString(),
        unique : true
    }
});

const ApiToken = mongoose.model("ApiToken", apiTokenSchema);
module.exports = ApiToken;