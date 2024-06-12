const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { createClient } = require("redis");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Configura CORS para Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // Permite todas las fuentes, puedes especificar dominios específicos si lo prefieres
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: '*', // Permite cualquier origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Configuración y manejo del cliente de Redis
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
console.log("Redis URL:", redisUrl);
const redisClient = createClient({ url: redisUrl });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");

    io.on("connection", (socket) => {

      socket.on("join", async (room) => {
        // Chequear que el cliente no esté en la sala
        /*if (socket.rooms.has(room)) {
          console.log(`Client already in room: ${room}`);
          return;
        }*/

        socket.join(room);
        console.log(`Client joined room: ${room}`);

        // Recuperar mensajes antiguos de Redis y enviarlos al cliente
        try {
          console.log(`Retrieving old messages for room: ${room}`);
          const messages = await redisClient.lRange(`messages`, 0, -1);
          messages.forEach((message) => {
            console.log(`Sending old message: ${message}`);
            socket.emit("message", message );
          });
        } catch (err) {
          console.error("Error retrieving messages from Redis:", err);
        }
      });

      socket.on("clear", async (data) => {    console.error("Redis Subscriber Client Error", err)
        const { room } = data;
        console.log(`Deleting messages in room: ${room}`);
        await redisClient.del(`messages`);
      });
      
      socket.on("message", async (data) => {
        const { room, message } = data;
        console.log(`BackEnd Received message: ${message} in room: ${room}`);

        // Guardar el mensaje en Redis
        try {
          //await redisClient.rPush(`messages`, message);
          await redisClient.publish(room, message);
        } catch (err) {
          console.error("Error saving or publishing message to Redis:", err);
        }
      });

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
  });

app.get("/", (req, res) => {
  res.send("Chat server is running v3");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
