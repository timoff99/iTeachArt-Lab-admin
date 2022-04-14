import { AxiosResponse } from "axios";
import { UseMutationResult } from "react-query";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { IRecipe } from "shared/interfaces/DetailsPage";

interface ICardsView {
  cards: IRecipe[];
  collectionId: string;
  cloudinaryId: string;
  type: string;
  deleteCookbookCollectionFiledMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      collection_id: string;
      cloudinary_id: string;
      collection_filed_id: string;
    },
    unknown
  >;
  deleteRecipeCollectionFiledMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      collection_id: string;
      cloudinary_id: string;
      collection_filed_id: string;
    },
    unknown
  >;
}

export const CardsView = ({
  cards,
  collectionId,
  cloudinaryId,
  type,
  deleteCookbookCollectionFiledMutation,
  deleteRecipeCollectionFiledMutation,
}: ICardsView) => {
  return (
    <>
      {cards?.length &&
        cards?.map(({ _id, title, author, description, image, likes, comments, views }, index) => (
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "column", md: "row" } }}
            key={_id}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "flex-start" },
                p: 2,
                mb: 2,
                mt: { xs: 4, md: 0 },
                mr: { md: 3, lg: 5 },
                flex: 1,
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
                <Typography sx={{ fontSize: 12 }}>{description}</Typography>
                <Typography sx={{ fontSize: 12, mb: 2 }}>{author}</Typography>
                <Box sx={{ display: "flex", mt: 2, flexDirection: { xs: "column", md: "row" } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: { xs: 0, md: 2, lg: 4 },
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <FavoriteBorderIcon sx={{ mr: 1, fontSize: { sx: 15, md: 12, lg: 15 } }} />
                    <Typography sx={{ fontSize: { sx: 16, md: 12, lg: 16 } }}>{likes.length} likes</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: { xs: 0, md: 2, lg: 4 },
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <ChatBubbleOutlineIcon sx={{ mr: 1, fontSize: { sx: 15, md: 12, lg: 15 } }} />
                    <Typography sx={{ fontSize: { sx: 16, md: 12, lg: 16 } }}>{comments.length} comments</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon sx={{ mr: 1, fontSize: { sx: 15, md: 12, lg: 15 } }} />
                    <Typography sx={{ fontSize: { sx: 16, md: 12, lg: 16 } }}>{views} views</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                if (type === "cookbook") {
                  return deleteCookbookCollectionFiledMutation.mutate({
                    collection_id: collectionId,
                    cloudinary_id: cloudinaryId,
                    collection_filed_id: _id,
                  });
                } else if (type === "recipe") {
                  return deleteRecipeCollectionFiledMutation.mutate({
                    collection_id: collectionId,
                    cloudinary_id: cloudinaryId,
                    collection_filed_id: _id,
                  });
                }
              }}
            >
              <Typography>Remove</Typography>
            </Button>
          </Box>
        ))}
    </>
  );
};
