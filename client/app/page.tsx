'use client';

import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
  // Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:4000');
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  const [message, setMessage] = useState('');

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => {
    sendMessage(message);
  }, [message, sendMessage]);

  const handleMessageInput = (e: any) => {
    setMessage(e.target.value);
  }

  return (
    <div>
      <input
        placeholder='Escribi un mensaje...'
        value={message}
        onChange={handleMessageInput}
      />
      <button
        onClick={handleClickSendMessage}
      >
        Click Me to send '{message}'
      </button>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <li key={idx}>{message ? message.data : null}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketDemo;