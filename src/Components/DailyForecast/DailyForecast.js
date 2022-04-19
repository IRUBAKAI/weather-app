import React, { useEffect, useState } from "react";
import { BurgerMenu } from "../BurgerMenu";
import "../TodaysForecast/Background.css";
import HourlyForecast from "../TodaysForecast/HourlyForecast";
import { menu } from "../utils/icons";
import styles from "./DailyForecast.module.css";
import mainPageStyles from "../TodaysForecast/MainPage.module.css";

const DailyForecast = ({ wallPaper }) => {
  const [dailyForecast, setDailyForecast] = useState([]);
  const [day, setDay] = useState([]);
  const [currentDay, setCurrentDay] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [active, setActive] = useState(false);

  const showDay = (item) => {
    const date = new Date(item * 1000).toString().slice(0, 3);
    return date;
  };
  const showMonth = (item) => {
    const date = new Date(item * 1000).toString().slice(4, 7);
    return date;
  };
  const showDate = (item) => {
    const date = new Date(item * 1000).toString().slice(8, 10);
    return date;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const key = "64fa5118d75974a6b3864c8c20059c29";
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getDaysWeather(lat, lon, key);
      getHourlyForecast(lat, lon, key);
      getCurrentDay(lat, lon, key);
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

  const getDaysWeather = (lat, lon, key) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`
    )
      .then((res) => res.json())
      .then((weather) => {
        setDailyForecast(weather.daily.splice(1, 4));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHourlyForecast = (lat, lon, key) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((todayWeatherInfo) => setHourlyForecast(todayWeatherInfo.list))
      .catch((error) => {
        console.log(error);
      });
  };

  let hourlyChangedArray = [];

  hourlyForecast.map((item) => {
    const date = new Date(day.dt * 1000).toString().slice(8, 10);
    let slice = item.dt_txt.slice(8, 10);
    if (slice === date) {
      hourlyChangedArray.push(item);
    }
    return item;
  });

  const menuSwitcher = () => {
    if (active === false) {
      setActive(true);
    } else setActive(false);
  };

  console.log(hourlyForecast)

  return (
    <>
      <div className={wallPaper}>
        <p
          onClick={() => menuSwitcher()}
          className={mainPageStyles.burger_menu_icon}
        >
          {menu}
        </p>
        <div
          className={
            active === true
              ? mainPageStyles.active_menu
              : mainPageStyles.unActive
          }
        >
          <BurgerMenu
            setCurrentDay={setCurrentDay}
            setHourlyForecast={setHourlyForecast}
          />
        </div>
        <div className={styles.daily_block}>
          <div className={styles.sideBar}>
            {currentDay.map((day) => (
              <>
                <div onClick={() => setDay(day)}>
                  <p>{showDay(day.dt)}</p>
                  <p>{showDate(day.dt)}</p>
                  <p>{showMonth(day.dt)}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt=""
                  />
                  <div className={styles.temp}>
                    <div>
                      <span>min</span>
                      <span>max</span>
                    </div>
                    <div>
                      <span>{day.main.temp_min}&#176;</span>
                      <span>{day.main.temp_max}&#176;</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          {dailyForecast.map((forecast) => (
            <>
              <div className={styles.sideBar} onClick={() => setDay(forecast)}>
                <p>{showDay(forecast.dt)}</p>
                <p>{showDate(forecast.dt)}</p>
                <p>{showMonth(forecast.dt)}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt=""
                />
                <div className={styles.temp}>
                  <div>
                    <span>min</span>
                    <span>max</span>
                  </div>
                  <div>
                    <span>{forecast.temp.min}&#176;</span>
                    <span>{forecast.temp.max}&#176;</span>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <main>
          {currentDay.map((item) => {
            return (
              <div className={styles.hourly_title}>
                <h1>Hourly forecast</h1>
                <h1>{item.name}</h1>
              </div>
            );
          })}
          <div className={styles.hourly_info}>
            {hourlyChangedArray.map((hourly, index) => {
              console.log(hourly);
              const sec = hourly.dt;
              const date = new Date(sec * 1000);
              const time = date.toLocaleTimeString().slice(0, 2);
              return (
                <div className={styles.hourly_blocks}>
                  <HourlyForecast hourly={hourly} index={index} time={time} />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
};

export default DailyForecast;
