import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/properties");
            setProperties(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching properties!", error);
            setLoading(false);
        }
    };

    const handleViewDetails = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white shadow-md fixed w-full z-10">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-gray-800">Real Estate</Link>
                    <div className="space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                        <Link to="/properties" className="text-gray-600 hover:text-blue-500">Properties</Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-500">About Us</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
                        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
                    </div>
                </div>
            </nav>

            <main className="pt-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Available Properties</h1>
                        <Link to="/add-property" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Add New Property
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">Loading properties...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                                    <div className="relative">
                                        {property.images && property.images.length > 0 ? (
                                            <img
                                                src={`http://localhost:5000/${property.images[0]}`}
                                                alt={property.title}
                                                className="w-full h-64 object-cover"
                                            />
                                        ) : (
                                            <img
                                                src="https://via.placeholder.com/400x300"
                                                alt="Property placeholder"
                                                className="w-full h-64 object-cover"
                                            />
                                        )}
                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
                                            ${property.price?.toLocaleString()}
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                                        <p className="text-gray-600 mb-4">{property.description}</p>
                                        <div className="flex items-center text-gray-500 mb-4">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {property.location}
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <div className="flex space-x-4 text-gray-600">
                                                <span>{property.bedrooms} beds</span>
                                                <span>{property.bathrooms} baths</span>
                                                <span>{property.squareFeet} sqft</span>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleViewDetails(property._id)}
                                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Link to="/chat" className="fixed bottom-5 right-5">
                <button className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600">
                    💬
                </button>
            </Link>
        </div>
    );
}

export default PropertyList;
