import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url) => {
  const [message, setMessage] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => console.log('WebSocket connection established');

    socket.current.onmessage = (event) => {
      setMessage(event.data);
    };

    socket.current.onclose = () => console.log('WebSocket connection closed');

    return () => socket.current.close();
  }, [url]);

  const sendMessage = (msg) => {
    if (socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(msg);
    }
  };

  return { message, sendMessage };
};

export default useWebSocket;
