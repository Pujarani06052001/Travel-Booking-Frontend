import React, { useState, useEffect } from 'react';
import { fetchPackages, addPackage, updatePackage, deletePackage } from './api';
import './AddPackage.css';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    destinationName: '',
    packageTitle: '',
    description: '',
    price: '',
    availableDates: '',
    maxTravelers: '',
  });

  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        // Update package logic
        const updatedPackage = await updatePackage(editingPackage._id, formData);
        setPackages((prev) =>
          prev.map((pkg) => (pkg._id === editingPackage._id ? updatedPackage : pkg))
        );
        alert('Package updated successfully!');
      } else {
        // Add new package logic
        const newPackage = await addPackage(formData);
        setPackages((prev) => [...prev, newPackage]);
        alert('Package added successfully!');
      }

      // Reset form
      setFormData({
        destinationName: '',
        packageTitle: '',
        description: '',
        price: '',
        availableDates: '',
        maxTravelers: '',
      });
      setEditingPackage(null);
    } catch (error) {
      alert('Failed to submit package: ' + error.message);
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      destinationName: pkg.destinationName,
      packageTitle: pkg.packageTitle,
      description: pkg.description,
      price: pkg.price,
      availableDates: pkg.availableDates,
      maxTravelers: pkg.maxTravelers,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      alert('Package deleted successfully!');
    } catch (error) {
      alert('Failed to delete package: ' + error.message);
    }
  };

  useEffect(() => {
    const getPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data);
      } catch (error) {
        alert('Failed to load packages: ' + error.message);
      }
    };

    getPackages();
  }, []);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">{editingPackage ? 'Edit Package' : 'Add Package'}</h2>
        <input type="text" name="destinationName" className="form-input" placeholder="Destination Name" value={formData.destinationName} onChange={handleChange} required />
        <input type="text" name="packageTitle" className="form-input" placeholder="Package Title" value={formData.packageTitle} onChange={handleChange} required />
        <textarea name="description" className="form-textarea" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" className="form-input" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="availableDates" className="form-input" placeholder="Available Dates (comma-separated)" value={formData.availableDates} onChange={handleChange} required />
        <input type="number" name="maxTravelers" className="form-input" placeholder="Max Travelers" value={formData.maxTravelers} onChange={handleChange} required />
        <button type="submit" className="form-button">{editingPackage ? 'Update Package' : 'Add Package'}</button>
      </form>

      <div className="table-container">
        <h3 className="table-title">Added Packages</h3>
        <table className="packages-table">
          <thead>
            <tr>
              <th>Destination</th>
              <th>Package Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Available Dates</th>
              <th>Max Travelers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td>{pkg.destinationName}</td>
                <td>{pkg.packageTitle}</td>
                <td>{pkg.description}</td>
                <td>${pkg.price}</td>
                <td>{pkg.availableDates}</td>
                <td>{pkg.maxTravelers}</td>
                <td>
                  <button onClick={() => handleEdit(pkg)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(pkg._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPackage;
