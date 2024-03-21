// Import the Express module
const express = require('express');
const connectDB = require('./db');
const customerRoutes = require('./routes/customerRoutes')

// Create an instance of Express
connectDB();
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use customer routes
app.use('/api', customerRoutes);

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define the port number
const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
