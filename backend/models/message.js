const mongoose = require('mongoose')

const message = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    source: {
        type: Number,
    },
    message: {
        type: String,
    },
}, {
    timestamps: { createdAt: 'createdAt' }
})

const Message = mongoose.model('message', message)

module.exports = Message