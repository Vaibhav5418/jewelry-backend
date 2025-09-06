const express = require('express');
const router = express.Router();
const { sendOrderConfirmation } = require('../controllers/orderController');

// POST /api/orders/confirm
router.post('/confirm', sendOrderConfirmation);

module.exports = router;


