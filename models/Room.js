const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: [true, 'Please provide a room ID'],
        unique: true
    },
    usersNumber: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Room', roomSchema);