
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.json({
    message: "Real-Time Chat Server is running",
  });
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Join a chat room
  socket.on("join_room", (room) => {
  // Leave all previous rooms
  socket.rooms.forEach((joinedRoom) => {
    if (joinedRoom !== socket.id) {
      socket.leave(joinedRoom);
    }
  });

  // Join the selected room
  socket.join(room);

  console.log(`${socket.id} joined ${room}`);
});

  // Receive and broadcast message only to the selected room
  socket.on("send_message", (data) => {
    console.log("Message received:", data);

    io.to(data.room).emit("receive_message", data);
  });

  // Typing indicator
  socket.on("typing", (data) => {
  console.log(`${data.username} is typing in ${data.room}...`);

  socket.to(data.room).emit("typing", data.username);
});

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:5173/`);
});

