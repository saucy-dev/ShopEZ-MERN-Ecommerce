const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createOrder, getMyOrders, getOrderById,
    updateOrderToPaid, updateOrderStatus, getOrders,
} = require('../controllers/orderController');

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
