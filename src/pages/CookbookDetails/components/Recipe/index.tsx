import { Box, Card, CardMedia, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { IRecipe } from "shared/interfaces/DetailsPage";

interface IRecipeView {
  recipes: IRecipe[] | undefined;
}

export const RecipeView = ({ recipes }: IRecipeView) => (
  <Box>
    <Box>
      <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: "30px", md: "36px" } }} gutterBottom>
        Recipes
      </Typography>
    </Box>
    {recipes?.length ? (
      recipes?.map(({ title, author, description, image, likes, comments, views }, index) => (
        <Card
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", p: 2, mb: 2 }}
          key={index}
        >
          <CardMedia
            component="img"
            sx={{
              borderRadius: "8px",
              objectFit: "cover",
              mb: 2,
              maxWidth: { xs: "unset", md: "254px" },
              maxHeight: "178px",
              width: "100%",
            }}
            src={image}
            alt="green iguana"
          />
          <Box
            sx={{
              ml: 2,
              flex: 1,
              display: { xs: "flex", md: "block" },

              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "none" },
            }}
          >
            <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: "24px" }}>{title}</Typography>
            <Typography sx={{ fontSize: "12px", mb: 2 }}>{author}</Typography>
            <Typography sx={{ fontSize: "14px" }}>{description}</Typography>
            <Box sx={{ display: "flex", mt: 2, flexDirection: { xs: "column", md: "row" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  mb: { xs: 2, md: 0 },
                }}
              >
                <FavoriteBorderIcon sx={{ mr: 1, fontSize: 15 }} />
                <Typography sx={{ fontSize: 16 }}>{likes?.length} likes</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  mb: { xs: 2, md: 0 },
                }}
              >
                <ChatBubbleOutlineIcon sx={{ mr: 1, fontSize: 15 }} />
                <Typography sx={{ fontSize: 16 }}>{comments?.length} comments</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  mb: { xs: 2, md: 0 },
                }}
              >
                <RemoveRedEyeOutlinedIcon sx={{ mr: 1, fontSize: 15 }} />
                <Typography sx={{ fontSize: 16 }}>{views} views</Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      ))
    ) : (
      <Box>NO Recipes</Box>
    )}
  </Box>
);
