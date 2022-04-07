import { useState } from "react";
import { Paper, Typography } from "@mui/material";

import UserService from "services/user.service";
import { cookbookData } from "shared/interfaces/DetailsPage";

import { CommentView } from "shared/ui-kit/Comment";
import { CookbookView } from "../components/Cookbook";
import { RecipeView } from "../components/Recipe";
import { useLocation, useNavigate } from "react-router-dom";
import CookBookService from "services/cookbook.service";
import CookbookCommentService from "services/cookbookComment.service";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ROUTE_NAMES } from "router/routeNames";

export const CookbookDetailsContainer = () => {
  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const openOption = Boolean(anchorElOption);
  const navigation = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const { isError, data: cookbookDetails }: { isError?: boolean; data?: cookbookData } = useQuery(
    ["cookbookDetails", id],
    () => CookBookService.getCookbook(id).then((getCookbookDetails) => getCookbookDetails.data),
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

  const deleteCookBookCommentsIdMutation = useMutation(
    ({ card_id, comment_id }: { card_id: string; comment_id: string }) =>
      CookBookService.deleteCookBookCommentsId(card_id, comment_id)
  );
  const deleteCommentMutation = useMutation((_id: string) => CookbookCommentService.deleteCookbookComment(_id), {
    onSettled: () => queryClient.invalidateQueries("cookbookDetails"),
  });
  const handleDeleteComment = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    event.stopPropagation();

    deleteCookBookCommentsIdMutation.mutate({ card_id: cookbookDetails?._id as string, comment_id: _id });
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

  const reverseComments = cookbookDetails?.comments.slice()?.reverse();

  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22 }} gutterBottom>
        Cookbooks
      </Typography>
      <Paper sx={{ p: { xs: 1, md: 2, lg: 4 } }}>
        {cookbookDetails && (
          <CookbookView
            title={cookbookDetails.title}
            author={cookbookDetails.author}
            description={cookbookDetails.description}
            likes={cookbookDetails.likes.length}
            comments={cookbookDetails.comments.length}
            views={cookbookDetails.views}
            image={cookbookDetails.image}
            navigation={navigation}
          />
        )}
        {cookbookDetails && <RecipeView recipes={cookbookDetails.recipes} />}
        {cookbookDetails && reverseComments && (
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
