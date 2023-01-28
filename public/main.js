const navBtn = document.querySelector(".container header nav i")
const mobileNavBar = document.querySelector(".mobile-navbar")
const closeNavBarBtn = document.querySelector(".mobile-navbar i")
const navLinks = document.querySelectorAll(".mobile-navbar a")
const createRoomBtn = document.querySelector(".create-room")
const joinRoomForm = document.querySelector(".join-room")
const roomIdInput = document.querySelector(".room-id")

navBtn.onclick = (e) => {
    mobileNavBar.style.top = "0";
}
closeNavBarBtn.onclick = () => {
    mobileNavBar.style.top = "-200px";
}
navLinks.forEach(link => {
    link.onclick = () => {
        mobileNavBar.style.top = "-200px"
    }
});

createRoomBtn.onclick = async () => {
    try {
        const {data} = await axios.post('/room');
        console.log(data);
        window.location.href = `/room/${data.roomID}`;
    } catch (error) {
        console.log(error);
    }
}

joinRoomForm.onsubmit = (e) => {
    e.preventDefault();
    try {
        console.log(roomIdInput);
        window.location.href = `/room/${roomIdInput.value}`;
    } catch (error) {
        console.log(error);
    }
}