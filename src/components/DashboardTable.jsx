import React from 'react';
import './DashboardTable.css'

const DashboardTable = () => {
  const data = [
    { id: 1, name: 'Beach Vacation', price: '$500', status: 'Available' },
    { id: 2, name: 'Mountain Adventure', price: '$700', status: 'Booked' },
    { id: 3, name: 'City Tour', price: '$300', status: 'Available' },
  ];

  return (
    <div className="dashboard-table">
      <h2>Travel Packages</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((packageData) => (
            <tr key={packageData.id}>
              <td>{packageData.id}</td>
              <td>{packageData.name}</td>
              <td>{packageData.price}</td>
              <td>{packageData.status}</td>
              <td>
                <button className="action-btn">Edit</button>
                <button className="action-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
