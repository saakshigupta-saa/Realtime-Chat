
import { useEffect, useRef, useState } from "react";
import socket from "./socket";
import "./App.css";

function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [room, setRoom] = useState("General");

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to server:", socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from server");
      setConnected(false);
    };

    const handleReceiveMessage = (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    const handleTyping = (username) => {
      setTypingUser(username);

      clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser("");
      }, 1500);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("typing", handleTyping);

      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    socket.emit("join_room", room);
  }, [room]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (!message.trim() || !username.trim()) return;

    socket.emit("send_message", {
      username,
      message,
      room,
    });

    setMessage("");
  };

  return (
    <div className="chat-app">
      <div className="chat-container">

        <header className="chat-header">
          <div>
            <h1 className="chat-title">Real-Time Chat</h1>
            <span className="connection-status">
              {connected ? "Connected 🟢" : "Disconnected 🔴"}
            </span>
          </div>
        </header>

        <div className="user-section">
          <input
            className="username-input"
            type="text"
            placeholder="Enter your name..."
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <select
            className="room-select"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
          >
            <option value="General">General</option>
            <option value="Tech Support">Tech Support</option>
          </select>
        </div>

        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
  className={`message ${
    msg.username === username ? "message-own" : ""
  }`}
  key={index}
>
              <div className="message-username">
                {msg.username}
              </div>

              <p className="message-text">
                {msg.message}
              </p>
            </div>
          ))}
        </div>

        <div className="typing-indicator">
          {typingUser && `${typingUser} is typing...`}
        </div>

        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            className="message-input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);

              if (username.trim()) {
                socket.emit("typing", {
                  username,
                  room,
                });
              }
            }}
          />

          <button className="send-button" type="submit">
            Send
          </button>
        </form>

      </div>
    </div>
  );
}

export default App;
