import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Travel CMS</h1>
      <div>
        <Link to="/">Packages</Link>
        <Link to="/admin/login">Admin Login</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/add-package">Add Package</Link>
        <Link to="/admin/add-booking">Add Booking</Link>

      </div>

    </nav>


  );
};

export default Navbar;