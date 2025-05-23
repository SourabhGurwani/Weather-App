import React from 'react';
import './WeatherBox.css';

const WeatherBox = ({ date, icon, temp, humidity, wind }) => {
  const getDay = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[new Date(dateString).getDay()];
  };

  return (
    <div className='weather-box'>
      <h1>{date ? getDay(date) : ''}</h1>
      <img
          src={`http://openweathermap.org/img/wn/${icon === "01n" ? "01d" : icon}@2x.png`}
          alt='weather icon'
      />
      <span className='temp'>{temp}°C</span>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {wind} km/h</p>
    </div>
  );
};

export default WeatherBox;
