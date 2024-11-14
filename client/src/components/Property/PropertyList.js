import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
      fetchProperties();
  }, []);

  const fetchProperties=async()=>{ 
     try{ 
         const response=await axios.get("http://localhost:5000/api/properties"); 
         setProperties(response.data); 
     }catch(error){ 
         console.error("Error fetching properties!", error); 
     }
 }

 return (
     <div>
         <h2>Properties</h2>
         <ul>
             {properties.map(property => (
                 <li key={property._id}>
                     <h3>{property.title}</h3>
                     <p>{property.description}</p>
                     <p>{property.location}</p>
                     <p>${property.price}</p>
                     {property.images.map((image,index)=>(<img key={index} src={`http://localhost:5000/${image}`} alt={`${property.title}-${index}`} style={{width:"100px"}}/>))}
                 </li>
             ))}
         </ul>
     </div>
 );
}

export default PropertyList;