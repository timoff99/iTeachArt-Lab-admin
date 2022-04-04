import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";

import UserService from "services/user.service";
import { recipeData } from "shared/interfaces/DetailsPage";

import { CommentView } from "shared/ui-kit/Comment";
import { RecipeView } from "../components/Recipe";
import { useLocation, useNavigate } from "react-router-dom";
import CookbookCommentService from "services/cookbookComment";
import RecipeService from "services/recipe.service";

export const RecipeDetailsContainer = () => {
  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const openOption = Boolean(anchorElOption);
  const [recipeDetails, setRecipeDetails] = useState<recipeData>();
  const navigation = useNavigate();
  const location = useLocation();

  const TryGetCookbook = async () => {
    try {
      const id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
      const getRecipeDetails = await RecipeService.getRecipe(id);
      setRecipeDetails(getRecipeDetails.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TryGetCookbook();
  }, []);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string,
    commentId: string
  ) => {
    event.stopPropagation();
    setAnchorElOption(event.currentTarget);
    setUserId(userId);
    setCommentId(commentId);
  };
  const handleCloseMenu = () => {
    setAnchorElOption(null);
  };

  const handleDeleteComment = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    await CookbookCommentService.deleteCookbookComment(_id);
    handleCloseMenu();
    TryGetCookbook();
  };
  const handleBlockUser = async (_id: string, user_status: string) => {
    await UserService.updateUserStatus(_id, user_status);
  };

  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: "22px" }} gutterBottom>
        Recipes
      </Typography>
      <Paper sx={{ p: { xs: 1, md: 2, lg: 4 } }}>
        <RecipeView
          title={recipeDetails?.title}
          author={recipeDetails?.author}
          description={recipeDetails?.description}
          ingredients={recipeDetails?.ingredients}
          steps={recipeDetails?.steps}
          likes={recipeDetails?.likes.length}
          comments={recipeDetails?.comments.length}
          views={recipeDetails?.views}
          image={recipeDetails?.image}
          navigation={navigation}
          location={location}
        />
        <CommentView
          comments={recipeDetails?.comments}
          handleOpenMenu={handleOpenMenu}
          anchorElOption={anchorElOption}
          openOption={openOption}
          userId={userId}
          commentId={commentId}
          handleCloseMenu={handleCloseMenu}
          handleDeleteComment={handleDeleteComment}
          handleBlockUser={handleBlockUser}
        />
      </Paper>
    </>
  );
};
