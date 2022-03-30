import React, { FC, useState } from "react";
import { Typography } from "@mui/material";

import RecipeService from "services/recipe.service";

import { tableData } from "shared/interfaces/Table";
import { Order } from "shared/types/table";
import { TableContainer } from "shared/ui-kit/Table/containers";

export const RecipesContainer: FC = () => {
  const [dataRows, setDataRows] = useState<tableData[] | []>([]);

  const TryGetRecipe = async (orderValue?: Order, orderByValue?: keyof tableData) => {
    try {
      const getAllRecipes = await RecipeService.getAllSortedRecipes(orderValue, orderByValue);
      setDataRows(getAllRecipes.data.allSortedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRecipe = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    await RecipeService.deleteRecipe(_id);
    TryGetRecipe();
  };
  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: "22px" }} gutterBottom>
        Recipes
      </Typography>
      <TableContainer TryGetData={TryGetRecipe} dataRows={dataRows} handleDelete={handleDeleteRecipe} />
    </>
  );
};
