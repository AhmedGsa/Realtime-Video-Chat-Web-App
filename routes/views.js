const express = require('express');
const router = express.Router();
const {joinRoom} = require('../controllers/rooms');

router.route('/').get((req, res) => {
    res.render('home');
});
router.route('/room/:roomID').get(joinRoom)

module.exports = router;