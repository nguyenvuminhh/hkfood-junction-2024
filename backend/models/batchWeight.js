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
    weightBeforeCooking: {
        type: Number,
    },
    storageStart: {
        type: Date,
    },
    storageEnd: {
        type: Date,
    },
    weightAfterCooking: {
        type: Number,
    },
    weightAfterStorage: {
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
