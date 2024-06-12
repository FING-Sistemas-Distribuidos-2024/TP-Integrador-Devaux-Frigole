const websocket = require('ws');
const { saveMessage } = require('./redis')

const wss = new websocket.WebSocketServer({ port: 4000 });
console.log('WebSocket Server running on port 4000');
var messageId = 0;

wss.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log('Received: %s', data.toString());
    saveMessage(messageId.toString(), data.toString());
    messageId++;
    wss.clients.forEach(client => client.send(data.toString()));
  });
});
