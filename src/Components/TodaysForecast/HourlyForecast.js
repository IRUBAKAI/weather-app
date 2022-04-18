import React from "react";

const HourlyForecast = ({ hourly, index, time }) => {
  return (
    <>
      <div key={index}>
        <p>{time >= 12 ? time + " PM" : time + " AM"}</p>
        <img
          src={`http://openweathermap.org/img/wn/${hourly.weather[0].icon}.png`}
          alt=""
        />
        <p>{hourly.weather[0].description}</p>
        <p>{hourly.main.temp}&#176;</p>
        <p>wind speed: {hourly.wind.speed}</p>
      </div>
    </>
  );
};

export default HourlyForecast;
