import { NavigateFunction } from "react-router-dom";
import { Box, Icon, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

interface ICookbookView {
  title: string;
  author: string;
  description: string;
  likes: number;
  comments: number;
  views: number;
  image: string;
  navigation: NavigateFunction;
}

export const CookbookView = ({
  title,
  author,
  description,
  likes,
  comments,
  views,
  image,
  navigation,
}: ICookbookView) => (
  <>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton sx={{ color: "black", pl: 0 }} onClick={() => navigation(-1)}>
        <Icon>
          <ArrowBackIcon sx={{ fontSize: { xs: 20, md: 26 } }} />
        </Icon>
      </IconButton>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: { xs: 20, md: 26 } }}>Return</Typography>
    </Box>

    <Box sx={{ mt: 5, mb: 11 }}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: "fontWeightBold", lineHeight: 1.167, fontSize: { xs: 30, md: 53 } }}>
          {title}
        </Typography>
        <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 20, md: 24 } }} color="primary">
          {author}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 4 }}>
        <Box
          component="img"
          sx={{
            borderRadius: "8px",
            maxWidth: { xs: "unset", md: "300px", lg: "400px" },
            maxHeight: "304px",
            width: "100%",
            objectFit: "cover",
            mb: 2,
          }}
          alt="img"
          src={image}
        />
        <Box sx={{ ml: { md: 2, lg: 4 } }}>
          <Typography sx={{ fontWeight: "fontWeightMedium" }} variant="h2" gutterBottom>
            Description
          </Typography>
          <Typography>{description}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, mb: { xs: 2, md: 0 } }}>
          <FavoriteBorderIcon sx={{ mr: 2 }} />
          <Typography variant="h4">{likes} likes</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, mb: { xs: 2, md: 0 } }}>
          <ChatBubbleOutlineIcon sx={{ mr: 2 }} />
          <Typography variant="h4">{comments} comments</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, mb: { xs: 2, md: 0 } }}>
          <RemoveRedEyeOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h4">{views} views</Typography>
        </Box>
      </Box>
    </Box>
  </>
);
