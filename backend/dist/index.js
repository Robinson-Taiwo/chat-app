"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
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
