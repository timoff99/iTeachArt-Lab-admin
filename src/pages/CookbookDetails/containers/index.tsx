import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";

import UserService from "services/user.service";
import CookBookService from "services/cookbook.service";
import CookbookCommentService from "services/cookbookComment.service";

import { CookbookView } from "../components/Cookbook";
import { RecipeView } from "../components/Recipe";
import { cookbookData } from "shared/interfaces/DetailsPage";
import { CommentView } from "shared/ui-kit/Comment";
import { ROUTE_NAMES } from "router/routeNames";
import { queryKey } from "shared/types/reactQueryKey";

export const CookbookDetailsContainer = () => {
  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const openOption = Boolean(anchorElOption);
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const params = useParams();

  const id = params.id || "";
  const { isError, data: cookbookDetails }: { isError?: boolean; data?: cookbookData } = useQuery(
    [queryKey.cookbookDetails, id],
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
    onSettled: () => queryClient.invalidateQueries(queryKey.cookbookDetails),
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
      onSettled: () => queryClient.invalidateQueries(queryKey.allUsers),
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
        <CookbookView
          title={cookbookDetails?.title}
          author={cookbookDetails?.author}
          description={cookbookDetails?.description}
          likes={cookbookDetails?.likes?.length}
          comments={cookbookDetails?.comments?.length}
          views={cookbookDetails?.views}
          image={cookbookDetails?.image}
          navigation={navigation}
        />

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
