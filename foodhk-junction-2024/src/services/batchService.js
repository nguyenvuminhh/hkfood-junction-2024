import axios from 'axios';

const baseUrl = 'http://localhost:3000/api';

const postPreprocess = async (prodId, batchId, batchDate, weightsBeforeCooking) => {
    const response = await axios.post(`${baseUrl}/batchWeight/preprocess`, {
        prodId,
        batchId,
        batchDate,
        weightsBeforeCooking,
    });
    
    return response.data;
}

export default { postPreprocess };

