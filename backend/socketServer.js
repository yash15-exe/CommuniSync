import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import messageModel from "./Models/MessageModel.js"; // Ensure the correct path
import mongoose from "mongoose"

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error(err);
  });



const app = express();
const PORT = process.env.SOCKET_SERVER_PORT || 5001;

const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ALLOWED_URLS, // Your frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", ( communityId ) => {
    socket.join(communityId);
    console.log(`User joined room: ${communityId}`);
  });

  socket.on("leaveRoom", ({ communityId }) => {
    socket.leave(communityId);
    console.log(`User left room: ${communityId}`);
  });

  socket.on("chatMessage", async ({ community, message }) => {
    console.log(message);
    const communityObjectId = community._id
    const communityId = community.communityId
    console.log(communityObjectId);
    const newMessage = new messageModel({
      community: communityObjectId,
      sender: message.sender,
      content: message.content,
      senderUsername:message.senderUsername
    });

    try {
      const savedMessage = await newMessage.save();
      io.to(communityId).emit("chatMessage", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the Socket.IO server
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
