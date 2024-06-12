const websocket = require('ws');
const { saveMessage, getAllMessages } = require('./redis')

const wss = new websocket.WebSocketServer({ port: 4000 });
console.log('WebSocket Server running on port 4000 - v4.5');
var messageId = 0;

wss.on('connection', async (socket) => {
  /*console.log('Sending old messages to the new client...');
  const allMessages = await getAllMessages();
  if (allMessages !== undefined && allMessages.length > 0) {
    allMessages.forEach(message => {
      socket.send(message);
    });
  }*/
  
  socket.on('message', (data) => {
    console.log('Received: %s', data.toString());
    saveMessage(messageId.toString(), data.toString());
    messageId++;
    wss.clients.forEach(client => client.send(data.toString()));
  });
});
