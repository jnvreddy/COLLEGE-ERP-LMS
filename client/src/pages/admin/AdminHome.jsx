import React, { useEffect, useState, useRef } from 'react';
import Calendar from 'react-calendar'; // Assuming this is the calendar component
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const AdminHome = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState('');
  const slideShowInterval = useRef(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // Replace with your actual data fetching logic
        const response = await fetch('/api/announcements');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    startSlideShow();
    return () => {
      stopSlideShow();
    };
  }, [images]);

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

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result;
        // Example: Replace with actual API endpoint for image upload
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageData }),
        });
        if (response.ok) {
          const uploadedImage = await response.json();
          newImages.push(uploadedImage);
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        } else {
          // Handle error
          console.error('Failed to upload image');
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleDeleteImage = async () => {
    const imageToDelete = images[currentImageIndex];
    // Example: Replace with actual API endpoint for image deletion
    const response = await fetch(`/api/delete/image/${imageToDelete.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setImages((prevImages) => prevImages.filter((img) => img !== imageToDelete));
      // Restart slideshow if necessary
      startSlideShow();
    } else {
      // Handle deletion error
      console.error('Failed to delete image');
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
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Larger Image Section */}
      <div className="bg-gray-200 p-4 mb-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Announcements</h2>
        <input type="file" accept="image/*" multiple className="border p-2 mb-2" onChange={handleImageUpload} />
        <div className="relative h-96 bg-white rounded-lg overflow-hidden">
          {images.length > 0 && (
            <div className="h-full flex items-center justify-center">
              <img src={images[currentImageIndex].url} alt="Slideshow" className="max-h-full" />
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
              <button onClick={handlePrevImage} className="bg-gray-500 text-white px-2 py-1 rounded">Prev</button>
              <button onClick={handleNextImage} className="bg-gray-500 text-white px-2 py-1 rounded">Next</button>
              <button onClick={handleDeleteImage} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
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
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
