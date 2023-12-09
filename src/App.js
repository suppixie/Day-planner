import './App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeatherOverlay from './components/WeatherOverlay';
import Forecast from './components/forecast/Forecast';
import Essentials from './components/essentials';
import MusicPlayer from './components/musicplayer';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('Hyderabad');
  const [results, setResults] = useState(null);
  const [containerStyle, setContainerStyle] = useState({});
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setCity(inputValue);
  };

  const getContainerStyle = (weather) => {
    return { backgroundImage: `url(/assets/weather-icons/${weather}.svg)` };
  };

  useEffect(() => {
    if (city) {
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          city +
          '&units=metric' +
          '&appid='+
          process.env.REACT_APP_WEATHER_KEY
          
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result['cod'] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              localStorage.setItem('weatherCondition',result)
              setResults(result);
              setContainerStyle(getContainerStyle(result.weather[0].main));
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
      <div className="weather__container">
        {/* Column 1 */}
        <div className="weather__col--1">
          <div className="weather__search">
            <p className="weather__search--prompt">Enter a city</p>
            <div className='search_city'>
              <input 
                className='city_input'
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter city name"
              />
              <button className='city_search_button' onClick={handleSearch}>Search</button>
            </div>          </div>
          <div className="weather__placeholder weather__placeholder--2">
            <h3>Weather Playlist</h3>
           <MusicPlayer weather={results?.weather[0].main}/>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && (
            <div className="weather__col--2">
              <div className="results__main">
                <WeatherOverlay style={containerStyle} />
                <div>
                  <h2>{results.weather[0].main}</h2>
                  <p>Feels like {results.main.feels_like}°C</p>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </div>
              </div>

              <div className="weather__essentials">
                <Essentials today={results?.weather[0].main} />
              </div>

              <div>
                <Forecast city={city} />
              </div>
            </div>
          )}
        </div>

        {/* Column 3 */}
        <div className="weather__col--3">
          <div className="weather__cta weather__cta--day">
            <p>Plan your day with fun activities!</p>
            <Link to="/Dayplanner">
              <button>Day Planner</button>
            </Link>
          </div>
          <div className="weather__cta weather__cta--day">
            <p>Journal your Day</p>
            <Link to="/Journal">
              <button>Daily Journal</button>
            </Link>
          </div>

         
        </div>
      </div>
    );
  }
}

export default App;
