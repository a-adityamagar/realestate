import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchAllProperties();
        checkLoginStatus();
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

    const checkLoginStatus = () => {
       
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsLoggedIn(false); 
        navigate('/'); 
    };

    const handleViewDetails = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <nav className="bg-white shadow-sm fixed w-full z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-900">RealEstatePro</Link>
                    <div className="space-x-6 text-lg flex items-center">
                        <Link to="/" className="text-gray-700 hover:text-black">Home</Link>
                        <Link to="/properties" className="text-gray-700 hover:text-black">Properties</Link>
                        <Link to="/agents" className="text-gray-700 hover:text-black">Agents</Link>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-24 px-4 md:px-8 lg:px-16">
                <section className="max-w-7xl mx-auto mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">Find Your Dream Property</h1>
                            <p className="text-lg text-gray-600 mb-6">Browse our exclusive listings to find the perfect home for you and your family.</p>
                            <div className="flex space-x-4">
                                <button className="bg-blue-500 text-white px-5 py-3 rounded-full font-medium hover:bg-blue-600">Explore </button>
                                <button className="bg-gray-200 text-gray-800 px-5 py-3 rounded-full font-medium hover:bg-gray-300">Learn More</button>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg relative">
                            <img src="https://i.pinimg.com/736x/63/2c/97/632c97d76a1ce48f1607f11f813c5d0c.jpg" alt="Featured property" className="w-full h-full object-cover" />
                            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg">
                                <h3 className="font-semibold text-xl">Luxury Villa</h3>
                                <p>Stunning views and prime location</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Properties Section */}
                <section className="max-w-7xl mx-auto mb-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900">Exclusive Property Listings</h2>
                        <p className="text-lg text-gray-600">Discover a range of homes, apartments, and villas tailored to your needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            <div className="text-center col-span-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading properties...</p>
                            </div>
                        ) : (
                            properties.map((property) => (
                                <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={property.images ? `http://localhost:5000/${property.images[0]}` : property.imageUrl}
                                        alt={property.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                                        <p className="text-gray-600 mb-2">${property.price?.toLocaleString()}</p>
                                        <button
                                            onClick={() => handleViewDetails(property._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white shadow-t mt-auto py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                        <div>
                            <h3 className="font-bold text-xl text-gray-900 mb-2">About Us</h3>
                            <p className="text-gray-600">We are dedicated to connecting you with the best real estate deals. Our team of experts is here to assist you every step of the way.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-900 mb-2">Contact Us</h3>
                            <ul className="text-gray-600">
                                <li>Email: info@realestatepro.com</li>
                                <li>Phone: (123) 456-7890</li>
                                <li>Address: 123 Real Estate Blvd, City, Country</li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-6" />
                    <p className="text-center text-gray-600">&copy; {new Date().getFullYear()} RealEstatePro. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
