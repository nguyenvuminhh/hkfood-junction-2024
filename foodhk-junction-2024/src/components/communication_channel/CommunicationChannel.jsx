import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopNavigation from '../main pages/TopNavigation';
import messageService from '../../services/messageService';
import Message from './Message';
import useDarkMode from '../../hooks/useDarkMode';
import io from 'socket.io-client';

const CommunicationChannel = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [source, setSource] = useState('1'); // Default to the first value
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    useEffect(() => {
        // Load messages initially
        const loadMessages = async () => {
            try {
                const fetchedMessages = await messageService.getMessages();
                console.log("Fetched Messages:", fetchedMessages); // Check fetched data
                if (fetchedMessages && fetchedMessages.length > 0) {
                    setMessages(fetchedMessages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        loadMessages();
    }, []);

    useEffect(() => {
        const socket = io("http://localhost:3000"); // Connect to the server

        // Listen for real-time data from the server
        socket.on('message', (data) => {
            console.log('Received real-time data:', data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the listener and disconnect socket on unmount
        return () => {
            socket.off('notification');
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim() && source.trim()) {
            const message = await messageService.postMessage( source, newMessage );
            setNewMessage('');
            setSource('1'); // Reset to default value
        }
    };

    return (
        <div className="mt-20 flex flex-col h-screen w-dvw">
            <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
            {/* Chat Section */}
            <div className="flex flex-col w-full h-full bg-gray-900 text-white relative">                
                <div className="flex-1 p-4 overflow-y-auto pb-24">
                    {messages && messages.length > 0 ? (
                        messages.map((msg) => (
                            <Message key={msg._id} {...msg} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No messages available</p>
                    )}
                </div>

                {/* Fixed message input form */}
                <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800 flex space-x-2">
                    <select
                        className="w-1/4 p-2 rounded bg-gray-700 text-white focus:outline-none"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    >
                        <option value="1">Preproduction</option>
                        <option value="2">Cooking</option>
                        <option value="3">Storage</option>
                        <option value="4">Packaging</option>
                    </select>
                    <textarea
                        className="w-3/4 p-2 rounded bg-gray-700 text-white focus:outline-none resize-none overflow-hidden"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        rows={1}
                        style={{ height: 'auto' }}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunicationChannel;
