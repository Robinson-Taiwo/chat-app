/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend running on port 3000
    credentials: true,
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Listen for the message and userName from the client
  socket.on("sendMessage", (data) => {
    const { message, userName } = data;
    console.log(`Message received from ${userName}: ${message}`);

    // Broadcast the message along with the userName
    io.emit("receiveMessage", { message, userName });
  });

  // When the user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(4000, () => {
  console.log("Server started on PORT", 4000);
});
