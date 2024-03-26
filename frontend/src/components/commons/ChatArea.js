import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import http from '../../config/http';
import { toastConfig } from '../../config/toastConfig';
import { toast } from 'react-toastify';


const ChatArea = ({ contractId }) => {

    const [inputText, setInputText] = useState("");
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [receiverUser, setReceiverUser] = useState('')
    const userData = useSelector((state) => state.User);
    const loggedInUserId = userData?.userData?._id;
    const messagesContainerRef = useRef(null);

    console.log('messages is', messages);

    useEffect(() => {
        if (contractId) {
            const getContract = async () => {
                try {
                    const response = await http.get(`/contract/getContractById/${contractId}`);
                    const contract = response.data;
                    console.log('contract is', contract);
                    // Determine the receiver user based on user type
                    let receiverId = '';
                    if (userData.userData.user_type === 'hire') {
                        console.log('we are inside hirer code')
                        receiverId = contract[0].employee?._id; // Assuming 'employee' is the receiver for hirer
                    } else if (userData.userData.user_type === 'freelancer') {
                        console.log('we are inside freelancer code')
                        receiverId = contract[0].hirer?._id; // Assuming 'hirer' is the receiver for freelancer
                    }

                    setReceiverUser(receiverId);
                } catch (error) {
                    console.error('Error fetching contract:', error);
                }
            };

            getContract();
        }
    }, [contractId]);


    useEffect(() => {
        const newSocket = io("http://localhost:5000"); // Create new socket

        // Set the socket connection
        newSocket.on("connect", () => {
            console.log("Connected to socket server and the newSocket.id is", newSocket.id);
        });

        newSocket.emit("joinRoom", contractId);
        console.log("i joined a room with contractId", contractId);

        newSocket.on("message-received", (message) => {
            console.log('message is', message)
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, [contractId]);

    const handleSendMessage = () => {
        if (!contractId) {
            toast.error('No User Found. Please select a user to chat.', toastConfig);
            return;
        }

        if (inputText) {

            const newMessageData = {
                message: inputText,
                senderId: loggedInUserId,
                receiverId: receiverUser,
                roomId: contractId,

            }
            setMessages([...messages, newMessageData]);
            socket.emit("chatMessage", newMessageData);
            setInputText("");
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    useEffect(() => {
        // Scroll to the bottom of the message area when a new message is sent or received
        const scrollToBottom = () => {
            messagesContainerRef.current?.scrollTo(0, messagesContainerRef.current.scrollHeight);
        };

        // Call the scrollToBottom function after a short delay to ensure the DOM updates
        setTimeout(scrollToBottom, 100);
    }, [messages]);

    return (
        <>
            {/* hello the contract id id {contractId} */}
            <div className="flex-1 bg-green-50 p-4 flex flex-col height-[full]">

                {/* Messages Area Start */}
                {/* Map through messages array and display messages */}
                <div className="flex-grow overflow-auto relative ref={messagesContainerRef}">
                    {/* Render messages */}
                    <div className="flex flex-col justify-end h-full">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.senderId === loggedInUserId ? "justify-end" : "justify-start"} m-4`}>
                                <div className={`${msg.senderId === loggedInUserId ? "bg-green-600 ml-auto" : "bg-gray-500"} text-white p-2 rounded-lg max-w-[70%] my-1`}>
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Messages Area End */}

                {/* Input Area Start */}
                <div className="flex items-center broder border-purple-500">
                    <input
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        type="text"
                        value={inputText}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-lg p-2 mr-2"
                    />
                    <button
                        className="bg-green-600 hover:bg-green-500 text-white text-base font-semibold rounded-md p-2"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
                {/* Input Area End */}
            </div>



        </>
    );
}


export default ChatArea