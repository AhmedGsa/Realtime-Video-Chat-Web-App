const fs = require('fs');
const { PeerServer } = require('peer');
 
const peerServer = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem')
  }
}, () => {
  console.log(`Peer Server is running on port 9000`);
}); 