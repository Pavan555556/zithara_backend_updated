exports.validateCustomer = (cust) => {
    if(cust._id) {
        throw new Error("Id not required. It's auto generated");
    }
    if(!cust.email && !cust.customerName ) {
        throw new Error('Email & Name are required');
    }
    else if(!cust.customerName) {
        throw new Error('Name is required');
    }
    else if(!cust.email) {
        throw new Error('Email is required');
    } 
    return true;
};

