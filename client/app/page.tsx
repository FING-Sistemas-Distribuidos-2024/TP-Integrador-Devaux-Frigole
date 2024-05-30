"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("10.68.33.110:4000");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("join", "general"); // Join the general room

    const messageListener = (message: string) => {
      console.log("Received message from server:", message);
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", messageListener);

    // Clean up the listener on component unmount
    return () => {
      socket.off("message", messageListener);
    };
  }, []);

  const sendMessage = () => {
    console.log("Sent message:", message);
    socket.emit("message", { room: "general", message });
    setMessage("");
  };

  return (
    <>
      <div>
        <h1>Chat App</h1>
        <div id="chat">
          <div>Messages</div>
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
      <button onClick={() => setMessages([])}>Clear</button>
    </>
  );
}
