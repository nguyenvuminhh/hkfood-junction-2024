import axios from 'axios';

const baseUrl = 'https://hkfood-junction-2024.fly.dev/api/productWeight';

const newProduct = async(formData) => {
    const res = await axios.post(`${baseUrl}/new`, formData)
    return res.data
}

const weightFinalProduct = async (prodId, weight) => {
    const res = await axios.post(`${baseUrl}/${prodId}`, { weight })
    return res.data
}

const getLatestProductData = async() => {
    const res = await axios.get(`${baseUrl}/latest`)
    return res.data
}

const getAllProducts = async() => {
    const res = await axios.get(`${baseUrl}/all`)
    return res.data
}
 
export default { newProduct, weightFinalProduct, getLatestProductData, getAllProducts }