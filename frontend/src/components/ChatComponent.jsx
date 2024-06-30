import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { getTokenFromCookie } from "../utilities/cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatComponent({ communityId, community }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [hasMore, setHasMore] = useState(true);
  const chatContainerRef = useRef(null);
  const userObject = useSelector((state) => state.auth.user);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Establish Socket.IO connection
    const newSocket = io(import.meta.env.VITE_SOCKET_BACKEND_URL); // Connect to the same server that serves your React app

    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Join community room
    socket.emit("joinRoom", communityId);

    // Listen for new messages
    socket.on("chatMessage", (message) => {
      const createdAtIST = new Date(message.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });

      const messageWithTime = {
        ...message,
        createdAt: createdAtIST,
      };

      setMessages((prevMessages) => [messageWithTime, ...prevMessages]);
    });

    // Fetch initial messages from API
    fetchMessages();

    // Cleanup on unmount
    return () => {
      socket.emit("leaveRoom", communityId);
      socket.off("chatMessage");
    };
  }, [socket, communityId]);

  useEffect(() => {
    // Scroll to previous position on initial load and when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight - scrollPosition;
    }
  }, [messages]);

  const fetchMessages = async (lastMessageId = null) => {
    setLoading(true);
    try {
      const authToken = getTokenFromCookie(); // Replace with your actual token storage method
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      const response = await axios.post(
        "http://localhost:5000/message/getAllMessages",
        {
          community,
          lastMessageId,
        },
        { headers }
      );

      const newMessages = response.data.map((msg) => ({
        ...msg,
        createdAt: new Date(msg.createdAt).toLocaleString("en-IN", {
          hour12: true,
          timeZone: "Asia/Kolkata",
        }),
      }));

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      if (newMessages.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages!");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const message = {
      sender: userObject._id, // Replace with actual user ID or username
      community: communityId,
      content: messageInput,
      senderUsername: userObject.username,
    };
    // Emit message to server
    socket.emit("chatMessage", { message, community });

    // Clear message input
    setMessageInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleScroll = () => {
    if (chatContainerRef.current.scrollTop === 0 && hasMore && !loading) {
      const lastMessageId = messages[messages.length - 1]?._id;
      fetchMessages(lastMessageId);
    }
    setScrollPosition(
      chatContainerRef.current.scrollHeight - chatContainerRef.current.scrollTop
    );
  };

  const user = userObject._id;

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          style={{ height: "500px", overflowY: "scroll" }}
          className="scrollbar-hide p-6"
        >
          {messages
            .slice(0)
            .reverse()
            .map((message) => (
              <div
                key={nanoid()}
                className={`chat ${
                  message.sender === user ? "chat-end " : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>

                <div className="chat-bubble flex flex-col">
                  <div className="chat-header text-end">
                    {message.senderUsername}
                  </div>
                  <div className="text-left">{message.content}</div>
                  <time className="text-xs opacity-50">
                    {message.createdAt.substring(11)}
                  </time>
                </div>
              </div>
            ))}
          {loading && <p>Loading...</p>}
        </div>
      )}
      {!loading && (
        <div className="flex justify-center items-end space-x-2 mt-4">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md justify-center"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="btn btn-primary" onClick={handleSendClick}>
            Send
          </button>
        </div>
      )}
    </>
  );
}

export default ChatComponent;
