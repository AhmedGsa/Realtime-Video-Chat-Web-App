# Realtime Chat Web Application
Front-end developed using HTML/CSS/JS

Back-end developed using Express.js and MongoDB with Socket.io and PeerJS libraries

![Image of the app](https://i.ibb.co/0YbfkJr/Screenshot-36.png)

![Image of the app 2](https://i.ibb.co/CVVyyvh/Screenshot-37.png)

## Setup

First you have to run the PeerJS Server
(Peer Server is running on port 9000)

Navigate to the PeerServer folder by 

```bash
cd PeerServer
```

then 

```bash
npm install && node peer_server.js
```

after that you setup your main server in a seperate terminal

```bash
npm install && npm start
```

don't forget to add .env file containe the MONGO_URI, PORT Variables.

## Functionality
- Realtime Vide Chat between users who joined the same room.
- Create a new room.
- Join an existing room by typing its ID.
- When a room become empty it automatically gets deleted.

## Future Upgrades
- There's no max users in a single room, so maybe i will add it later.
- Adding Authentication so the users need to have an account in order to create a room or join one.

## Routers

- rooms.js
- views.js
