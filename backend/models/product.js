const mongoose = require('mongoose')

const product = new mongoose.Schema({
    prodId: {
        type: String,
    },
    targetWeight: {
        type: Number,
    },
    lowerCookingLossBound: {
        type: Number
    },
    upperCookingLossBound: {
        type: Number
    }
}, {
    timestamps: { createdAt: 'createdAt' }
})

const Product = mongoose.model('product', product)

module.exports = Product
