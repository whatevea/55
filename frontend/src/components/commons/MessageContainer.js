// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import ConversationsAndMessagingTab from './ConversationsAndMessagingTab';

// const MessagesContainer = () => {
//   const [inputValue, setInputValue] = useState('');
//   const location = useLocation();
//   const messageReceiverId = location.state?.userId

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const clearInput = () => {
//     setInputValue('');
//   };

//   return (
//     <div className="bg-white flex flex-col md:flex-row md:gap-4 shadow-md rounded-lg mt-4 p-4 w-[95%] mx-auto">
//       <div className="flex items-center flex-col justify-between mb-4 md:w-[30%]">
//         <h2 className="text-xl font-semibold">Messages</h2>
//         <div className="flex items-center w-full relative">
//           <input
//             type="text"
//             placeholder="Search Messages"
//             value={inputValue}
//             onChange={handleInputChange}
//             className="px-4 py-1.5 border mt-3 w-full border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
//           />
//           {inputValue && (
//             <i
//               className="fa-regular fa-circle-xmark absolute left-[90%] md:left-[89%] top-[40%] hover:text-green-500 text-green-500 text-xl"
//               onClick={clearInput}
//             ></i>
//           )}
//         </div>
//         <div className="w-full">

//           {
//             inputValue ? <ConversationsAndMessagingTab messageReceiverId={messageReceiverId} /> : <div className='h-64 bg-gray-100 mt-4 rounded-lg text-gray-500 flex items-center justify-center'> Conversations will appear here

//             </div>
//           }
//         </div>
//       </div>
//       <div className="text-gray-500 text-center md:w-[70%] flex items-center justify-center">
//         <div>

//           <p>Welcome to Messages</p>
//           <p>Once you connect with a freelancer, you'll be able to chat and collaborate here</p>
//           <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4">
//             Search for talent
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagesContainer;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React, { useState, useRef, useEffect } from 'react';

// const ChatComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   const handleMessageChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== '') {
//       const newMessageObj = {
//         sender: 'user',
//         text: newMessage,
//       };
//       setMessages([...messages, newMessageObj]);
//       setNewMessage('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="flex h-screen p-7 rounded-lg">
//       {/* Left Sidebar */}
//       <div className="bg-green-100 w-48 py-4 px-2">
//         <div className="flex items-center mb-4">
//           <div className="bg-gray-300 rounded-full p-2 mr-2">M</div>
//           <span className="font-bold">Marta Curtis</span>
//         </div>
//         <div className="flex items-center mb-4">
//           <div className="bg-gray-300 rounded-full p-2 mr-2">P</div>
//           <span className="font-bold">Philip Tucker</span>
//         </div>
//         <div className="flex items-center">
//           <div className="bg-gray-300 rounded-full p-2 mr-2">C</div>
//           <span className="font-bold">Christine Reid</span>
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 bg-green-50 p-4 flex flex-col">
//         <div className="overflow-y-auto mb-4 p-4 flex-grow border border-red-500">
//           {/* Render messages */}
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`mb-4 flex justify-${
//                 message.sender === 'user' ? 'end' : 'start'
//               }`} // Use justify-end for right alignment
//             >
//               {message.sender === 'user' && (
//                 <div
//                   className={`rounded-lg p-2 w-[50%] bg-green-600 text-white`}
//                 >
//                   <span>{message.text}</span>
//                 </div>
//               )}
//               {message.sender !== 'user' && (
//                 <div
//                   className={`rounded-lg p-2 w-[50%] bg-white text-gray-600`}
//                 >
//                   <span>{message.text}</span>
//                 </div>
//               )}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="flex items-center">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 border rounded-lg p-2 mr-2"
//             value={newMessage}
//             onChange={handleMessageChange}
//             onKeyPress={handleKeyPress}
//           />
//           <button
//             className="bg-green-600 hover:bg-green-500 text-white text-base font-semibold rounded-md p-2"
//             onClick={handleSendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;

// TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT

import React, { useState, useRef, useEffect } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

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

  return (
    <div className="flex h-screen p-7 rounded-lg">
      {/* Left Sidebar */}
      <div className="bg-green-100 w-48 py-4 px-2">
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full p-2 mr-2">M</div>
          <span className="font-bold">Marta Curtis</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full p-2 mr-2">P</div>
          <span className="font-bold">Philip Tucker</span>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-300 rounded-full p-2 mr-2">C</div>
          <span className="font-bold">Christine Reid</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-green-50 p-4 flex flex-col">
        <div className="overflow-y-auto mb-4 p-4 flex-grow border border-red-500">
          {/* Render messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex justify-${
                message.sender === 'user' ? 'end' : 'start'
              } mb-2 `} // Added `mb-2` for spacing
            >
              {message.sender === 'user' && (
                <div
                  className={`rounded-lg p-2 w-[50%] bg-green-600 text-white`}
                >
                  <span>{message.text}</span>
                </div>
              )}
              {message.sender !== 'user' && (
                <div
                  className={`rounded-lg p-2 w-[50%] bg-white text-gray-600`}
                >
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

