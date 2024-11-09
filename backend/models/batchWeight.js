const mongoose = require('mongoose')

const batchWeight = new mongoose.Schema({
    batchId: {
        type: String,
    },
    prodId: {
        type: String,
    },
    batchDate: {
        type: Date,
    },
    weightsBeforeCooking: {
        type: Number,
    },
    storageStart: {
        type: Date,
    },
    storageEnd: {
        type: Date,
    },
    weightsAfterCooking: {
        type: Number,
    },
    weightsAfterStorage: {
        type: Number,
    },
    stage: {
        type: Number
    }
}, {
    timestamps: { createdAt: 'createdAt' }
})

const BatchWeight = mongoose.model('BatchWeight', batchWeight)

module.exports = BatchWeight
