import React, { useState } from 'react';
import axios from 'axios';

function AddProperty() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange =(e)=>{ 
     setImages(e.target.files); 
 }

  const handleAddPropertySubmit=async(e)=>{
     e.preventDefault(); 
     let formData=new FormData(); 
     formData.append("title",title); 
     formData.append("description",description); 
     formData.append("location",location); 
     formData.append("price",price); 

     for(let i=0;i<images.length;i++){ 
         formData.append("images",images[i]); 
     }

     try{ 
         await axios.post("http://localhost:5000/api/properties",formData,{ headers:{ "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("token")}` }}); 
         alert("Property added successfully!"); 
     }catch(error){ 
         alert("Failed to add property!"); 
     }
 }

 return (
     <form onSubmit={handleAddPropertySubmit}>
         <h2>Add Property</h2>
         <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
         <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
         <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
         <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
         <input type="file" multiple accept="image/*" onChange={handleImageChange} />
         <button type="submit">Add Property</button>
     </form>
 );
}

export default AddProperty;