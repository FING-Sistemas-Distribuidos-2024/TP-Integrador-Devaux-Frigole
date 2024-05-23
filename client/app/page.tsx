"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join', 'general'); // Join the general room

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', { room: 'general', message });
    setMessage('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div id="chat">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
