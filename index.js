// Import mongoose (used to talk to MongoDB)
const mongoose = require("mongoose");

// Connect to MongoDB database named "chatApp"
mongoose.connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => console.log("MongoDB Connected")) // success message
  .catch(err => console.log(err));              // error handling

// Define how a chat message should look in MongoDB
const messageSchema = new mongoose.Schema({
  username: String,          // who sent the message
  message: String,           // message text
  time: { type: Date, default: Date.now } // auto timestamp
});

// Create Message model (used to save & fetch messages)
const Message = mongoose.model("Message", messageSchema);

// Import backend libraries
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Create express app
const app = express();

// Create HTTP server using express
const server = http.createServer(app);

// Create socket.io server with CORS settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});

// Store currently connected users (in memory)
let users = [];

// Runs whenever a new socket connection is made
io.on("connection", (socket) => {
  console.log("User Joined");

  // Runs when user joins the chat
  socket.on("join", async (username) => {

    // Fetch last 20 messages from MongoDB
    const history = await Message.find().sort({ time: -1 }).limit(20);

    // Send old messages ONLY to the new user
    socket.emit("messageHistory", history.reverse());

    // Add user if not already present
    if (!users.some((user) => user.id === socket.id)) {
      users.push({ id: socket.id, username });
    }

    // Send updated user list to everyone
    io.emit(
      "users",
      users.map((user) => user.username)
    );

    // Send system message that user joined
    io.emit("message", {
      username: "System",
      message: `${username} has joined the chat.`,
    });
  });

  // Runs when a user sends a message
  socket.on("sendMessage", async (data) => {

    // Save message permanently in MongoDB
    const newMessage = new Message(data);
    await newMessage.save();

    // Send message to all connected users
    io.emit("message", data);
  });

  // Runs when user disconnects
  socket.on("disconnect", () => {

    // Find disconnected user
    const user = users.find((user) => user.id === socket.id);

    if (user) {
      // Remove user from users list
      users = users.filter((u) => u.id !== socket.id);

      // Send updated user list
      io.emit(
        "users",
        users.map((user) => user.username)
      );

      // Send system message that user left
      io.emit("message", {
        username: "System",
        message: `${user.username} has left the chat.`,
      });
    }
  });
});

// Start backend server on port 5000
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
