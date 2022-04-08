import { Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

import RecipeService from "services/recipe.service";
import { queryKey } from "shared/types/reactQueryKey";

import { TableContainer } from "shared/ui-kit/Table/containers";

export const RecipesContainer = () => {
  const queryClient = useQueryClient();

  const deleteRecipeMutation = useMutation((_id: string) => RecipeService.deleteRecipe(_id), {
    onSettled: () => queryClient.invalidateQueries(queryKey.dataRows),
  });

  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22 }} gutterBottom>
        Recipes
      </Typography>
      <TableContainer deleteMutation={deleteRecipeMutation} flag={"recipe"} />
    </>
  );
};
