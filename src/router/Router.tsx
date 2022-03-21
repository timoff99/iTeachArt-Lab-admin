import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";

import { Home } from "../pages/Home";
import { LoginContainer } from "../pages/Login/containers";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.HOME} element={<Home />} />
      <Route path={ROUTE_NAMES.LOGIN} element={<LoginContainer />} />
    </Routes>
  );
};
