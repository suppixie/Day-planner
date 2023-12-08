import React, { useState, useEffect } from 'react';

function Location() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            setError(err.message);
            setLocation({
              latitude: 17.385044, // Hyderabad's latitude
              longitude: 78.486671, // Hyderabad's longitude
            });
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []); 

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Latitude: {location?.latitude}, Longitude: {location?.longitude}
        </p>
      )}
    </div>
  );
}

export default Location;
