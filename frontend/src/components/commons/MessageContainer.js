import { useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import http from '../../config/http';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [myChats, setMyChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const messageReceiverId = location.state?.userId;


  console.log('newMessage is', newMessage);
  console.log('messages is', messages)
  console.log('selectedUser is', selectedUser)

  // Fetching messageReceiverId Data
  const fetchUserData = async (userId) => {
    try {
      const response = await http.get(`/auth/getUserData/${userId}`);
      const userData = response.data.data; // Adjust this based on your server response structure
      setUserData((prevData) => ({
        ...prevData,
        [userId]: userData,
      }));
    } catch (error) {
      console.error(`Failed to fetch user data for ${userId}:`, error);
    }
  };

  useEffect(() => {
    if (messageReceiverId) {
        setSelectedUser(messageReceiverId);
    }
}, [messageReceiverId]);

  useEffect(() => {
    fetchUserData(messageReceiverId);
  }, [messageReceiverId]);

  useEffect(() => {
    if (userData) {
      setMyChats([userData]); // Add userData to myChats array
    }
  }, [userData]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        sender: 'user',
        text: newMessage,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div className="flex h-[600px] p-7 rounded-xl">
      {/* Left Sidebar */}
      <div className="bg-green-100 w-52 py-4 px-2">
        <h2 className='my-2 flex justify-center text-xl font-semibold'>My Chats</h2>
        {myChats.map((chat, index) => (
          <div
            key={index}
            className={`flex items-center mb-4 rounded-md p-2 cursor-pointer ${chat[messageReceiverId]?._id === selectedUser
              ? 'bg-green-600 text-white'
              : 'hover:bg-green-600 hover:text-white'
              }`}
            onClick={() => handleUserClick(chat[messageReceiverId]?._id)}
          >
            <div
              className={`text-xl mr-2 ${chat[messageReceiverId]?.userId === selectedUser
                ? 'bg-green-600 text-white'
                : 'hover:bg-green-600 hover:text-white'
                }`}
            >
              {chat[messageReceiverId]?.fname[0]?.toUpperCase()}
            </div>
            <span className="font-bold">
              {chat[messageReceiverId]?.fname.charAt(0).toUpperCase() +
                chat[messageReceiverId]?.fname.slice(1)}{' '}
              {chat[messageReceiverId]?.lname.charAt(0).toUpperCase() +
                chat[messageReceiverId]?.lname.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-green-50 p-4 flex flex-col">
        <div className="overflow-y-auto  mb-4 p-4 flex-grow ">
          {/* Render messages */}
          {selectedUser &&
            messages
              .filter(
                (message) =>
                  (message.sender === 'user') ||
                  (message.sender === selectedUser)
              )
              .map((message, index) => (
                <div
                  key={index}
                  className={`flex justify-${message.sender === selectedUser ? 'start' : 'end'} mb-2 p-2`}
                >
                  {message.sender === 'user' && (
                    <div className={`chat-bubble rounded-lg p-2 w-[50%] bg-green-600 text-white`}>
                      <span>{message.text}</span>
                    </div>
                  )}
                  {message.sender !== 'user' && (
                    <div className={`rounded-lg p-2 w-[50%] bg-white text-gray-600`}>
                      <span>{message.text}</span>
                    </div>
                  )}
                </div>
              ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-lg p-2 mr-2"
            value={newMessage}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-green-600 hover:bg-green-500 text-white text-base font-semibold rounded-md p-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
