import axios from 'axios';

const baseUrl = 'https://hkfood-junction-2024.fly.dev/api';

const postPreprocess = async (prodId, batchId, batchDate, weightBeforeCooking) => {
    const response = await axios.post(`${baseUrl}/batchWeight/preprocess`, {
        prodId,
        batchId,
        batchDate: new Date(batchDate),
        weightBeforeCooking,
    });
    
    return response.data;
}

const postCooking = async (batchId, batchDate, weightAfterCooking, storageStart) => {
  const response = await axios.post(`${baseUrl}/batchWeight/cooking`, {
    batchId,
    batchDate: new Date(batchDate),
    weightAfterCooking,
    storageStart: new Date(storageStart)
  });

  return response.data;
};
const postStorage = async (batchId, batchDate, weightAfterStorage, storageEnd) => {
  const response = await axios.post(`${baseUrl}/batchWeight/storage`, {
    batchId,
    batchDate: new Date(batchDate),
    weightAfterStorage,
    storageEnd: new Date(storageEnd)
  });

  return response.data;
};

export default { postPreprocess, postCooking, postStorage };