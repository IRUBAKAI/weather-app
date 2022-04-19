import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import "./Background.css";
import HourlyForecast from "./HourlyForecast";
import { menu } from "../utils/icons";
import { BurgerMenu } from "../BurgerMenu";

const MainPages = ({ wallPaper }) => {
  const [currentDay, setCurrentDay] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const key = "64fa5118d75974a6b3864c8c20059c29";
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getHourlyForecast(lat, lon, key);
      getCurrentDay(lat, lon, key);
            console.log(lat, lon)

    });
  }, []);

  const getCurrentDay = (lat, lon, key) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((todayWeatherInfo) => setCurrentDay([todayWeatherInfo]))
      .catch((error) => {
        console.log(error);
      });
  };
  const getHourlyForecast = (lat, lon, key) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((todayWeatherInfo) =>
        setHourlyForecast(todayWeatherInfo.list.slice(0, 5))
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const menuSwitcher = () => {
    if (active === false) {
      setActive(true);
    } else setActive(false);
  };

  return (
    <div className={wallPaper}>
      <p onClick={() => menuSwitcher()} className={styles.burger_menu_icon}>
        {menu}
      </p>
      <div className={active === true ? styles.active_menu : styles.unActive}>
        <BurgerMenu
          setCurrentDay={setCurrentDay}
          setHourlyForecast={setHourlyForecast}
        />
      </div>
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
              <div className={styles.hourly_title}>
                <h1>Today</h1>
                <h1>{item.name}</h1>
              </div>
              <div className={styles.footer_container}>
                <div>
                  <p>Now</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                    alt=""
                  />
                  <p>{item.weather[0].description}</p>
                  <p>{item.main.temp}&#176;</p>
                  <p>wind speed: {item.wind.speed}</p>
                </div>
                {hourlyForecast.map((hourly, index) => {
                  const sec = hourly.dt;
                  const date = new Date(sec * 1000);
                  const time = date.toLocaleTimeString().slice(0, 2);
                  return (
                    <HourlyForecast hourly={hourly} index={index} time={time} />
                  );
                })}
              </div>
            </footer>
          </>
        ))
      )}
    </div>
  );
};

export default MainPages;
