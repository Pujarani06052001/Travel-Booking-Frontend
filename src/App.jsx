import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import PackageList from './components/PackageList';
import AddPackage from './components/AddPackage';
import BookingList from './components/BookingList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddBooking from './components/Addbooking';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PackageList />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/add-package" element={<AddPackage />} />
        <Route path="/admin/bookings" element={<BookingList />} />
        <Route path="/admin/add-booking" element={<AddBooking/>} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;