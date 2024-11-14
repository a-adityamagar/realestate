import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            // Assuming you have an endpoint to get the user's wishlist
            const response = await axios.get('http://localhost:5000/api/wishlist', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setWishlist(response.data);
        } catch (error) {
            console.error('Error fetching wishlist!', error);
        }
    };

    return (
        <div>
            <h2>Your Wishlist</h2>
            <ul>
                {wishlist.map(property => (
                    <li key={property._id}>
                        <h4>{property.title}</h4>
                        <p>{property.description}</p>
                        <p>{property.location}</p>
                        <p>${property.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Wishlist;