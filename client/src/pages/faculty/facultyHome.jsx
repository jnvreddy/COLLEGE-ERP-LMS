// FacultyHome.jsx (Frontend)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacultyHome = () => {
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Optionally, fetch event details for the selected date
  };

  const handleEventDetailsChange = async (event) => {
    setEventDetails(event.target.value);
    try {
      await axios.post('/api/events', {
        date: selectedDate,
        details: event.target.value,
      });
      console.log('Event details saved successfully');
      // Optionally, update UI or show notification of successful save
    } catch (error) {
      console.error('Error saving event details:', error);
      // Handle error, show error message to user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Faculty Home</h1>
      <p>Welcome, Faculty Member!</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Div: Image Display */}
        <div className="bg-gray-200 p-4">
          <h2 className="text-2xl font-bold mb-2">Images from Admin</h2>
          <div className="flex flex-wrap">
            {images.map((image, index) => (
              <div key={index} className="w-1/3 p-2">
                <img src={image.url} alt={`Image ${index}`} className="max-w-full h-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Div: Event Details */}
        <div className="bg-gray-100 p-4">
          <h2 className="text-2xl font-bold mb-2">{selectedDate.toDateString()}</h2>
          <h3 className="text-xl mb-2">Event Details</h3>
          <textarea
            className="w-full p-2 border"
            value={eventDetails}
            onChange={handleEventDetailsChange}
            placeholder="Add event details here..."
          />
        </div>
      </div>

      {/* Optional: Calendar Component */}
      {/* You can optionally include a calendar to view events and navigate dates */}
    </div>
  );
};

export default FacultyHome;
