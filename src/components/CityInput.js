import React, { useState } from 'react';
import './CityInput.css';

const CityInput = ({ city, makeApiCall }) => {
  const [cityName, setCityName] = useState('');

  const onSearchClick = async () => {
    if (/^[a-zA-Z\s]+$/.test(cityName)) {
      const inputElement = document.querySelector('.city-input');
      inputElement.classList.add('loading');

      const isSuccess = await makeApiCall(cityName);
      inputElement.placeholder = isSuccess ? 'Enter a City...' : 'City not found, try again...';

      inputElement.classList.remove('loading');
      setCityName('');
    } else {
      alert('Please enter a valid city name.');
    }
  };

  const onRefreshClick = () => {
    if (city) makeApiCall(city); // Refresh the weather for the current city
  };

  const onKeyPressHandler = async (e) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div className='city-input-container'>
      <input
        className='city-input'
        type='text'
        value={cityName}
        placeholder='Enter a City...'
        onChange={(e) => setCityName(e.target.value)}
        onKeyPress={onKeyPressHandler}
        style={{
          top: city ? '-380px' : '-20px',
        }}
      />
      <div className='button-container'>
        <button className='search-button' onClick={onSearchClick}>
          🔍
        </button>
        <button className='refresh-button' onClick={onRefreshClick} disabled={!city}>
          🔄
        </button>
      </div>
    </div>
  );
};

export default CityInput;
