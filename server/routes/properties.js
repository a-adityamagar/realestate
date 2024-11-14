const express = require('express');
const multer = require('multer');
const { addProperty, getProperties } = require('../controllers/propertyController');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName);
    },
});

// Initialize multer upload
const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Define routes with middleware
router.post('/', upload.array('images'), addProperty);
router.get('/', getProperties);

module.exports = router;
