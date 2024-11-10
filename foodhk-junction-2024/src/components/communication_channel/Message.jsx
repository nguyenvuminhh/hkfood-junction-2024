import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ source, message, messageId }) => {
    return (
        <div className="p-2 mb-2 bg-gray-800 rounded text-sm">
            <p className="text-blue-400 font-semibold">{source}</p>
            <p>{message}</p>
        </div>
    );
};

Message.propTypes = {
    source: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
};

export default Message;
