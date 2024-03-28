// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import http from '../../config/http';
// import { toastConfig } from '../../config/toastConfig';
// import { toast } from 'react-toastify';

// const ChatArea = ({ contractId }) => {
//     const [inputText, setInputText] = useState("");
//     const [socket, setSocket] = useState(null);
//     // const [messages, setMessages] = useState([]);
//     const [receiverUser, setReceiverUser] = useState('');
//     const userData = useSelector((state) => state.User);
//     const loggedInUserId = userData?.userData?._id;
//     const messagesContainerRef = useRef(null);
//     const [conversationMessages, setConversationMessages] = useState({}); // this new line added

//     const messages = conversationMessages[receiverUser].map((msg, index)=>{
//         console.log('msg.senderId is', msg.senderId);
//     });

//     useEffect(() => {
//         const getContract = async () => {
//             let receiverId;
//             if (!contractId) return;
//             try {
//                 const response = await http.get(`/contract/getContractById/${contractId}`);
//                 const contract = response.data;
//                 let receiverId = userData.userData.user_type === 'hire' ? contract[0].employee?._id : contract[0].hirer?._id;
//                 setReceiverUser(receiverId);
//             } catch (error) {
//                 console.error('Error fetching contract:', error);
//             }

//             // this new code added
//             if (!conversationMessages[receiverId]) {
//                 setConversationMessages(prevConversationMessages => ({
//                     ...prevConversationMessages,
//                     [receiverId]: []
//                 }));
//             }

//         };
//         getContract();
//     }, [contractId, conversationMessages]);

//     useEffect(() => {
//         const newSocket = io("http://localhost:5000");
//         newSocket.on("connect", () => console.log("Connected to socket server and the newSocket.id is", newSocket.id));
//         newSocket.emit("joinRoom", contractId);
//         // newSocket.on("message-received", (message) => setMessages(prevMessages => [...prevMessages, message]));

//         // this new line added 
//         newSocket.on("message-received", (message) => {
//             setConversationMessages(prevConversationMessages => ({
//                 ...prevConversationMessages,
//                 [message.receiverId]: [...(prevConversationMessages[message.receiverId] || []), message]
//             }));
//         });

//         setSocket(newSocket);
//         return () => newSocket.disconnect();
//     }, [contractId]);

//     const handleSendMessage = () => {
//         if (!contractId) {
//             toast.error('No User Found. Please select a user to chat.', toastConfig);
//             return;
//         }
//         if (!inputText) return;
//         const newMessageData = { message: inputText, senderId: loggedInUserId, receiverId: receiverUser, roomId: contractId };
//         // setMessages(prevMessages => [...prevMessages, newMessageData]);
//         // this new code added
//         setConversationMessages(prevConversationMessages => ({
//             ...prevConversationMessages,
//             [receiverUser]: [...(prevConversationMessages[receiverUser] || []), newMessageData]
//         }));
//         socket.emit("chatMessage", newMessageData);
//         setInputText("");
//     };

//     const handleKeyDown = (event) => { if (event.key === "Enter") handleSendMessage(); };

//     useEffect(() => {
//         const scrollToBottom = () => messagesContainerRef.current?.scrollTo(0, messagesContainerRef.current.scrollHeight);
//         setTimeout(scrollToBottom, 100);
//     }, [conversationMessages]); //conversationMessages needs to be changed to messages

//     return (
//         <div className="flex-1 bg-green-50 p-4 flex flex-col height-full">
//             <div className="flex-grow overflow-auto relative" ref={messagesContainerRef}>
//                 <div className="flex flex-col justify-end h-full">
//                     {conversationMessages[receiverUser]?.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.senderId === loggedInUserId ? "justify-end" : "justify-start"} m-4`}>
//                             <div className={`${msg.senderId === loggedInUserId ? "bg-green-600 ml-auto" : "bg-gray-500"} text-white font-semibold p-3 rounded-lg max-w-[70%] my-1`}>
//                                 {msg.message}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="flex items-center broder border-purple-500">
//                 <input onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} type="text" value={inputText} placeholder="Type a message..." className="flex-1 border rounded-lg p-2 mr-2 focus:border-green-500 outline-none" />
//                 <button className="bg-green-600 hover:bg-green-500 text-white text-base font-semibold rounded-md p-2" onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ChatArea;


import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import http from '../../config/http';
import { toastConfig } from '../../config/toastConfig';
import { toast } from 'react-toastify';

const ChatArea = ({ contractId }) => {
    const [inputText, setInputText] = useState("");
    const [socket, setSocket] = useState(null);
    const [receiverUser, setReceiverUser] = useState('');
    const userData = useSelector((state) => state.User);
    const loggedInUserId = userData?.userData?._id;
    const messagesContainerRef = useRef(null);
    const [conversationMessages, setConversationMessages] = useState({}); // this new line added

    const userMessages = conversationMessages[receiverUser]?.map((msg, index) => {
        console.log('msg.senderId is', msg.senderId);
        console.log('loggedInUserId is', loggedInUserId);
    });

    console.log('receiverUser is', receiverUser);
    console.log('conversationMessages is', conversationMessages);

    useEffect(() => {
        const getContract = async () => {
            let receiverId;
            if (!contractId) return;
            try {
                const response = await http.get(`/contract/getContractById/${contractId}`);
                const contract = response.data;
                let receiverId = userData.userData.user_type === 'hire' ? contract[0].employee?._id : contract[0].hirer?._id;
                setReceiverUser(receiverId);
            } catch (error) {
                console.error('Error fetching contract:', error);
            }

            // this new code added
            if (!conversationMessages[receiverId]) {
                setConversationMessages(prevConversationMessages => ({
                    ...prevConversationMessages,
                    [receiverId]: []
                }));
            }

        };
        getContract();
    }, [contractId, conversationMessages]);

    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        newSocket.on("connect", () => console.log("Connected to socket server and the newSocket.id is", newSocket.id));
        newSocket.emit("joinRoom", contractId);


        // this new line added 
        newSocket.on("message-received", (message) => {
            console.log('message received from user', message);
            setConversationMessages(prevConversationMessages => ({
                ...prevConversationMessages,
                [message.receiverId]: [...(prevConversationMessages[message.receiverId] || []), message]
            }));
        });

        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [contractId]);

    const handleSendMessage = () => {
        if (!contractId) {
            toast.error('No User Found. Please select a user to chat.', toastConfig);
            return;
        }
        if (!inputText) return;
        const newMessageData = { message: inputText, senderId: loggedInUserId, receiverId: receiverUser, roomId: contractId, timestamp: new Date().toISOString() };

        // this new code added
        setConversationMessages(prevConversationMessages => ({
            ...prevConversationMessages,
            [receiverUser]: [...(prevConversationMessages[receiverUser] || []), newMessageData]
        }));
        socket.emit("chatMessage", newMessageData);
        setInputText("");
    };

    const handleKeyDown = (event) => { if (event.key === "Enter") handleSendMessage(); };

    useEffect(() => {
        const scrollToBottom = () => messagesContainerRef.current?.scrollTo(0, messagesContainerRef.current.scrollHeight);
        setTimeout(scrollToBottom, 100);
    }, [conversationMessages]); //conversationMessages needs to be changed to messages

    return (
        <div className="flex-1 bg-green-50 p-4 flex flex-col height-full">
            <div className="flex-grow overflow-auto relative" ref={messagesContainerRef}>
                <div className="flex flex-col justify-end h-full">
                    {[
                        ...(conversationMessages[receiverUser] || []),
                        ...(conversationMessages[loggedInUserId] || []),
                    ]?.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))?.map((msg, index) => (
                        <div key={index} className={`flex ${msg.senderId === loggedInUserId ? "justify-end" : "justify-start"} m-4`}>
                            <div className={`${msg.senderId === loggedInUserId ? "bg-green-600 ml-auto" : "bg-gray-500"} text-white font-semibold p-3 rounded-lg max-w-[70%] my-1`}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center broder border-purple-500">
                <input onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} type="text" value={inputText} placeholder="Type a message..." className="flex-1 border rounded-lg p-2 mr-2 focus:border-green-500 outline-none" />
                <button className="bg-green-600 hover:bg-green-500 text-white text-base font-semibold rounded-md p-2" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatArea;

