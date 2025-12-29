// Import React hooks
import React, { useState, useEffect, useCallback, useRef } from "react";

// Import socket.io client to connect to backend
import io from "socket.io-client";

const ChatApp = () => {
  // Stores username entered by user
  const [username, setUsername] = useState("");

  // Stores all chat messages
  const [messages, setMessages] = useState([]);

  // Stores list of online users
  const [users, setUsers] = useState([]);

  // Stores current message input
  const [message, setMessage] = useState("");

  // Tracks whether user has joined the chat
  const [joined, setJoined] = useState(false);

  // Holds socket instance without causing re-renders
  const socketRef = useRef(null);

  // Runs when a new message is received from server
  const handleNewMessage = (data) => {
    // Add new message to the top of messages list
    setMessages((prevMessages) => [data, ...prevMessages]);
  };

  // Runs when server sends updated user list
  const handleUserUpdate = (userList) => {
    console.log(userList);
    setUsers(userList);
  };

  // Called when user clicks "Join Chat"
  const joinChat = () => {
    if (username.trim()) {

      // Save username so it persists after refresh
      localStorage.setItem("username", username);

      // Create new socket connection
      socketRef.current = io("http://localhost:5000");

      // Tell server this user joined
      socketRef.current.emit("join", username);

      // Receive old chat messages from server
      socketRef.current.on("messageHistory", (history) => {
        setMessages(history);
      });

      // Listen for new incoming messages
      socketRef.current.on("message", handleNewMessage);

      // Listen for online users update
      socketRef.current.on("users", handleUserUpdate);

      // Switch UI to chat screen
      setJoined(true);
    }
  };

  // Runs once when component loads
  useEffect(() => {
    // Check if username is already saved
    const savedUsername = localStorage.getItem("username");

    if (savedUsername) {
      setUsername(savedUsername);
      joinChat(); // auto-join chat on refresh
    }
  }, []);

  // Send message to server
  const sendMessage = () => {
    if (message.trim()) {
      socketRef.current.emit("sendMessage", { username, message });
      setMessage(""); // clear input box
    }
  };

  // Logout user and reset everything
  const logout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect(); // disconnect socket
      socketRef.current = null;
    }

    setUsername("");
    setJoined(false);
    setMessages([]);
    setUsers([]);
  };

  // Optimize username input handler
  const onChangeUsername = useCallback(
    (e) => setUsername(e.target.value),
    []
  );

  return (
    <div className="chat-container">
      {/* Show join screen if user has not joined */}
      {!joined ? (
        <div className="chat-header">
          <h2>Enter Your Name</h2>
          <div className="username-input">
            <input
              type="text"
              placeholder="Username..."
              value={username}
              onChange={onChangeUsername}
            />
            <button onClick={joinChat}>Join Chat</button>
          </div>
        </div>
      ) : (
        <>
          {/* Header after joining */}
          <div className="chat-header joined">
            <div>Welcome, {username}!</div>
            <button onClick={logout}>Logout</button>
          </div>

          {/* Online users list */}
          <div className="users">
            <strong>Online Users:</strong> {users.join(", ")}
          </div>

          {/* Messages list */}
          <div className="message-list">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.username === username ? "me " : ""
                }${
                  msg.message.includes("joined the chat.") ||
                  msg.message.includes("has left the chat.")
                    ? "system"
                    : ""
                }`}
              >
                <strong>{msg.username}:</strong> {msg.message}
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatApp;
