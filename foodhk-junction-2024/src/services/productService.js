import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/productWeight';

const newProduct = async(formData) => {
    const res = await axios.post(`${baseUrl}/new`, formData)
    return res.data
}

const weightFinalProduct = async (prodId, weight) => {
    const res = await axios.post(`${baseUrl}/${prodId}`, { weight })
    return res.data
}

export default { newProduct, weightFinalProduct }