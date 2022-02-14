import React, { useEffect, useState } from "react";
import "../TodaysForecast/Background.css";
import styles from "./DailyForecast.module.css";

const DailyForecast = ({ wallPaper }) => {
  const [dailyForecast, setDailyForecast] = useState([]);

  const showDay = (item) => {
    const date = new Date(item * 1000).toString().slice(0, 3);
    return date;
  };
  const showMonth = (item) => {
    const date = new Date(item * 1000).toString().slice(4,7);
    return date;
  };
  const showDate = (item) => {
    const date = new Date(item * 1000).toString().slice(8,10);
    return date;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const key = "64fa5118d75974a6b3864c8c20059c29";
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getDaysWeather(lat, lon, key);
    });
  }, []);

  const getDaysWeather = (lat, lon, key) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`
    )
      .then((res) => res.json())
      .then((weather) => setDailyForecast(weather.daily.splice(0, 7)));
  };
  console.log(dailyForecast);
  return (
    <>
      <div className={wallPaper}>
        <div className={styles.daily_block}>
          {dailyForecast.map((forecast) => (
            <>
              <div className={styles.sideBar}>
                <p>{showDay(forecast.dt)}</p>
                <p>{showDate(forecast.dt)}</p>
                <p>{showMonth(forecast.dt)}</p>
                <img src={`http://openweathermap.org/img/wn/${forecast.weather.icon}.png`} alt="" />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default DailyForecast;
