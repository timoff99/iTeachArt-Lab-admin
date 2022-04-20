import { Box, Icon, IconButton, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { NavigateFunction } from "react-router-dom";

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
}: IRecipeView) => (
  <>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton sx={{ color: "black" }} onClick={() => navigation(-1)}>
        <Icon>
          <ArrowBackIcon sx={{ fontSize: { xs: 20, md: 26 } }} />
        </Icon>
      </IconButton>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: { xs: 20, md: 26 } }}>Return</Typography>
    </Box>

    <Box sx={{ mt: 5, mb: 11, display: "flex", flexDirection: { xs: "column", md: "column", lg: "row" } }}>
      {image ? (
        <Box
          component="img"
          sx={{
            borderRadius: "8px",
            maxWidth: { xs: "unset", md: "unset", lg: 400 },
            maxHeight: { xs: 304, md: 500, lg: "fit-content" },
            width: "100%",
            height: "100%",
            objectFit: "cover",
            mb: 2,
          }}
          alt="img"
          src={image}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: 5, p: 1, width: { xs: "auto", md: "40%" }, height: { xs: "300px", md: "500px" } }}
        />
      )}
      <Box sx={{ ml: { md: 2, lg: 4 }, flex: 1, maxWidth: "900px", overflow: "hidden" }}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: "fontWeightBold", lineHeight: 1.167, fontSize: { xs: 30, md: 53 } }}>
            {title ? title : <Skeleton width="100%" />}
          </Typography>
          <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 20, md: 24 } }} color="primary">
            {author ? author : <Skeleton width="100%" />}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 4 }}>
          <Box>
            <Typography sx={{ fontWeight: "fontWeightMedium" }} variant="h2" gutterBottom>
              Description
            </Typography>
            <Typography>
              {description ? (
                description
              ) : (
                <>
                  <Skeleton variant="text" width={400} sx={{ m: 1 }} />
                  <Skeleton variant="text" width={400} sx={{ m: 1 }} />
                </>
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column", lg: "row", xl: "row" },
            justifyContent: "space-between",
            flexWrap: "wrap",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 300, mb: 1 }}>
            <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: "fontWeightMedium" }} gutterBottom>
              Directions
            </Typography>
            {steps?.length
              ? steps?.map((el, index) => (
                  <Box key={index}>
                    <Typography
                      sx={{ fontWeight: "fontWeightBold", fontSize: { xs: 14, md: 16 }, display: "inline-block" }}
                    >
                      Step {index + 1}:
                    </Typography>{" "}
                    <Typography sx={{ fontSize: { xs: 14, md: 16 }, display: "inline-block" }}>{el}</Typography>
                  </Box>
                ))
              : null}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1, maxWidth: 300 }}>
            <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: "fontWeightMedium" }} gutterBottom>
              Ingredients
            </Typography>
            {ingredients?.length
              ? ingredients?.map((el, index) => (
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
                    <Typography sx={{ fontSize: { xs: 14, md: 16 }, display: "inline-block", ml: 1 }}>{el}</Typography>
                  </Box>
                ))
              : null}
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
