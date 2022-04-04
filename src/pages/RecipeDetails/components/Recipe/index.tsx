import { Box, Icon, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Location, NavigateFunction } from "react-router-dom";

interface IRecipeView {
  title: string | undefined;
  author: string | undefined;
  description: string | undefined;
  ingredients: string[] | undefined;
  steps: string[] | undefined;
  likes: number | undefined;
  comments: number | undefined;
  views: number | undefined;
  image: string | undefined;
  navigation: NavigateFunction;
  location: Location;
}

export const RecipeView = ({
  title,
  author,
  description,
  ingredients,
  steps,
  likes,
  comments,
  views,
  image,
  navigation,
  location,
}: IRecipeView) => (
  <>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        sx={{ color: "black", pl: 0 }}
        onClick={() => navigation(location.pathname.slice(0, location.pathname.lastIndexOf("/")))}
      >
        <Icon>
          <ArrowBackIcon sx={{ fontSize: { xs: "20px", md: "26px" } }} />
        </Icon>
      </IconButton>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: { xs: "20px", md: "26px" } }}>Return</Typography>
    </Box>

    <Box sx={{ mt: 5, mb: 11, display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      <Box
        component="img"
        sx={{
          borderRadius: "8px",
          maxWidth: { xs: "unset", md: "300px", lg: "400px" },
          maxHeight: { xs: "304px", md: "fit-content" },
          width: "100%",
          objectFit: "cover",
          mb: 2,
        }}
        alt="img"
        src={image}
      />
      <Box sx={{ ml: { md: 2, lg: 4 }, flex: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: "fontWeightBold", lineHeight: 1.167, fontSize: { xs: "30px", md: "53px" } }}>
            {title}
          </Typography>
          <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: "20px", md: "24px" } }} color="primary">
            {author}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 4 }}>
          <Box>
            <Typography sx={{ fontWeight: "fontWeightMedium" }} variant="h2" gutterBottom>
              Description
            </Typography>
            <Typography>{description}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "fontWeightMedium" }} gutterBottom>
              Directions
            </Typography>
            {ingredients?.map((el, index) => (
              <Box key={index}>
                <Typography
                  sx={{ fontWeight: "fontWeightBold", fontSize: { xs: "14", md: "16" }, display: "inline-block" }}
                >
                  Step {index + 1}:
                </Typography>{" "}
                <Typography sx={{ fontSize: { xs: "14", md: "16" }, display: "inline-block" }}>{el}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "fontWeightMedium" }} gutterBottom>
              Ingredients
            </Typography>
            {steps?.map((el, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    height: "5px",
                    width: "5px",
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                <Typography sx={{ fontSize: { xs: "14", md: "16" }, display: "inline-block", ml: 1 }}>{el}</Typography>
              </Box>
            ))}
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
    </Box>
  </>
);
