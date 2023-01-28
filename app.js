const express = require('express');
const fs = require("fs")
const app = express();
const options = {
    key: fs.readFileSync("./localhost-key.pem"),
    cert: fs.readFileSync("./localhost.pem")
}
const server = require('https').createServer(options, app);
const io = require('socket.io')(server);
const connectDB = require('./db/connect');
const {leaveRoom} = require("./controllers/rooms");
const viewsRouter = require('./routes/views');
const roomsRouter = require('./routes/rooms');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use("/", viewsRouter);
app.use("/room", roomsRouter);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);
        socket.on("disconnect", async () => {
            socket.to(roomId).emit("user-disconnected", userId);
            await leaveRoom(roomId);
        })
    });
});