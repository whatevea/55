import React, { useEffect, useState } from 'react';
import http from '../../config/http';
import RealTimeChat from './RealTimeChat';

const ConversationsAndMessagingTab = ({ messageReceiverId }) => {
    const [activeTab, setActiveTab] = useState('Conversations');
    const [userData, setUserData] = useState([]);

    console.log('userData is', userData);

    console.log('messageReceiverId is', messageReceiverId);

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
        fetchUserData(messageReceiverId)
    },[messageReceiverId])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <div className="flex justify-center mb-4">
                <button
                    className={`mr-4 text-lg ${activeTab === 'Conversations' ? 'text-green-700 underline' : 'text-gray-500'
                        }`}
                    onClick={() => handleTabClick('Conversations')}
                >
                    Conversations
                </button>
                <button
                    className={`text-lg ${activeTab === 'Messages' ? 'text-green-700 underline' : 'text-gray-500'}`}
                    onClick={() => handleTabClick('Messages')}
                >
                    Messages
                </button>
            </div>
            <div className="h-64 border border-gray-300 rounded-lg p-4 overflow-y-auto">
                {/* Content for the active tab */}
                {activeTab === 'Conversations' && <p>This is the Conversations tab content.</p>}
                {activeTab === 'Messages' && <RealTimeChat />}
            </div>
        </div>
    );
};

export default ConversationsAndMessagingTab;