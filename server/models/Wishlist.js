const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);