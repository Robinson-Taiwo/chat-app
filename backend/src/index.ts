/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express")
import {Server} from "socket.io"
import { createServer } from "http";
const server = createServer()
 

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
        methods:["POST", "GET"],
    }
})

io.on("connection", (socket)=>{
    io.emit("message","Hello User", socket.id)
})

server.listen(4000,()=>{
    console.log("server started on PORT",4000)
}) 