import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function AdminDashboard() {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        users: [],
        properties: [],
        activities: [],
        stats: {
            totalUsers: 0,
            totalProperties: 0,
            totalInquiries: 0,
            recentActivities: 0
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAdminAuth();
        fetchAdminData();
    }, []);

    const checkAdminAuth = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/auth/check-admin', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.data.isAdmin) {
                navigate('/login');
            }
        } catch (error) {
            navigate('/login');
        }
    };

    const fetchAdminData = async () => {
        const token = localStorage.getItem('token');
        try {
            const [users, properties, activities] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/admin/properties', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/admin/activities', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setAdminData({
                users: users.data,
                properties: properties.data,
                activities: activities.data,
                stats: {
                    totalUsers: users.data.length,
                    totalProperties: properties.data.length,
                    totalInquiries: activities.data.filter(a => a.type === 'inquiry').length,
                    recentActivities: activities.data.filter(a => {
                        const activityDate = new Date(a.createdAt);
                        const today = new Date();
                        return (today - activityDate) / (1000 * 60 * 60 * 24) <= 7;
                    }).length
                }
            });
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserAction = async (userId, action) => {
        try {
            await axios.post(`http://localhost:5000/api/admin/users/${userId}/${action}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchAdminData();
        } catch (error) {
            console.error(`Error performing user action: ${action}`, error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button 
                        onClick={() => navigate('/admin/reports')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Generate Reports
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Stats cards here */}
                </div>

                {/* User Management */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">User Management</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {adminData.users.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4">{user.username}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleUserAction(user._id, user.status === 'active' ? 'suspend' : 'activate')}
                                                className={`px-3 py-1 rounded text-white ${
                                                    user.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                                }`}
                                            >
                                                {user.status === 'active' ? 'Suspend' : 'Activate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">Recent Activities</h2>
                    </div>
                    <div className="p-6">
                        {adminData.activities.slice(0, 10).map((activity, index) => (
                            <div key={index} className="flex items-center py-3 border-b last:border-0">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        {activity.description}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(activity.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
