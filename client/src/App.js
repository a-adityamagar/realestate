import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import PropertyList from './components/Property/PropertyList';
import AddProperty from './components/Property/AddProperty';
import Chatbot from './components/Chatbot/Chatbot';
import PropertyDetail from './components/Property/PropertyDetail';
import Dashboard from './components/Dashboard/Dashboard';
import AdminLogin from './components/Auth/AdminLogin';
import UserActivityChart from './components/Dashboard/UserActivityChart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/useractivitychart" element={<UserActivityChart/>} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
