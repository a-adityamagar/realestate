const ChatMessage = require('../models/ChatMessage');

exports.sendMessage = async (req, res) => {
    const { userId, message } = req.body;

    const chatMessage = new ChatMessage({ userId, message });

    try {
        await chatMessage.save();
        res.status(201).json(chatMessage);
    } catch (error) {
        res.status(400).json({ message: 'Error sending message' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
};
