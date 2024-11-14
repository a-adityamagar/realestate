import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllProperties();
    }, []);

    const fetchAllProperties = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/properties");
            const realProperties = response.data;

            

            const allProperties = [...realProperties];
            setProperties(allProperties);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching properties:", error);
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
                <section className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Dream Home</h1>
                        <p className="text-xl text-gray-600">Discover the perfect property that matches your lifestyle</p>
                    </div>

                    <section className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Featured Properties</h2>
                            <div className="space-x-4">
                                <Link to="/properties" className="text-blue-500 hover:text-blue-600">View All</Link>
                                <Link to="/add-property" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Property</Link>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading properties...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.map((property) => (
                                    <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                                        <div className="relative">
                                            <img
                                                src={property.images ? `http://localhost:5000/${property.images[0]}` : property.imageUrl}
                                                alt={property.title}
                                                className="w-full h-64 object-cover"
                                            />
                                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
                                                ${property.price?.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <span className="mr-4">{property.bedrooms} beds</span>
                                                <span className="mr-4">{property.bathrooms} baths</span>
                                                <span>{property.squareFeet} sqft</span>
                                            </div>
                                            <p className="text-gray-500 mb-4">{property.location}</p>
                                            <button
                                                onClick={() => handleViewDetails(property._id)}
                                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Market Updates</h2>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-700">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    New housing developments in the downtown area
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Interest rates for mortgages are at an all-time low
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                    Tips for first-time home buyers
                                </li>
                            </ul>
                        </div>
                    </section>
                </section>
            </main>

            <Link to="/chat" className="fixed bottom-5 right-5">
                <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600">
                    💬
                </button>
            </Link>

            <footer className="bg-white shadow-md mt-auto py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h3 className="font-bold text-lg mb-2">About Us</h3>
                            <p>We are dedicated to helping you find your dream home. Our team of experts is here to guide you through every step of the process.</p>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <h3 className="font-bold text-lg mb-2">Contact Us</h3>
                            <ul>
                                <li>Email: info@realestate.com</li>
                                <li>Phone: (123) 456-7890</li>
                                <li>Address: 123 Real Estate St, City, Country</li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-6"/>
                    <p className="text-center text-gray-600">&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
