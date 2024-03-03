// const { Router } = require('express');
const express = require('express');
const controller = require('./controller');

// const router = Router();
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('using api route')
// })
router.get('/', controller.getUsers);
router.delete('/:id', controller.deleteUser);
router.get('/:id', controller.getUserById);
router.post('/', controller.addUser);

module.exports = router;
