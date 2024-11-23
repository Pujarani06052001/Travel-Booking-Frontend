import React, { useEffect, useState } from 'react';
import { fetchPackages } from './api';
import './PackageList.css'

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const data = await fetchPackages();
      setPackages(data);
    };
    getPackages();
  }, []);

  return (
    <div className="package-list">
      <h2>Explore Our Packages</h2>
      <div className="package-container">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg._id}>
            <h3 className="package-title">{pkg.packageTitle}</h3>
            <p>{pkg.description}</p>
            <p>Destination: <strong>{pkg.destinationName}</strong></p>
            <p className="price">Price: ${pkg.price}</p>
            <p className="max-travelers">Max Travelers: {pkg.maxTravelers}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
