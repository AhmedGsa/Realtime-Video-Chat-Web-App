const Room = require('../models/Room');
const { v4: uuidv4 } = require('uuid');

const createRoom = async (req, res) => {
    const roomID = uuidv4();
    try {
        await Room.create({ roomID });
        res.status(201).json({msg: "Room created successfully", roomID})
    } catch (error) {
        console.log(error);
    }
}

const joinRoom = async (req, res) => {
    const { roomID } = req.params;
    try {
        const room = await Room.findOne({ roomID });
        if (!room) {
            return res.status(404).json({msg: "Room not found"})
        } else {
            await Room.findByIdAndUpdate(room._id, { $inc: { usersNumber: 1 } });
            res.render('room', { roomID });
        }
    } catch (error) {
        console.log(error);
    }
}

const leaveRoom = async (roomID) => {
    try {
        const room = await Room.findOne({ roomID });
        if (room.usersNumber === 1) {
            await Room.findByIdAndDelete(room._id);
        } else {
            await Room.findByIdAndUpdate(room._id, { $inc: { usersNumber: -1 } }); 
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createRoom, joinRoom, leaveRoom};