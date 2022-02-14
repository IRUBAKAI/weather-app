import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DailyForecast } from "./Components/DailyForecast";
import { TodaysForecast } from "./Components/TodaysForecast";

const App = () => {
  const [wallPaper, setWallPaper] = useState("");

  const backgroundChanger = () => {
    let date = new Date();
    let dateMonth = date.getMonth();
    if (dateMonth >= 12 || dateMonth === 1) setWallPaper("winter");
    if (dateMonth >= 2 || dateMonth === 4) setWallPaper("spring");
    if (dateMonth >= 5 || dateMonth === 7) setWallPaper("summer");
    if (dateMonth >= 8 || dateMonth === 11) setWallPaper("summer");
  };

  useEffect(() => {
    backgroundChanger();
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/weather-app"
            element={<TodaysForecast wallPaper={wallPaper}/>}
          />
          <Route
            exact
            path="/dailyforecast"
            element={<DailyForecast wallPaper={wallPaper}/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
