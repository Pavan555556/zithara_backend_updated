const ApiToken = require('../models/apitokens');
const validator = require('../validations/apiTokenValidator');


exports.createApiToken = async (req, res) => {
    try {
        const companyName = req.body;
        // console.log(companyName);
        const existingCompany = await ApiToken.findOne( companyName );
        if(Object.keys(companyName).length === 0 || existingCompany) {
    
            res.status(400).send("Enter Correct Company Name");
        }
        else {
            const createdCompany = await ApiToken.create(companyName);
            res.status(201).send(createdCompany);
        }
    }
    catch(error) {
        res.status(404).send(error);
    }
}