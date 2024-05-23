const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const redisClient = redis.createClient();

io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Join a room
    socket.on('join', (room) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
    });

    // Handle incoming messages
    socket.on('message', (data) => {
        const { room, message } = data;
        // Publish the message to Redis
        console.log('message', message);
        redisClient.publish(room, message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Subscribe to Redis channels
const redisSubscriber = redis.createClient();
redisSubscriber.on('message', (channel, message) => {
    io.to(channel).emit('message', message);
});

redisSubscriber.subscribe('general'); // Subscribe to a default room

app.get('/', (req, res) => {
    res.send('Chat server is running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
