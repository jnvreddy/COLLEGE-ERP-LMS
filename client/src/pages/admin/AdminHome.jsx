import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const AdminHome = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const slideShowInterval = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    startSlideShow();
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
    }, 3000);
  };

  const stopSlideShow = () => {
    if (slideShowInterval.current) {
      clearInterval(slideShowInterval.current);
    }
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('image', files[i]);

      try {
        const response = await axios.post('/api/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 201) {
          newImages.push(response.data); // Assuming response.data contains uploaded image info
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
            setSuccessMessage('Image(s) uploaded successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
          }
        } else {
          setErrorMessage('Failed to upload image');
          setTimeout(() => setErrorMessage(''), 3000);
        }
      } catch (error) {
        setErrorMessage('Error uploading image');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  const handleDeleteImage = async () => {
    const imageToDelete = images[currentImageIndex];
    try {
      const response = await axios.delete(`/api/image/delete/${imageToDelete._id}`);
      if (response.status === 200) {
        setImages((prevImages) => prevImages.filter((img) => img._id !== imageToDelete._id));
        startSlideShow();
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    startSlideShow();
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startSlideShow();
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
      <h1 className="text-3xl font-bold mb-4">Admin Home</h1>

      {/* Image Section */}
      <div className="bg-gray-200 p-4 mb-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Announcements</h2>
        <div className="mt-4">
          <label htmlFor="upload-image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
            onClick={() => document.getElementById('upload-image').click()}
          >
            Choose Image
          </button>
        </div>
        <div className="relative h-96 bg-white rounded-lg overflow-hidden">
          {images.length > 0 && images[currentImageIndex] && (
            <div className="h-full flex items-center justify-center">
              <img src={`data:${images[currentImageIndex].contentType};base64,${images[currentImageIndex].imageBase64}`} alt="Slideshow" className="max-h-full" />
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
              <button onClick={handlePrevImage} className="bg-gray-500 text-white px-2 py-1 rounded">Prev</button>
              <button onClick={handleDeleteImage} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          )}
        </div>
        {/* Success and Error Messages */}
        {successMessage && (
          <div className="text-green-500 mt-2">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 mt-2">
            {errorMessage}
          </div>
        )}
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
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
