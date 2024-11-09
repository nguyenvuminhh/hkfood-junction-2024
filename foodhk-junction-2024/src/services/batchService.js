import axios from 'axios';

const baseUrl = 'http://localhost:3000/api';

const postPreprocess = async (prodId, batchId, batchDate, weightsBeforeCooking) => {
    const response = await axios.post(`${baseUrl}/batchWeight/preprocess`, {
        prodId,
        batchId,
        batchDate: new Date(batchDate),
        weightsBeforeCooking,
    });
    
    return response.data;
}

const postCooking = async (batchId, batchDate, weightsAfterCooking, storageStart) => {
  const response = await axios.post(`${baseUrl}/batchWeight/cooking`, {
    batchId,
    batchDate: new Date(batchDate),
    weightsAfterCooking,
    storageStart: new Date(storageStart)
  });

  return response.data;
};
const postStorage = async (batchId, batchDate, weightsAfterStorage, storageEnd) => {
  const response = await axios.post(`${baseUrl}/batchWeight/storage`, {
    batchId,
    batchDate: new Date(batchDate),
    weightsAfterStorage,
    storageStart: new Date(storageStart),
  });

  return response.data;
};

export default { postPreprocess, postCooking, postStorage };