import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingList.css'

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <h4>{booking.customerName}</h4>
              <p>Contact Info: {booking.contactInfo}</p>
              <p>Package: {booking.selectedPackage ? booking.selectedPackage.packageTitle : 'No package selected'}</p>
              <p>Number of Travelers: {booking.numberOfTravelers}</p>
              <p>Status: {booking.bookingStatus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available</p>
      )}
    </div>
  );
};

export default BookingList;


