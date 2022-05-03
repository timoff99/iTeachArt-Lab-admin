import { Grid, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";
import { useQueries } from "react-query";

import CookBookService from "services/cookbook.service";
import RecipeService from "services/recipe.service";
import UserService from "services/user.service";

import { StatisticsView } from "../components";

export const StatisticsContainer = () => {
  const [statistics, setStatistics] = useState<Array<{ title: string; value: number }>>([]);
  const [usersStatistics, setUsersStatistics] = useState<Array<{ title: string; value: number }>>([]);
  const [mostActiveUserStatistics, setMostActiveUserStatistics] = useState<
    Array<{ image: string; username: string; value: number; type: string }>
  >([]);
  const [cardsStatistics, setCardsStatistics] = useState<
    Array<{ title: string; views: number; image: string; cardName: string; author: string }>
  >([]);

  const [
    { data: cookbookStatistics, isLoading: isLoadingCookbook },
    { data: recipeStatistics, isLoading: isLoadingRecipe },
    { data: userStatistics, isLoading: isLoadingUser },
  ] = useQueries([
    {
      queryKey: "cookbookStatistics",
      queryFn: () => CookBookService.getCookbookStatistics().then((res) => res.data),
    },
    { queryKey: "recipeStatistics", queryFn: () => RecipeService.getRecipeStatistics().then((res) => res.data) },
    { queryKey: "userStatistics", queryFn: () => UserService.getUserStatistics().then((res) => res.data) },
  ]);

  const getStatistics = () => {
    const cookbookCount = cookbookStatistics.cookbookCount;
    const recipeCount = recipeStatistics.recipeCount;
    const cookbookViews = cookbookStatistics.cookbookViews[0].total;
    const recipeViews = recipeStatistics.recipeViews[0].total;

    const mostPopularCookbook = cookbookStatistics.mostPopularCookbook[0];
    const mostPopularRecipe = recipeStatistics.mostPopularRecipe[0];

    setStatistics([
      { title: "Cookbooks count", value: cookbookCount },
      { title: "Recipes count", value: recipeCount },
      { title: "Cookbooks views", value: cookbookViews },
      { title: "Recipes views", value: recipeViews },
    ]);
    setUsersStatistics([
      { title: "All users", value: userStatistics.allUsersCount },
      { title: "Blocked", value: userStatistics.blockedUsers },
      { title: "Deleted", value: userStatistics.deletedUsers },
    ]);
    setMostActiveUserStatistics([
      {
        image: userStatistics.mostActiveCookbookUser[0].image,
        username: userStatistics.mostActiveCookbookUser[0].username,
        value: userStatistics.mostActiveCookbookUser[0].cookbook_id.length,
        type: "cookbooks",
      },
      {
        image: userStatistics.mostActiveRecipeUser[0].image,
        username: userStatistics.mostActiveRecipeUser[0].username,
        value: userStatistics.mostActiveRecipeUser[0].recipe_id.length,
        type: "recipes",
      },
    ]);
    setCardsStatistics([
      {
        title: "Most popular cookbook",
        views: mostPopularCookbook.views,
        image: mostPopularCookbook.image,
        cardName: mostPopularCookbook.title,
        author: mostPopularCookbook.author,
      },
      {
        title: "Most popular recipes",
        views: mostPopularRecipe.views,
        image: mostPopularRecipe.image,
        cardName: mostPopularRecipe.title,
        author: mostPopularRecipe.author,
      },
    ]);
  };
  useEffect(() => {
    !isLoadingCookbook && !isLoadingRecipe && !isLoadingUser && getStatistics();
  }, [isLoadingCookbook, isLoadingRecipe, isLoadingUser]);

  return (
    <>
      <StatisticsView
        statistics={statistics}
        userStatistics={usersStatistics}
        mostActiveUserStatistics={mostActiveUserStatistics}
        cardsStatistics={cardsStatistics}
      />
    </>
  );
};
