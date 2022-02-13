import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {TodaysForecast} from "./Components/TodaysForecast"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TodaysForecast/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
