import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTE_NAMES } from "./routeNames";

import { LoginContainer } from "pages/Login/containers";
import { LayoutContainer } from "shared/ui-kit/Layout/containers";
import { HomeContainer } from "pages/Home/containers";
import { StatisticsContainer } from "pages/Statistics/containers";
import { RecipesContainer } from "pages/Recipes/containers";
import { CookbookContainer } from "pages/Cookbooks/containers";
import { CookbookDetailsContainer } from "pages/CookbookDetails/containers";
import { RecipeDetailsContainer } from "pages/RecipeDetails/containers";
import { CollectionsContainer } from "pages/Collections/containers";
import { SettingsContainer } from "pages/Settings/containers";
import { AddCollectionContainer } from "pages/AddCollection/containers";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.LOGIN} element={<LoginContainer />} />
      <Route path={ROUTE_NAMES.HOME} element={<LayoutContainer />}>
        <Route index element={<HomeContainer />} />
        <Route path={ROUTE_NAMES.STATISTICS} element={<StatisticsContainer />} />
        <Route path={ROUTE_NAMES.COOKBOOKS} element={<CookbookContainer />} />
        <Route path={ROUTE_NAMES.COOKBOOKSID} element={<CookbookDetailsContainer />} />
        <Route path={ROUTE_NAMES.RECIPES} element={<RecipesContainer />} />
        <Route path={ROUTE_NAMES.RECIPESID} element={<RecipeDetailsContainer />} />
        <Route path={ROUTE_NAMES.COLLECTIONS} element={<CollectionsContainer />} />
        <Route path={ROUTE_NAMES.ADDCOLLECTION} element={<AddCollectionContainer />} />
        <Route path={ROUTE_NAMES.SETTINGS} element={<SettingsContainer />} />
      </Route>
    </Routes>
  );
};
