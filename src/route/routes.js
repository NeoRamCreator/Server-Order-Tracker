// const { Router } = require('express');
const express = require('express');
const controller = require('./controller');

// const router = Router();
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('using api route')
// })
router.get('/', controller.getRouts);
router.delete('/:id', controller.deleteRoute);

router.get('/:id', controller.getRoutById);
router.post('/', controller.addRout);

module.exports = router;
