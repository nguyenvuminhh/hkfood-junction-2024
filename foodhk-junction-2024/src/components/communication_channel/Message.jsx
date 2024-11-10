import React from 'react';
import PropTypes from 'prop-types';

const map = ["Preproduction", "Cooking", "Storage", "Packaging"]
const Message = ({ source, message, messageId, createdAt }) => {
    return (
        <div className="p-2 mb-2 bg-gray-800 rounded text-sm">
            <p ><span className='text-gray-300'>{new Date(createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
}) + " "}</span><span className='font-bold'>{map[source-1]+" "}</span><span className='text-yellow-600'>{message}</span></p>
        </div>
    );
};

Message.propTypes = {
    source: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
};

export default Message;
