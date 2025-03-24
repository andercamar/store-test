const express = require('express');
const orderRoutes = require('./order.routes');
const productRoutes = require('./product.routes');

const router = express.Router();

router.use('/order', orderRoutes);
router.use('/product', productRoutes);

module.exports = router;