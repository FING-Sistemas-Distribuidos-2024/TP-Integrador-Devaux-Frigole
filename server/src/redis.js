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
    const message = await redisClient.get(key);
    console.log(`Message: ${message}`);
    return message;
  } catch (err) {
    console.error('Error getting message:', err);
  }
}

async function getAllMessages() {
  try {
    const keys = await redisClient.keys('*');
    const messages = [];
    for (const key of keys) {
      const message = await redisClient.get(key);
      messages.push(message);
    }
    console.log('All messages:', messages);
    return messages;
  } catch (err) {
    console.error('Error getting all messages:', err);
  }
}

module.exports = { saveMessage, getMessage, getAllMessages };