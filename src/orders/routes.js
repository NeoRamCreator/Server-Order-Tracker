// const { Router } = require('express');
const express = require('express');
const controller = require('./controller');

// const router = Router();
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('using api route')
// })

router.get('/', controller.getOrders);
router.get('/:id', controller.getOrderById);
router.delete('/:id', controller.deleteOrder);
router.get('/:title', controller.getOrderData);
router.post('/', controller.addOrder);

module.exports = router;
