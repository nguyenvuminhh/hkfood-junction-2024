import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/productWeight';

const newProduct = {} // TODO:

const weightFinalProduct = async (batchId, weight) => {
    const res = await axios.post(baseUrl + '/' + batchId, { weight })
    return res.data
}

export default { newProduct, weightFinalProduct }