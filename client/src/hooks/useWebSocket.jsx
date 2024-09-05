// src/hooks/useWebSocket.js
import { useState, useEffect, useRef } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;
    setSocket(ws);

    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (msg) => {
    if (socketRef.current) {
      socketRef.current.send(msg);
    }
  };

  return { message, sendMessage };
};

export default useWebSocket;
