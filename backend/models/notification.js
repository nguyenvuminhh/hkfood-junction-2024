const mongoose = require('mongoose')



const notification = new mongoose.Schema({
    batchId: {
        type: String,
    },
    prodId: {
        type: String,
    },
    batchDate: {
        type: Date,
    },
    phase: {
        type: Number,
    },
    statistic: {
        type: Number,
    }
}, {
    timestamps: { createdAt: 'createdAt' }
})

const Notification = mongoose.model('Notification', notification)

module.exports = Notification
