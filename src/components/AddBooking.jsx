import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Use useNavigate from react-router-dom
import './AddBooking.css';

const AddEditBooking = () => {
  const [customerName, setCustomerName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState('');
  const [bookingStatus, setBookingStatus] = useState('Pending');
  const [packages, setPackages] = useState([]);
  const [isEdit, setIsEdit] = useState(false);  // Check if we are editing or adding
  const navigate = useNavigate();  // Use navigate instead of history
  const { id } = useParams();  // Get the booking ID from the route params

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    if (id) {
      setIsEdit(true);
      // If we are editing, fetch the booking details
      const fetchBooking = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/bookings/${id}`);
          const booking = response.data;
          setCustomerName(booking.customerName);
          setContactInfo(booking.contactInfo);
          setSelectedPackage(booking.selectedPackage);
          setNumberOfTravelers(booking.numberOfTravelers);
          setBookingStatus(booking.bookingStatus);
        } catch (error) {
          console.error('Error fetching booking:', error);
        }
      };
      fetchBooking();
    }

    fetchPackages();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      customerName,
      contactInfo,
      selectedPackage,
      numberOfTravelers,
      bookingStatus,
    };

    try {
      if (isEdit) {
        const response = await axios.put(`http://localhost:5000/api/bookings/${id}`, newBooking);
        alert('Booking updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/bookings', newBooking);
        alert('Booking created successfully!');
      }

      navigate('/bookings');  // Navigate to bookings list after submission
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Booking' : 'Add New Booking'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Info</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Selected Package</label>
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            required
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.packageTitle} - {pkg.price} {/* Display price like 10k, 20k */}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Number of Travelers</label>
          <input
            type="number"
            value={numberOfTravelers}
            onChange={(e) => setNumberOfTravelers(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Booking Status</label>
          <select
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit">{isEdit ? 'Update Booking' : 'Create Booking'}</button>
      </form>
    </div>
  );
};

export default AddEditBooking;
