/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const Page = () => {
    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState<{ userName: string, message: string }[]>([]);
    const [userName, setUserName] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isUserNameSet, setIsUserNameSet] = useState(false);

    // Use useMemo to memoize the socket instance to avoid re-creating the connection on re-renders
    const socket = useMemo(() => io("http://localhost:4000"), []);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            console.log("Connected:", socket.id);
        });

        socket.on("receiveMessage", (data) => {
            console.log("Message received:", data);
            setReceivedMessages((prevMessages) => [
                ...prevMessages,
                { userName: data.userName, message: data.message },
            ]);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
            console.log("Disconnected:", socket.id);
        });

        return () => {
            socket.off("connect");
            socket.off("receiveMessage");
            socket.off("disconnect");
        };
    }, [socket]);

    const handleSendMessage = () => {
        if (message && userName) {
            // Emit a message along with the userName to the server
            socket.emit("sendMessage", { message, userName });
            setMessage(""); // Clear the message input
        }
    };
    console.log(isConnected)

    const handleSetUserName = () => {
        if (userName.trim()) {
            setIsUserNameSet(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Chat App</h1>

                {!isUserNameSet ? (
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={handleSetUserName}
                        >
                            Set Username
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="messages mb-4 h-64 overflow-y-auto bg-gray-50 p-4 rounded-md shadow-inner">
                            {receivedMessages.map((msg, index) => (
                                <div key={index} className="mb-2">
                                    <strong className="text-blue-500">{msg.userName}: </strong>
                                    <span>{msg.message}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex">
                            <input
                                type="text"
                                className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page;
