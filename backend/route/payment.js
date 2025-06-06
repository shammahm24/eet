const express = require('express');
const { createPaymentSession } = require('../controller/payment');

const router = express.Router();

router.post('/create-checkout-session', createPaymentSession);

module.exports = router;