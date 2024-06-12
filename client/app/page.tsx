"use client";

import { unstable_noStore as noStore } from "next/cache";

import React, { useState, useCallback, useEffect, use } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const WebSocketDemo = () => {
  noStore();
  // Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    process.env.NEXT_PUBLIC_BACKEND_URL || "ws://localhost:700"
  );
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  const [message, setMessage] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    console.log("socketUrl: ", socketUrl);
  }, [socketUrl]);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("Message received: ", lastMessage);
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => {
    sendMessage(message);
    setMessage("");
    console.log("Message sent: ", message);
  }, [message, sendMessage]);

  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center gap-3">
        <h1 className="flex pt-5">Chat App</h1>
        <div className="w-2/3 flex flex-col bg-neutral-800 p-5 gap-2 h-5/6 rounded-lg max-h-full  overflow-y-auto ">
          <div className="flex justify-center ">Messages</div>
          {messageHistory.map((msg, index) => (
            <div className="bg-neutral-700 py-1 px-2 rounded-lg" key={index}>
              {msg.data}
            </div>
          ))}
        </div>
        <div className="w-2/3 flex justify-between gap-2">
          <input
            className="bg-neutral-700 p-1 w-1/2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleClickSendMessage();
              }
            }}
          />
          <div className="flex justify-between w-1/2 gap-2 ">
            <button
              className="bg-neutral-800 py-1 px-2 rounded-lg w-1/2"
              onClick={handleClickSendMessage}
            >
              Send
            </button>
            <button
              className="bg-red-600 py-1 px-2 rounded-lg w-1/2"
              onClick={() => setMessageHistory([])}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSocketDemo;
