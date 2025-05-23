import React from 'react';
import './MainWeatherWindow.css';

const getBackgroundClass = (weatherDesc) => {
  if (weatherDesc.includes('rain')) return 'rainy-bg';
  if (weatherDesc.includes('sun')) return 'sunny-bg';
  if (weatherDesc.includes('cloud')) return 'cloudy-bg';
  return 'default-bg';
};

const MainWeatherWindow = ({ city, data,children }) => {
  const backgroundClass = data ? getBackgroundClass(data.weather_desc) : 'default-bg';

  return (
    <div className={`main ${backgroundClass}`}>
      <div className='inner-main'>
        {!city && <h1 className='title'>Weather Forecast</h1>}
        {city && data && (
          <div className='weather-container'>
            <div className='icon-container'>
              <img
                src={`http://openweathermap.org/img/wn/${data.icon === "01n" ? "01d" : data.icon}@2x.png`}
                alt='weather icon'
                className='weather-icon'
              />
              <h1 className='city-name'>{city}</h1>
            </div>
            <div className='today'>
              <p className='temperature'>Temperature: {Math.round(data.temp)}°C</p>
              <p className='description'>{data.weather_desc.toLowerCase()}</p>
              <p className='humidity'>Humidity: {data.humidity}%</p>
              <p className='wind'>Wind Speed: {data.wind} km/h</p>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default MainWeatherWindow;