import React from "react";

const HourlyForecast = ({ hourly, index }) => {
  const sec = hourly.dt;
  const date = new Date(sec * 1000);
  const time = date.toLocaleTimeString().slice(0, 2);

  return (
    <>
      <div key={index}>
        <p >{time >= 12 ? time + " PM" : time + " AM"}</p>
        <img
          src={`http://openweathermap.org/img/wn/${hourly.weather[0].icon}.png`}
          alt=""
        />
        <p>{hourly.main.temp}&#176;</p>
      </div>
    </>
  );
};

export default HourlyForecast;
