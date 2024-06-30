import socketIo from "socket.io"
import messageModel from "../Models/MessageModel";
export const socketServer = (server)=>{
    const io = socketIo(server, {
        cors: {
          origin: process.env.CORS_ALLOWED_URLS, // Your frontend URL
          methods: ["GET", "POST"]
        }
      });
      
      io.on('connection', (socket) => {
        console.log('A user connected');
      
        socket.on('joinRoom', ({ room }) => {
          socket.join(room);
          console.log(`User joined room: ${room}`);
        });
      
        socket.on('leaveRoom', ({ room }) => {
          socket.leave(room);
          console.log(`User left room: ${room}`);
        });
      
        socket.on('chatMessage', ({ room, message }) => {
          const newMessage = new messageModel({
            chat: room,
            sender: message.sender,
            content: message.content
          });
      
          newMessage.save().then((savedMessage) => {
            io.to(room).emit('message', savedMessage);
          });
        });
      
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
      });
}