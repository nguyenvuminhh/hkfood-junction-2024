import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMessages, postMessage, deleteMessage, updateMessage } from '../../services/messageService';
import Message from './Message';

const CommunicationChannel = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Load messages initially
        const loadMessages = async () => {
            const fetchedMessages = await getMessages();
            setMessages(fetchedMessages);
        };
        loadMessages();
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const message = await postMessage({ source: 'User', message: newMessage });
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar for Channels */}
            <div className="w-1/5 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Channels</h2>
                <ul>
                    <li className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">General</li>
                    <li className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">Random</li>
                    <li className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">Help</li>
                </ul>
            </div>

            {/* Chat Section */}
            <div className="flex flex-col w-3/5 bg-gray-900 text-white">
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <Message key={msg._id} {...msg} />
                    ))}
                </div>
                <div className="p-4 bg-gray-800">
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                </div>
            </div>

            {/* User List Section */}
            <div className="w-1/5 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Users</h2>
                <ul>
                    <li className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">User 1</li>
                    <li className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">User 2</li>
                    <li className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">User 3</li>
                </ul>
            </div>
        </div>
    );
};

export default CommunicationChannel;
