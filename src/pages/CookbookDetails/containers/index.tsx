import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";

import UserService from "services/user.service";
import { cookbookData } from "shared/interfaces/DetailsPage";

import { CommentView } from "shared/ui-kit/Comment";
import { CookbookView } from "../components/Cookbook";
import { RecipeView } from "../components/Recipe";
import { useLocation, useNavigate } from "react-router-dom";
import CookBookService from "services/cookbook.service";
import CookbookCommentService from "services/cookbookComment";

export const CookbookDetailsContainer = () => {
  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const openOption = Boolean(anchorElOption);
  const [cookbookDetails, setCookbookDetails] = useState<cookbookData | undefined>();
  const navigation = useNavigate();
  const location = useLocation();

  const TryGetCookbook = async () => {
    try {
      const id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
      const getCookbookDetails = await CookBookService.getCookbook(id);
      if (!getCookbookDetails) {
        throw new Error("cookbook not found!");
      }
      setCookbookDetails(getCookbookDetails.data);
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
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22 }} gutterBottom>
        Cookbooks
      </Typography>
      <Paper sx={{ p: { xs: 1, md: 2, lg: 4 } }}>
        {cookbookDetails !== undefined && (
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
        {cookbookDetails !== undefined && <RecipeView recipes={cookbookDetails.recipes} />}
        {cookbookDetails !== undefined && (
          <CommentView
            comments={cookbookDetails.comments}
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
