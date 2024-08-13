import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "../pages/HomePage";
import ModalDetailMovies from "../pages/ModalDetailMovies";
import LoginPages from "../pages/LoginPages";
import SearchBar from "../components/SearchBar";

function Router() {
  let location = useLocation();
  let state = location.state;

  return (
    <>
      <SearchBar />
      <Routes location={state?.backgroundLocation || location}>
        <Route index element={<Homepage />} />
        <Route path="/movie/:movieId" element={<ModalDetailMovies />} />
        <Route path="login" element={<LoginPages />} />
      </Routes>
    </>
  );
}

export default Router;
