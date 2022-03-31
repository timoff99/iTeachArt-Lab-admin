import { useState, useEffect } from "react";

import CookBookService from "services/cookbook.service";
import RecipeService from "services/recipe.service";
import UserService from "services/user.service";

import { StatisticsView } from "../components";

export const StatisticsContainer = () => {
  const [statistics, setStatistics] = useState<Array<{ title: string; value: number }>>([]);
  const [userStatistics, setUserStatistics] = useState<Array<{ title: string; value: number }>>([]);
  const [mostActiveUserStatistics, setMostActiveUserStatistics] = useState<
    Array<{ image: string; username: string; value: number; type: string }>
  >([]);
  const [cardsStatistics, setCardsStatistics] = useState<
    Array<{ title: string; views: number; image: string; cardName: string; author: string }>
  >([]);

  const getStatistics = async () => {
    const [cookbookStatistics, recipeStatistics, userStatistics] = await Promise.all([
      CookBookService.getCookbookStatistics(),
      RecipeService.getRecipeStatistics(),
      UserService.getUserStatistics(),
    ]);

    const cookbookCount = cookbookStatistics.data.cookbookCount;
    const recipeCount = recipeStatistics.data.recipeCount;
    const cookbookViews = cookbookStatistics.data.cookbookViews[0].total;
    const recipeViews = recipeStatistics.data.recipeViews[0].total;

    const mostPopularCookbook = cookbookStatistics.data.mostPopularCookbook[0];
    const mostPopularRecipe = recipeStatistics.data.mostPopularRecipe[0];

    setStatistics([
      { title: "Cookbooks count", value: cookbookCount },
      { title: "Recipes count", value: cookbookViews },
      { title: "Cookbooks views", value: recipeCount },
      { title: "Recipes views", value: recipeViews },
    ]);
    setUserStatistics([
      { title: "All users", value: userStatistics.data.allUsersCount },
      { title: "Blocked", value: userStatistics.data.blockedUsers },
      { title: "Deleted", value: userStatistics.data.deletedUsers },
    ]);
    setMostActiveUserStatistics([
      {
        image: userStatistics.data.mostActiveCookbookUser[0].image,
        username: userStatistics.data.mostActiveCookbookUser[0].username,
        value: userStatistics.data.mostActiveCookbookUser[0].cookbook_id.length,
        type: "cookbooks",
      },
      {
        image: userStatistics.data.mostActiveRecipeUser[0].image,
        username: userStatistics.data.mostActiveRecipeUser[0].username,
        value: userStatistics.data.mostActiveRecipeUser[0].recipe_id.length,
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
