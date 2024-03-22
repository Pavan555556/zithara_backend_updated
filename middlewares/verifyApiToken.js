const ApiToken = require("../models/apitokens");

exports.checkToken = async (apiKey, apiSecret) => {
    // console.log(apiKey);
  
    const companyDetails = await ApiToken.find({apiKey : apiKey});

    console.log(companyDetails[0].apiKey);
    console.log(companyDetails[0].apiSecret);
    if(companyDetails[0].apiKey) {
        console.log("I'm in");
        if(apiSecret === companyDetails[0].apiSecret) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}