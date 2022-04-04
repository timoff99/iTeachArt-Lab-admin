import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IComment, ICommentProps } from "shared/interfaces/DetailsPage";

export const CommentView = ({
  comments,
  handleOpenMenu,
  anchorElOption,
  openOption,
  userId,
  commentId,
  handleCloseMenu,
  handleDeleteComment,
  handleBlockUser,
}: ICommentProps) => (
  <Box sx={{ mt: 11 }}>
    <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: "30px", md: "36px" } }} gutterBottom>
      Comments ({comments?.length})
    </Typography>
    {comments?.length ? (
      comments.map(({ _id, user_id, time, message }: IComment) => (
        <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 2 } }} key={_id}>
          <Avatar
            sx={{ width: { xs: 60, md: 76 }, height: { xs: 60, md: 76 } }}
            variant="rounded"
            alt="Remy Sharp"
            src={user_id?.image}
          />
          <Box sx={{ ml: 2, mr: { xs: 0, md: 5 }, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography color="primary" sx={{ mr: 2, fontSize: { xs: 16, md: 20 } }}>
                {user_id?.username}
              </Typography>
              <Typography sx={{ mr: 2, fontSize: { xs: 10, md: 12 } }} color="grey.600">
                {time}
              </Typography>
            </Box>
            <Box sx={{ fontSize: { xs: 14, md: 16 } }}>{message}</Box>
          </Box>
          <Box>
            <IconButton onClick={(event) => handleOpenMenu(event, user_id?._id, _id)}>{<MoreHorizIcon />}</IconButton>
            <Menu
              anchorEl={anchorElOption}
              open={openOption}
              sx={{ bottom: 0, left: "-30px" }}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={(event) => handleDeleteComment(event, commentId)}>Delete</MenuItem>
              <MenuItem sx={{ color: "red" }} onClick={() => handleBlockUser(userId, "blocked")}>
                Block user
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      ))
    ) : (
      <Box>No comments</Box>
    )}
  </Box>
);
