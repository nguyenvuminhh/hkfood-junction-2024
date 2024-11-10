import axios from 'axios';

const baseUrl = 'http://localhost:3000/api';

const getMessages = async () => {
    const response = await axios.get(`${baseUrl}/message`);

    return response.data;
}

const postMessage = async (message) => {
    const response = await axios.post(`${baseUrl}/message`, {
        message,
    });

    return response.data;
}

const deleteMessage = async (messageId) => {
    const response = await axios.delete(`${baseUrl}/message/${messageId}`);

    return response.data;
}

const updateMessage = async (messageId, message) => {
    const response = await axios.put(`${baseUrl}/message/${messageId}`, {
        message,
    });

    return response.data;
}

export default { getMessages, postMessage, deleteMessage, updateMessage };