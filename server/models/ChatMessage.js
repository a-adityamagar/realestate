const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);