import React, { useState, useEffect } from 'react';
import './dayplanner.css';
import GetActivity from './GetActivity';

function DayPlanner() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('Hyderabad');
  const [results, setResults] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setCity(inputValue);
  };

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result['cod'] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              setResults(result);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [city]);

 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="dayplanner-container">
          <div className="dayplanner-weather">
          <h2>Enter a city below </h2>

            <div className='search_city_2'>
              <input 
                className='city_input'
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter city name"
              />
              <button className='city_search_button' onClick={handleSearch}>Search</button>
            </div>
            <div className="dayplanner-results">
              {!isLoaded && <h2>Loading...</h2>}
              {isLoaded && results && (
                <>
                  <h3>{results.weather[0].main}</h3>
                  <p>Feels like {results.main.feels_like}°C</p>
                  <i>
                    <p>
                      {results.name}, {results.sys.country}
                    </p>
                  </i>
                </>
              )}
            </div>
          </div>
          <hr />
          {results !== null && (
            <GetActivity
              temp={results.main.temp}
              weather={results.weather[0].main}
              location={results.name}
            />
          )}
        </div>
      </>
    );
  }
}

export default DayPlanner;
