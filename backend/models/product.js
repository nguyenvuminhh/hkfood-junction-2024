const mongoose = require('mongoose')

const product = new mongoose.Schema({
    prodId: {
        type: String,
    },
    prodName: {
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
    },
    deviations: {
        type: [Number],
        default: Array(10).fill(0),
    },
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ]
}, {
    timestamps: { createdAt: 'createdAt' }
})

const Product = mongoose.model('product', product)

module.exports = Product
