import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import "./Background.css";

const MainPages = () => {
  const [currentDay, setCurrentDay] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [wallPaper, setWallPaper] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const key = "64fa5118d75974a6b3864c8c20059c29";
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getHourlyForecast(lat, lon, key);
      getCurrentDay(lat, lon, key);
    });
    backgroundChanger();
  }, []);

  const getCurrentDay = (lat, lon, key) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((todayWeatherInfo) => setCurrentDay([todayWeatherInfo]));
  };
  const getHourlyForecast = (lat, lon, key) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((todayWeatherInfo) => setHourlyForecast(todayWeatherInfo.list.slice(0,6)));
  };

  const backgroundChanger = () => {
    let date = new Date();
    let dateMonth = date.getMonth();
    if (dateMonth >= 12 || dateMonth === 1) setWallPaper("winter");
    if (dateMonth >= 2 || dateMonth === 4) setWallPaper("spring");
    if (dateMonth >= 5 || dateMonth === 7) setWallPaper("summer");
    if (dateMonth >= 8 || dateMonth === 11) setWallPaper("summer");
  };

  console.log(currentDay);
  console.log(hourlyForecast)

  return (
    <div className={wallPaper}>
      {currentDay.map((item) =>
        item.weather.map((weather) => (
          <>
            <div className={styles.container}>
              <div className={styles.dekstop_temp}>
                <h1>{weather.description}</h1>
                <h2 className={styles.temp}>{item.main.temp}&#176;</h2>
              </div>
            </div>
            <footer className={styles.footer}>
              <h3>Today</h3>
              <div>
                <p>Now</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt=""
                />
                <p>{item.main.temp}</p>
              </div>
            </footer>
          </>
        ))
      )}
    </div>
  );
};

export default MainPages;
