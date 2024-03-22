const Customer = require('../models/customers');
const validator = require('../validations/customerValidator')

// Controller function to create a customer
exports.createCustomer = async (req, res) => {
    try {
        let cust = req.body;

        // Validate the request body
        const isValid = validator.validateCustomer(cust);
        if (!isValid) {
            res.status(400).send('Invalid request body');
            return;
        }
        
        const custmail = await Customer.find({ email: cust.email });
        if (custmail.length > 0) {
            // If email already exists, send a response indicating the user already exists
            res.status(200).send("User already exists");
        } else {
            // If email doesn't exist, create the customer
            const customer = await Customer.create(req.body);
            res.status(201).json(customer);
        }
    } catch (err) {
        // Handle other errors (e.g., validation errors)
        res.status(400).send(err.message);
    }
};
// Controller function to get all customers
exports.getAllCustomers = async (req, res) => {
    try {
      let { limit = 10, offset = 0, sortBy } = req.query;
      
      limit = parseInt(limit);
      offset = parseInt(offset);
  
      let sortOptions = {};
      if (sortBy) {
        sortOptions[sortBy] = 1; // Assuming ascending order, change to -1 for descending
      }
       console.log(sortOptions);
      const customers = await Customer.find()
      .skip(offset)
      .limit(limit)
        .sort(sortOptions);
  
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Controller function to get one customer
exports.getOneCustomer = async (req, res) => {
    try {
      const customers = await Customer.findOne(req.email);
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Controller function to update or create a customer by ID
exports.updateCustomer = async (req, res) => {
    const customerId = req.params.id;
    const { customerName, email, revenue, profit, orderCount } = req.body;
  
    try {
      // Try to find the customer by ID
      let updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        { customerName, email, revenue, profit, orderCount, updatedAt:Date.now() }
      );
  
      // If customer is not found, create a new one
      if (!updatedCustomer) {
        updatedCustomer = await Customer.create({
          customerName,
          email,
          revenue,
          profit,
          orderCount
        });
      }
  
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Controller function to delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    const customerId = req.params.id;
   if(!customerId) {
      res.status(400).send("Please enter valid email Id");
   }
   else {
    try {
      // what if id is not here
      //joischema (validating the object type)
      const deletedCustomer = await Customer.findByIdAndDelete(customerId);
  
      if (!deletedCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Controller function to get summary information
exports.getSummary = async (req, res) => {
    try {
      const summaryData = await Customer.aggregate([
        {
          $group: {
            _id: null,
            totalCustomers: { $sum: 1 }, // Count total customers
            totalOrderCount: { $sum: '$orderCount' }, // Sum of all order counts
            totalRevenue: { $sum: '$revenue' }, // Sum of all revenues
          }
        },
        {
          $project: {
            _id: 0,
            totalCustomers: 1,
            totalOrderCount: 1,
            totalRevenue: 1,
            avgOrderPerCustomer: { $divide: ['$totalOrderCount', '$totalCustomers'] } // Calculate average order per customer
          }
        }
      ]);
  
      if (summaryData.length === 0) {
        res.status(404).json({ error: 'No data found' });
        return;
      }
  
      res.status(200).json(summaryData[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

  
  