const Message = require('../model/message');
const router = require('express').Router();
const { io } = require('../socket/socket');

router.post('/message', async (req, res) => {
    try {
        const { source, message } = req.body;
        const newMessage = new Message({ source, message });
        await newMessage.save();
        io.emit('message', newMessage);
        res.status(201).json({ message: 'Message created successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create message', details: error.message });
    }
});

router.get('/message', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json({ data: messages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages', details: error.message });
    }
});

router.get('/message/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ data: message });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve message', details: error.message });
    }
});

router.put('/message/:id', async (req, res) => {
    try {
        const { source, message } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { source, message },
            { new: true, runValidators: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        io.emit('messageUpdated', updatedMessage);

        res.status(200).json({ message: 'Message updated successfully', data: updatedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message', details: error.message });
    }
});

router.delete('/message/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        io.emit('messageDeleted', req.params.id);

        res.status(200).json({ message: 'Message deleted successfully', data: deletedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message', details: error.message });
    }
});

module.exports = router;
