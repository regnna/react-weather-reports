import "./current-weather.css";
import React from 'react';
// import {01d.png} "../../../public/icons"

const CurrentWeather = ({data}) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`}/>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parmeter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parmeter-label">Feels Like</span>
            <span className="parmeter-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parmeter-label">Wind</span>
            <span className="parmeter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parmeter-label">Humidity</span>
            <span className="parmeter-value">{data.main.humidity} %</span>
          </div>
          <div className="parameter-row">
            <span className="parmeter-label">Pressure</span>
            <span className="parmeter-value">{data.main.pressure} hpa</span>
          </div>
        </div>
      </div>
      {/* <img alt="weather" className="weather-icon" src="../../../public/icons/01d.png "/> */}
    </div>
  );
};
export default CurrentWeather;
