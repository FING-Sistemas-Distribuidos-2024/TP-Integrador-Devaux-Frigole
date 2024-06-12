let websocket = require('ws');

const wss = new websocket.WebSocketServer({ port: 4000 });

var clients = [];

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('received: %s', data);
    wss.clients.forEach(client => client.send(data));
  });
});

/*
// Configura CORS para Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // Permite todas las fuentes, puedes especificar dominios específicos si lo prefieres
    methods: ["GET", "POST"],
  },
});

// Configuración y manejo del cliente de Redis
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const redisClient = createClient({ url: redisUrl });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");

    io.on("connection", (socket) => {
      console.log("Client connected");
      // Join a room
      socket.on("join", (room) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
      });

      // Handle incoming messages
      socket.on("message", async (data) => {
        const { room, message } = data;
        console.log(`BackEnd Received message: ${message} in room: ${room}`);
        // Publish the message to Redis
        try {
          await redisClient.publish(room, message);
        } catch (err) {
          console.error("Error publishing message to Redis:", err);
        }
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    // Subscribe to Redis channels
    const redisSubscriber = createClient({ url: redisUrl });
    redisSubscriber.on("error", (err) =>
      console.error("Redis Subscriber Client Error", err)
    );

    redisSubscriber
      .connect()
      .then(() => {
        redisSubscriber.subscribe("general", (message, channel) => {
          console.log(`Message from Redis on channel ${channel}: ${message}`);
          io.to(channel).emit("message", message);
        });

        console.log("Subscribed to Redis channel: general");
      })
      .catch((err) => {
        console.error("Failed to connect Redis subscriber:", err);
      });
  })
  .catch((err) => {
    console.error("Failed to connect Redis client:", err);
  });*/
