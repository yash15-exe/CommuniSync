import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userAuthRoutes from "./Routes/authRoutes.js";
import communityRoutes from "./Routes/communityRoutes.js";
import messageRoutes from "./Routes/messageRoute.js"
import postRoutes from "./Routes/postRoutes.js"
import commentRoutes from "./Routes/commentRoutes.js"
import { Server } from "socket.io";
import http from "http";
import messageModel from "./Models/MessageModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error(err);
  });

// Create HTTP server


// Routing Endpoints
app.use("/auth", userAuthRoutes);
app.use("/community", communityRoutes);
app.use("/message", messageRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
