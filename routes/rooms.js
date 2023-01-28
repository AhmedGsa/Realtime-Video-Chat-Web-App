const express = require('express');
const router = express.Router();
const {createRoom} = require('../controllers/rooms');

router.route('/').post(createRoom);

module.exports = router;