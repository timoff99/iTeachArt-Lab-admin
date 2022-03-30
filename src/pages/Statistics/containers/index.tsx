import React, { FC, useState, useEffect } from "react";

import CookBookService from "services/cookbook.service";
import RecipeService from "services/recipe.service";
import UserService from "services/user.service";

import { StatisticsView } from "../components";

export const StatisticsContainer: FC = () => {
  const [statistics, setStatistics] = useState<Array<{ title: string; value: number }> | []>([]);
  const [userStatistics, setUserStatistics] = useState<Array<{ title: string; value: number }> | []>([]);
  const [mostActiveUserStatistics, setMostActiveUserStatistics] = useState<
    Array<{ image: string; username: string; value: number; type: string }> | []
  >([]);
  const [cardsStatistics, setCardsStatistics] = useState<
    Array<{ title: string; views: number; image: string; cardName: string; author: string }> | []
  >([]);

  const getStatistics = async () => {
    const statistics = await Promise.all([
      CookBookService.getCookbookStatistics(),
      RecipeService.getRecipeStatistics(),
      UserService.getUserStatistics(),
    ]);

    const cookbookCount = statistics[0].data.cookbookCount;
    const recipeCount = statistics[1].data.recipeCount;
    const cookbookViews = statistics[0].data.cookbookViews[0].total;
    const recipeViews = statistics[1].data.recipeViews[0].total;

    const mostPopularCookbook = statistics[0].data.mostPopularCookbook[0];
    const mostPopularRecipe = statistics[1].data.mostPopularRecipe[0];

    const userStatistics = statistics[2].data;
    setStatistics([
      { title: "Cookbooks count", value: cookbookCount },
      { title: "Recipes count", value: cookbookViews },
      { title: "Cookbooks views", value: recipeCount },
      { title: "Recipes views", value: recipeViews },
    ]);
    setUserStatistics([
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
    getStatistics();
  }, []);

  return (
    <StatisticsView
      statistics={statistics}
      userStatistics={userStatistics}
      mostActiveUserStatistics={mostActiveUserStatistics}
      cardsStatistics={cardsStatistics}
    />
  );
};
