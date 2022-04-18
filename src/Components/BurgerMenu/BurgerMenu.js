import React, { useState } from "react";
import styles from "./BurgerMenu.module.css";
import { Link } from "react-router-dom";
import { days } from "../utils/icons";

const BurgerMenu = ({ setCurrentDay, setHourlyForecast }) => {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const key = "64fa5118d75974a6b3864c8c20059c29";

  const getWeatherByCity = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((weather) => setCurrentDay([weather]))
      .catch((error) => {
        console.log(error);
      });
  };
  const getHourlyWeatherByCity = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${key}`
    )
      .then((res) => res.json())
      .then((weather) => setHourlyForecast(weather.list.slice(0, 5)))
      .catch((error) => {
        console.log(error);
      });
  };

  const searchValueChanger = (e) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue("");
  };

  return (
    <>
      <form>
        <label for="search">
          <input
            value={value}
            onChange={(e) => {
              searchValueChanger(e);
              setSearch(e.target.value);
              setValue(e.target.value);
            }}
            className={styles.search}
            type="text"
            placeholder="London"
            required
            name="search"
          />
        </label>
        <input
          type="submit"
          onClick={() => {
            getWeatherByCity();
            getHourlyWeatherByCity();
            resetValue();
          }}
          className={styles.search_icon}
          value=" "
        />
      </form>

      <div className={styles.daily_link}>
        <Link to="/dailyforecast">Daily-Forecast {days}</Link>
        <Link to="/weather-app">Current-Day Forecast</Link>
      </div>
    </>
  );
};

export default BurgerMenu;
