import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserActivityChart from './UserActivityChart';

function AdminDashboard() {
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchProperties();
        fetchUsers();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties!', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users!', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <UserActivityChart users={users} />
            <div className="properties-section">
                <h3>Properties</h3>
                <ul className="properties-list">
                    {properties.map(property => (
                        <li key={property._id} className="property-item">
                            <h4>{property.title}</h4>
                            <p>{property.description}</p>
                            <p>Location: {property.location}</p>
                            <p>Price: ${property.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;
