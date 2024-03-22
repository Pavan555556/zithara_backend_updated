const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/createApiKey', apiController.createApiToken);

module.exports = router;