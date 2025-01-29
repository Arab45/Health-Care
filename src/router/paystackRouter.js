const express = require('express');
const router = express.Router();
const { initializePayment } = require('../controller/paystackController');

router.post('/acceptpayment', initializePayment.acceptPayment);

module.exports = router