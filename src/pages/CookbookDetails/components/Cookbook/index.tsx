import { NavigateFunction } from "react-router-dom";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

interface ICookbookView {
  title: string | undefined;
  author: string | undefined;
  description: string | undefined;
  likes: number | undefined;
  comments: number | undefined;
  views: number | undefined;
  image: string | undefined;
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
      <IconButton sx={{ color: "black" }} onClick={() => navigation(-1)}>
        <ArrowBackIcon sx={{ fontSize: { xs: 20, md: 26 } }} />
      </IconButton>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: { xs: 20, md: 26 } }}>Return</Typography>
    </Box>

    <Box sx={{ mt: 5, mb: 11 }}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: "fontWeightBold", lineHeight: 1.167, fontSize: { xs: 30, md: 53 } }}>
          {title ? title : <Skeleton width={500} />}
        </Typography>
        <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 20, md: 24 } }} color="primary">
          {author ? author : <Skeleton width={500} />}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 4 }}>
        {image ? (
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
        ) : (
          <Skeleton variant="rectangular" width={400} height={200} sx={{ borderRadius: 5, p: 1 }} />
        )}
        <Box sx={{ ml: { md: 2, lg: 4 } }}>
          <Typography sx={{ fontWeight: "fontWeightMedium" }} variant="h2" gutterBottom>
            Description
          </Typography>
          <Typography>
            {description ? (
              description
            ) : (
              <>
                <Skeleton variant="rectangular" sx={{ m: 1 }} />
                <Skeleton variant="rectangular" sx={{ m: 1 }} />
              </>
            )}
          </Typography>
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
