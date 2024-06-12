const Redis = require('ioredis');
require('dotenv').config();

const redisIp = process.env.REDIS_IP;
const redisPassword = process.env.REDIS_PASSWORD;
console.log('Redis IP:', redisIp);

if (redisPassword !== undefined) {
    console.log('Redis password not null');
}

let redisClient;
try {
    redisClient = new Redis.Cluster([
        {
            host: redisIp,
            port: 6379
        }
    ], {
        redisOptions: {
            password: redisPassword
        }
    });
} catch (error) {
    console.error('Error creating Redis client:', error);
    process.exit(1);
}

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

async function saveMessage(key, message) {
  try {
    await redisClient.set(key, message);
    console.log(`Message saved with key ${key}`);
  } catch (err) {
    console.error('Error saving message:', err);
  }
}

async function getAllMessages() {
  try {
    const nodes = redisClient.nodes('master');
    const keys = new Set();
    for (const node of nodes) {
      const nodeKeys = await node.keys('*');
      nodeKeys.forEach(key => keys.add(key));
    }
    const messages = [];
    for (const key of keys) {
      const message = await redisClient.get(key);
      messages.push({ key, message });
    }
    console.log('All messages:', messages);
    return messages;
  } catch (err) {
    console.error('Error getting all messages:', err);
  }
}

module.exports = { saveMessage, getAllMessages };