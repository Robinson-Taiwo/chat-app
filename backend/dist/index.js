"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["POST", "GET"],
    }
});
io.on("connection", (socket) => {
    io.emit("message", "Hello User", socket.id);
});
server.listen(4000, () => {
    console.log("server started on PORT", 4000);
});
