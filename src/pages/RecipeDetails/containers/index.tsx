import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Paper, Typography } from "@mui/material";

import RecipeService from "services/recipe.service";
import UserService from "services/user.service";
import RecipeCommentService from "services/recipeComments.service";

import { recipeData } from "shared/interfaces/DetailsPage";
import { CommentView } from "shared/ui-kit/Comment";
import { RecipeView } from "../components/Recipe";
import { ROUTE_NAMES } from "router/routeNames";

export const RecipeDetailsContainer = () => {
  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const openOption = Boolean(anchorElOption);
  const navigation = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const { isError, data: recipeDetails }: { isError?: boolean; data?: recipeData } = useQuery(
    ["recipeDetails", id],
    () => RecipeService.getRecipe(id).then((getRecipeDetails) => getRecipeDetails.data),
    {
      keepPreviousData: true,
    }
  );
  if (isError) {
    navigation(ROUTE_NAMES.LOGIN, { replace: true });
  }

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

  const deleteRecipeCommentsIdMutation = useMutation(
    ({ card_id, comment_id }: { card_id: string; comment_id: string }) =>
      RecipeService.deleteRecipeCommentsId(card_id, comment_id)
  );
  const deleteCommentMutation = useMutation((_id: string) => RecipeCommentService.deleteRecipeComment(_id), {
    onSettled: () => queryClient.invalidateQueries("recipeDetails"),
  });

  const handleDeleteComment = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    deleteRecipeCommentsIdMutation.mutate({ card_id: recipeDetails?._id as string, comment_id: _id });
    deleteCommentMutation.mutate(_id);
    handleCloseMenu();
  };

  const UpdateStatusMutation = useMutation(
    ({ _id, user_status }: { _id: string; user_status: string }) => UserService.updateUserStatus(_id, user_status),
    {
      onSettled: () => queryClient.invalidateQueries("allUsers"),
    }
  );

  const handleBlockUser = (_id: string, user_status: string) => {
    UpdateStatusMutation.mutate({ _id, user_status });
  };
  const reverseComments = recipeDetails?.comments.slice()?.reverse();
  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22 }} gutterBottom>
        Recipes
      </Typography>
      <Paper sx={{ p: { xs: 1, md: 2, lg: 4 } }}>
        {recipeDetails && (
          <RecipeView
            title={recipeDetails.title}
            author={recipeDetails.author}
            description={recipeDetails.description}
            ingredients={recipeDetails.ingredients}
            steps={recipeDetails.steps}
            likes={recipeDetails.likes.length}
            comments={recipeDetails.comments.length}
            views={recipeDetails.views}
            image={recipeDetails.image}
            navigation={navigation}
          />
        )}
        {recipeDetails && reverseComments && (
          <CommentView
            comments={reverseComments}
            handleOpenMenu={handleOpenMenu}
            anchorElOption={anchorElOption}
            openOption={openOption}
            userId={userId}
            commentId={commentId}
            handleCloseMenu={handleCloseMenu}
            handleDeleteComment={handleDeleteComment}
            handleBlockUser={handleBlockUser}
          />
        )}
      </Paper>
    </>
  );
};
