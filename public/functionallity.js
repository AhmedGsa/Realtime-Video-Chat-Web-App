const socket = io("/");
const myVideoGrid = document.querySelector(".video-grid");

const peer = new Peer(undefined, {
    host: "/",
    port: "9000"
});

const contacts = {};

// My video Part

const myVideo = document.createElement("video");
myVideo.muted = true;

peer.on("open", (id) => {
    socket.emit("join-room", roomID, id);
})

peer.on("call", (call) => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then((stream) => {
        call.answer(stream);
        const usersVideo = document.createElement("video")
        call.on("stream", (userStream) => {
            addStreamToVideo(usersVideo, userStream);
        })
    })
})

socket.on("user-disconnected", (userId) => {
    contacts[userId].close()
})

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {
    addStreamToVideo(myVideo, stream);
    socket.on("user-connected", (userID) => {
        const call = peer.call(userID, stream);
        const userVideo = document.createElement("video");
        call.on("stream", (userStream) => {
            addStreamToVideo(userVideo, userStream);
        });
        call.on("close", () => {
            userVideo.remove();
        })
        contacts[userID] = call;
    }, (err) => {
        console.log("failed to get user stream");
    });
})



const addStreamToVideo = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    })
    myVideoGrid.appendChild(video);
}