const ApiToken = require("../models/apitokens");

// middleware for checking access
exports.checkToken = async (req, res, next) => {
    // console.log(apiKey);
    const headers = req.headers;
    const apiKey = headers['apikey'];
    const apiSecret = headers['apisecret'];
    const companyDetails = await ApiToken.find({apiKey : apiKey});
    if(!headers['apikey'] && !headers['apisecret']) {
        res.status(401).send("Unauthorised Access");
    }
    // console.log(companyDetails[0].apiKey);
    // console.log(companyDetails[0].apiSecret);
    
    else if(companyDetails[0].apiKey && apiSecret === companyDetails[0].apiSecret) {
        // console.log("I'm in");
            next();
    } 
    else {
        res.status(401).send("Unauthorised Access");
    }  
}