const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
    const { title, description, location, price } = req.body;
    
    const newProperty = new Property({
        title,
        description,
        location,
        price,
        images: req.files.map(file => file.path), 
    });
    
    try {
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error adding property' });
    }
};

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties' });
    }
};