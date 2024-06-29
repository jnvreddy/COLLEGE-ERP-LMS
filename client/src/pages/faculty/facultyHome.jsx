import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'; // Assuming axios is used for API requests

const FacultyHome = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState('');
  const slideShowInterval = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      startSlideShow();
    }
    return () => {
      stopSlideShow();
    };
  }, [images]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/image');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const startSlideShow = () => {
    stopSlideShow();
    slideShowInterval.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
  };

  const stopSlideShow = () => {
    if (slideShowInterval.current) {
      clearInterval(slideShowInterval.current);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Optionally, you can fetch event details for the selected date here
  };

  const handleEventDetailsChange = (event) => {
    setEventDetails(event.target.value);
    // Save the event details to a shared state or backend to reflect for all users
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Faculty Home</h1>

      {/* Image Section */}
      <div className="bg-gray-200 p-4 mb-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Announcements</h2>
        <div className="relative h-96 bg-white rounded-lg overflow-hidden">
          {images.length > 0 && (
            <div className="h-full flex items-center justify-center">
              <img
                src={`data:${images[currentImageIndex].contentType};base64,${images[currentImageIndex].imageBase64}`}
                alt="Slideshow"
                className="max-h-full"
              />
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
              <button onClick={handlePrevImage} className="bg-gray-500 text-white px-2 py-1 rounded">Prev</button>
              <button onClick={handleNextImage} className="bg-gray-500 text-white px-2 py-1 rounded">Next</button>
            </div>
          )}
        </div>
      </div>

      {/* Calendar and Event Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Div: Calendar */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="custom-calendar-container w-30 overflow-hidden">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="custom-calendar"
            />
          </div>
        </div>

        {/* Right Div: Event Details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">{selectedDate.toDateString()}</h2>
          <h3 className="text-xl mb-2">Event Details</h3>
          <textarea
            className="w-full p-2 border rounded-lg"
            value={eventDetails}
            onChange={handleEventDetailsChange}
            placeholder="Add event details here..."
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
