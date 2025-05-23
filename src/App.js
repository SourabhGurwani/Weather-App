import React, { useState } from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow';
import CityInput from './components/CityInput';
import WeatherBox from './components/WeatherBox';
import Loader from './components/Loader';

const App = () => {
  const [city, setCity] = useState(undefined);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State for error message

  const updateState = (data) => {
    const cityName = data.city.name;
    const dayIndices = getDayIndices(data);

    // console.log(data.list[0].weather[0].icon);
    // console.log(data.list[1].weather[1].icon);
    
    const updatedDays = dayIndices.map(index => {
      const listItem = data.list[index];
      return {
        date: listItem.dt_txt,
        weather_desc: listItem.weather[0].description,
        icon: listItem.weather[0].icon,
        temp: Math.round(listItem.main.temp),
        humidity: listItem.main.humidity,
        wind: Math.round(listItem.wind.speed * 3.6)
      };
    });

    setCity(cityName);
    setDays(updatedDays);
    setLoading(false);
    setError(''); // Clear error on successful fetch
  };
  const api_key = process.env.REACT_APP_API_KEY;
  const makeApiCall = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${api_key}`
      );
      const data = await response.json();

      if (data.cod === '200') {
        updateState(data);
        return true;
      } else {
        setError('City not found. Please try again.');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('Failed to fetch data. Please check your connection.');
      setLoading(false);
      return false;
    }
  };

  const getDayIndices = (data) => {
    let dayIndices = [0];
    let index = 0;
    let currentDay = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        currentDay === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      currentDay = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {loading ? (
          <Loader />
        ) : (
          <MainWeatherWindow data={days[0]} city={city} error={error} >
            <CityInput city={city} makeApiCall={makeApiCall} />
            {error && <p className='error-message'>{error}</p>} {/* Error Message */}
            <ul className='weather-box-list'>
              {days.slice(1).map((day, index) => (
                <li key={index}>
                  <WeatherBox {...day} />
                </li>
              ))}
            </ul>
          </MainWeatherWindow>
        )}
      </header>
    </div>
  );
};

export default App;
