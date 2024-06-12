const { createClient } = require("redis");

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const redisClient = createClient({ url: redisUrl });

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

redisClient.connect();

async function saveMessage(key, message) {
  try {
    await redisClient.set(key, message);
    console.log(`Message saved with key ${key}`);
  } catch (err) {
    console.error('Error saving message:', err);
  }
}

async function getMessage(key) {
  try {
    const mensaje = await redisClient.get(key);
    console.log(`Message: ${mensaje}`);
    return mensaje;
  } catch (err) {
    console.error('Error getting message:', err);
  }
}

async function getAllMessages() {
  try {
    const claves = await redisClient.keys('*');
    const mensajes = [];
    for (const clave of claves) {
      const mensaje = await redisClient.get(clave);
      mensajes.push({ clave, mensaje });
    }
    console.log('All messages:', mensajes);
    return mensajes;
  } catch (err) {
    console.error('Error getting all messages:', err);
  }
}

module.exports = { saveMessage, getMessage, getAllMessages };