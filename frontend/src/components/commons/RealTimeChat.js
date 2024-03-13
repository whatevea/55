// import React from 'react'

// const RealTimeChat = () => {
//     return (
//         <div>
//             <div className="chat chat-start">
//                 <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                         <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//                     </div>
//                 </div>
//                 <div className="chat-header">
//                     Obi-Wan Kenobi
//                     <time className="text-xs opacity-50">12:45</time>
//                 </div>
//                 <div className="chat-bubble">You were the Chosen One!</div>
//                 <div className="chat-footer opacity-50">
//                     Delivered
//                 </div>
//             </div>
//             <div className="chat chat-end">
//                 <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                         <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//                     </div>
//                 </div>
//                 <div className="chat-header">
//                     Anakin
//                     <time className="text-xs opacity-50">12:46</time>
//                 </div>
//                 <div className="chat-bubble">I hate you!</div>
//                 <div className="chat-footer opacity-50">
//                     Seen at 12:46
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RealTimeChat

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React, { useState } from 'react';

// const RealTimeChat = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     const handleMessageChange = (e) => {
//         setMessage(e.target.value);
//     };

//     const handleSendMessage = () => {
//         if (message.trim() !== '') {
//             setMessages([...messages, { sender: 'user', text: message }]);
//             setMessage('');
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleSendMessage();
//         }
//     };

//     return (
//         <div>
//             <div>
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
//                         <div className="chat-image avatar">
//                             <div className="w-10 rounded-full">
//                                 <img
//                                     alt="Tailwind CSS chat bubble component"
//                                     src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//                                 />
//                             </div>
//                         </div>
//                         <div className="chat-header">
//                             {msg.sender === 'user' ? 'You' : 'Anakin'}
//                             <time className="text-xs opacity-50">12:45</time>
//                         </div>
//                         <div className="chat-bubble">{msg.text}</div>
//                         <div className="chat-footer opacity-50">
//                             {msg.sender === 'user' ? 'Sent' : 'Received'}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="mt-4 flex">
//                 <input
//                     type="text"
//                     placeholder="Type your message..."
//                     className="px-2 rounded-md w-full focus:border-green-500 outline-none"
//                     value={message}
//                     onChange={handleMessageChange}
//                     onKeyDown={handleKeyDown}
//                 />
//                 <button className="btn bg-green-600 text-white hover:bg-green-500 ml-2" onClick={handleSendMessage}>
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default RealTimeChat;

// ====================================================================================================

import React, { useState } from 'react';

const RealTimeChat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, { sender: 'user', text: message }]);
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col">
            <div className='flex flex-col overflow-y-auto border-2 border-blue-500'>
                <div className="flex-grow">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS chat bubble component"
                                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {msg.sender === 'user' ? 'You' : 'Anakin'}
                                <time className="text-xs opacity-50">12:45</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">
                                {msg.sender === 'user' ? 'Sent' : 'Received'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='relative border-2 border-red-500'>
                <div className="flex items-center px-1 bg-white shadow-md rounded-md sticky bottom-0">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="px-2 rounded-md w-full focus:border-green-500 outline-none"
                        value={message}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn bg-green-600 text-white hover:bg-green-500 ml-2" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RealTimeChat;



