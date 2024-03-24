import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';


const ChatArea = ({ contractId }) => {

    const [inputText, setInputText] = useState("")
    const [socket, setSocket] = useState(null)
    const userData = useSelector((state) => state.User);
    const user_id=userData?.userData?._id



    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Create new socket

        // Set the socket connection
        newSocket.on('connect', () => {
            console.log('Connected to socket server and the newSocket.id is', newSocket.id);
        })

        newSocket.emit('joinRoom', contractId);
        console.log("i joined a room with id",contractId);

        setSocket(newSocket);
        


        return () => newSocket.disconnect();


    }, [contractId]);

    const handleSendMessage = () => {
        if(inputText) {
            socket.emit('chatMessage', {
                message: inputText,
            });
            setInputText('');
        }
    }



    return (
        <>
            {/* hello the contract id id {contractId} */}
            <div className="flex-1 bg-green-50 p-4 flex flex-col">
                {/* Messages Area Start */}
                {/* Map through messages array and display messages */}
                
                {/* Messages Area End */}
                {/* Input Area Start */}
                <div className="flex items-center">
                    <input
                        onChange={(e) => setInputText(e.target.value)}
                        type="text"
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
    )
}

export default ChatArea