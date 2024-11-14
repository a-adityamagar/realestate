import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const PropertyDetail = () => {
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.log('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="property-detail-container">
      <h1>{property.title}</h1>
      <div className="property-images">
        <img src={property.mainImage} alt={property.title} />
      </div>
      <div className="property-info">
        <h2>${property.price.toLocaleString()}</h2>
        <div className="property-specs">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.squareFeet} sq ft</span>
        </div>
        <p className="property-address">{property.address}</p>
        <div className="property-description">
          <h3>Description</h3>
          <p>{property.description}</p>
        </div>
        <div className="property-features">
          <h3>Features</h3>
          <ul>
            {property.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
