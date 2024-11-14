import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import PropertyList from './components/Property/PropertyList';
import AddProperty from './components/Property/AddProperty';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
