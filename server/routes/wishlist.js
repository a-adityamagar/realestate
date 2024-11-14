const express = require('express');
const Wishlist = require('../models/Wishlist');
const Property = require('../models/Property');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add property to wishlist
router.post('/', authMiddleware, async (req, res) => {
    const { propertyId } = req.body;

    try {
        const wishlistItem = new Wishlist({ userId: req.user.id, propertyId });
        await wishlistItem.save();
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(400).json({ message: 'Error adding to wishlist' });
    }
});

// Get user's wishlist
router.get('/', authMiddleware, async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find({ userId: req.user.id }).populate('propertyId');
        res.json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist' });
    }
});

module.exports = router;