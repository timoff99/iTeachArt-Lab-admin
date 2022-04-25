import moment from "moment-timezone";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
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
  openDialog,
  handleCloseDialog,
  handleClickOpenDialog,
}: ICommentProps) => (
  <Box sx={{ mt: 11 }}>
    <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 30, md: 36 } }} gutterBottom>
      Comments ({comments.length})
    </Typography>
    {comments.length ? (
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
                {moment(time).fromNow()}
              </Typography>
            </Box>
            <Box sx={{ fontSize: { xs: 14, md: 16 } }}>{message}</Box>
          </Box>
          <Box>
            <IconButton onClick={(event) => handleOpenMenu(event, user_id?._id, _id)}>{<MoreHorizIcon />}</IconButton>
          </Box>
        </Box>
      ))
    ) : (
      <Box>No comments</Box>
    )}
    <Menu anchorEl={anchorElOption} open={openOption} sx={{ bottom: 0, left: "-30px" }} onClose={handleCloseMenu}>
      <MenuItem onClick={handleClickOpenDialog}>Delete</MenuItem>
      <MenuItem sx={{ color: "red" }} onClick={() => handleBlockUser(userId, "blocked")}>
        Block user
      </MenuItem>
    </Menu>

    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontSize: "30px" }}>{"Delete collection"}</DialogTitle>
      <DialogContent sx={{ alignSelf: "center" }}>
        <DialogContentText sx={{ textAlign: "center", fontSize: "20px" }}>Are you sure?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button
          onClick={(event) => {
            handleDeleteComment(event, commentId);
            handleCloseDialog();
            handleCloseMenu(event);
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
);
