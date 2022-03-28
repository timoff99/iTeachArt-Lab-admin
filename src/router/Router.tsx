import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";

import { LoginContainer } from "../pages/Login/containers";
import { LayoutContainer } from "../shared/ui-kit/Layout/containers";
import { HomeContainer } from "../pages/Home/containers";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.LOGIN} element={<LoginContainer />} />
      <Route path={ROUTE_NAMES.HOME} element={<LayoutContainer />}>
        <Route index element={<HomeContainer />} />
      </Route>
    </Routes>
  );
};
