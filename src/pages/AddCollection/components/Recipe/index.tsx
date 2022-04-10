import { Box, Card, CardMedia, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { IRecipe } from "shared/interfaces/DetailsPage";

interface IRecipeView {
  recipes: IRecipe[];
}

export const RecipeView = ({ recipes }: IRecipeView) => (
  <>
    {recipes?.length &&
      recipes?.map(({ title, author, image, likes, comments, views }, index) => (
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            p: 2,
            mb: 2,
          }}
          key={index}
        >
          <CardMedia
            component="img"
            sx={{
              borderRadius: "8px",
              objectFit: "cover",
              mb: 2,
              maxWidth: { xs: "unset", md: "170px" },
              maxHeight: { xs: "190px", md: "96px" },
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
            <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: 24 }}>{title}</Typography>
            <Typography sx={{ fontSize: 12, mb: 2 }}>{author}</Typography>
            <Box sx={{ display: "flex", mt: 2, flexDirection: { xs: "column", md: "row" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: { xs: 0, md: 4 },
                  mb: { xs: 2, md: 0 },
                }}
              >
                <FavoriteBorderIcon sx={{ mr: 1, fontSize: 15 }} />
                <Typography sx={{ fontSize: 16 }}>{likes.length} likes</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: { xs: 0, md: 4 },
                  mb: { xs: 2, md: 0 },
                }}
              >
                <ChatBubbleOutlineIcon sx={{ mr: 1, fontSize: 15 }} />
                <Typography sx={{ fontSize: 16 }}>{comments.length} comments</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: { xs: 2, md: 0 },
                }}
              >
                <RemoveRedEyeOutlinedIcon sx={{ mr: 1, fontSize: 15 }} />
                <Typography sx={{ fontSize: 16 }}>{views} views</Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
  </>
);
