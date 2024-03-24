import { useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import http from '../../config/http';
import { useSelector } from 'react-redux';
import ChatArea from './ChatArea';


const ChatComponent = ({user_type}) => {

  console.log('user_type is', user_type);

  const location = useLocation();
  const jobProviderData = location.state?.jobProviderDetails
  const jobApplierData = location.state?.userData
  const privateRoomId = location.state?.conversation_id
  const senderData = useSelector((state) => state.User);
  const messageSenderId = senderData?.userData?._id;
  const userType = senderData?.userData?.user_type;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(jobApplierData?._id);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const [retrievedChatData, setRetrievedChatData] = useState(null);
  const currentLoggedInUser = messageSenderId
  const [contracts, setContracts] = useState(null);
  const [activeContract, setactiveContract] = useState(null)

  const hirerId = jobProviderData?._id;

console.log('contracts is', contracts);


  const loggedInUserId = senderData.userData._id

  const jobApplierArray = []
  const jobProviderArray = []

  jobProviderArray.push(jobProviderData)
  jobApplierArray.push(jobApplierData)

  const conversationsData = retrievedChatData?.map((chat) => {
    console.log('chat is', chat);
  })

  useEffect(() => {
    const fetchContract = async () => {


      try {
        const url = user_type === 'hirer' ? `/contract/hirer/${loggedInUserId}` : `/contract/freelancer/${loggedInUserId}`
        const response = await http.get(url);
        const contract = response.data;
        console.log('contract Value is', contract);
        setContracts(contract);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContract();
  }, []);



  // Fetch chat data and user data
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        console.log('we are inside try');
        const [chatResponse] = await Promise.all([
          http.get(`/chats/fetchChats/${currentLoggedInUser}`),
        ])

        const chatData = chatResponse?.data;
        console.log('chatData is', chatData);
        setRetrievedChatData(chatData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChatData();
  }, [currentLoggedInUser, jobApplierData?._id]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        messageSenderData: jobProviderData,
        messageReceiverData: jobApplierData,
        text: newMessage,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');

      // Emit the new message to the private room
      socket.emit('chatMessage', newMessageObj);
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

  const activeUserSelected = (selectedUserId) => {
    setactiveContract(selectedUserId)
    setSelectedUser(selectedUserId)
  }

  return (
    <div className="flex h-[600px] p-7 rounded-xl">
      {/* Left Sidebar */}
      <div className="bg-green-100 w-52 py-4 px-2">
        <h2 className='my-2 flex justify-center text-xl font-semibold'>My Chats</h2>
        {contracts?.map((contract) => (
          
          <div
            key={contract?._id}
            className={`flex items-center mb-4 rounded-md p-2 cursor-pointer ${contract?._id === selectedUser
              ? 'bg-green-600 text-white'
              : 'hover:bg-green-600 hover:text-white'
              }`}
            onClick={() => activeUserSelected(contract?._id)}
          >
            <div
              className={`text-xl mr-2 ${contract?._id === selectedUser
                ? 'bg-green-600 text-white'
                : 'hover:bg-green-600 hover:text-white'
                }`}
            >
              {contract?.[user_type==="hirer" ? "employee":"hirer"]?.fname[0]?.toUpperCase()}
            </div>
            <span className="font-bold">
              {contract?.[user_type==="hirer" ? "employee":"hirer"]?.fname.charAt(0).toUpperCase() +
                contract?.[user_type==="hirer" ? "employee":"hirer"]?.fname.slice(1)}{' '}
              {contract?.[user_type==="hirer" ? "employee":"hirer"]?.lname.charAt(0).toUpperCase() +
                contract?.[user_type==="hirer" ? "employee":"hirer"]?.lname.slice(1)}
            </span>
          </div>
        ))}
      </div> 
      
      {/* Chat Area */}
      <ChatArea contractId={activeContract} />
      
    </div>
  );
};

export default ChatComponent;