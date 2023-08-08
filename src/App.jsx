import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CurrentDateTime from './components/datetime';
import reacticon from '../public/react.png'
import viteicon from '../public/vite.svg'
import eco from './assets/eco 2.png'
import wind from './assets/wind.png'
import humidity from './assets/humidity.png'
import like from './assets/like.png'


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const apiKey = 'cb7c494a26a513f99391ce4ba8bd32ce';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const currentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
      axios.get(currentLocationUrl).then((response) => {
        setData(response.data);
        const condition = getWeatherCondition(response.data);
        setWeatherCondition(condition);
      });
    }
  }, [latitude, longitude]);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        const condition = getWeatherCondition(response.data);
        setWeatherCondition(condition);
      });
      setLocation('');
    }
  };

  const getWeatherCondition = (weatherData) => {
    if (weatherData.weather) {
      const weather = weatherData.weather[0].main.toLowerCase();
      if (weather.includes('rain')) return 'rain';
      if (weather.includes('clouds')) return 'clouds ';
      if (weather.includes('thunderstorm')) return 'thunderstorm';
      if (weather.includes('snow')) return 'snow';
    }
    return 'clear';
  };
  return (
    <>
      <div className="container fade-in" >
        <div className="weather-input">
        <div className='top-title'>
          <p>This weather web application allows you to easily search for the current weather in any city of your choice.</p>
          <p>Stay informed about temperature, humidity, wind speed, and more.</p>
          </div>
          <div className="search">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Search Location"
              type="text"
            />
          </div>
          <div className="separator" ></div>
          <div className='features'>

          <CurrentDateTime />
          <br />
          <h4 className={data ? 'fade-in' : ''}>{data?.name} {data && data.sys?<> {data.sys.country} </> : null} </h4>
          <br />
          <div className={data && data.weather ? 'fade-in' : ''}>   
                {data && data.sys?<p>Country : {data.sys.country}</p> : null}         
                {data && data.coord?<p>Longtitude : {data.coord.lon}</p> : null}
                {data && data.coord?<p>Latitude : {data.coord.lat}</p> : null}
                <p></p>
          </div>
          </div>
         </div>
         
        <div className="weather-data">
          <div className="current-weather">
          <div className="details">
            <h2 className={data && data.weather ? 'fade-in' : ''}>
                {data && data.weather ? <p>{data.weather[0].main}</p> : null}
            </h2>
            {data && data.weather ?<p> {data.weather[0].description}</p> : null}
            <h2 className={data && data.main ? 'fade-in' : ''}>
                {data && data.main ? <> Temperature : {data.main.temp.toFixed()}°F</> : null}
            </h2>
          
            
        </div>
            <div className={`icon-weather ${weatherCondition}`}></div> 
      </div>
          <br />
          
          <div className="days-forecast">
            <h3>Weather Conditions</h3>
            <br />
            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                  ) : null}
                  <p>Feels Like</p>
                  <img src={like} alt="" className='forecast' />
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                  <img src={humidity} alt="" className='forecast' />
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{data.wind.speed} MPH</p>
                  ) : null}
                  <p>Wind Speed</p>
                  <img src={wind} alt="" className='forecast' />
                </div>
              </div>
            )}
            
          </div>  
         
          <div className='footer'>
          <p>Created with <img src={reacticon} alt="" className='logo' /> + <img src={viteicon} alt="" className='logo' />  by Jerico Santos Pude <img src={eco} alt="" className='logoprofile' /></p>
          <p>Powered by <img src="https://home.openweathermap.org/assets/logo_white-12c4f864cc825cfead13b43f6fdae14172bb7848529cb9f48374b9ebb0e9f061.png" alt="" className='API' /> API</p>
        </div>
        
        </div>
        
      </div>

    </>
  );
}

export default App;
