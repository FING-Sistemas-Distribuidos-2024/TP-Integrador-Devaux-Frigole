"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000");

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
    <div>
      <div className="w-screen h-screen flex flex-col items-center gap-3">
        <h1 className="flex pt-5">Chat App</h1>
        <div className="w-2/3 flex flex-col bg-neutral-800 p-5 gap-2 h-5/6 rounded-lg   ">
          <div className="flex justify-center ">Messages</div>
          {messages.map((msg, index) => (
            <div className="bg-neutral-700 py-1 px-2 rounded-lg" key={index}>
              {msg}
            </div>
          ))}
        </div>
        <div className="w-2/3 flex justify-between gap-2">
          <input
            className="bg-neutral-700 p-1 w-1/2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <div className="flex justify-between w-1/2 gap-2 ">
            <button
              className="bg-neutral-800 py-1 px-2 rounded-lg w-1/2"
              onClick={sendMessage}
            >
              Send
            </button>
            <button
              className="bg-red-600 py-1 px-2 rounded-lg w-1/2"
              onClick={() => setMessages([])}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}