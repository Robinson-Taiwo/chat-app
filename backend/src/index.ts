import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app); // Create an Express server

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "https://your-frontend-url.onrender.com", // Update this to your frontend's URL
    credentials: true,
    methods: ["POST", "GET"],
  },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Emit a message to the connected client
  socket.emit("message", "Hello User!");

  // Handle messages from clients
  socket.on("sendMessage", (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast message to all clients except sender
    socket.broadcast.emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

// Start the server
server.listen(4000, () => {
  console.log("Server started on PORT", 4000);
});
