import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    if (message.trim() !== "") {
      socket.emit("message", message);
      setChat([...chat, message]);
      setMessage(""); 
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1>Chat App</h1>
        <div className="chat-box">
          {chat.map((msg, index) => (
            <div key={index} className="chat-message">
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="chat-form">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
