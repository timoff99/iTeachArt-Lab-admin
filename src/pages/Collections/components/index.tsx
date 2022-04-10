import React from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { UseMutationResult } from "react-query";
import { Box, Button, Card, Grid, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface CollectionViewProps {
  cookbookCollection: {
    _id: string;
    title: string;
    image: string;
    cloudinary_id: string;
    collection: string[];
  }[];
  deleteCookbookCollectionMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      collection_id: string;
      cloudinary_id: string;
    },
    unknown
  >;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

export const CollectionsView = ({
  cookbookCollection,
  deleteCookbookCollectionMutation,
  setId,
}: CollectionViewProps) => {
  const navigation = useNavigate();
  return (
    <Box>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22 }} gutterBottom>
        Collections
      </Typography>
      <Paper sx={{ p: { xs: 5, sm: 3, md: 6 } }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12, lg: 12, xl: 12 }}>
          <Grid item xs={4} sm={4} md={6} lg={4} xl={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <IconButton
                sx={{ background: (theme) => theme.palette.grey[200], minWidth: 80, minHeight: 80 }}
                disableRipple
                onClick={() => navigation("add")}
              >
                <AddIcon fontSize="large" />
              </IconButton>
              <Typography fontSize={20} sx={{ mt: 1 }}>
                Add collection
              </Typography>
            </Box>
          </Grid>
          {cookbookCollection &&
            cookbookCollection.map(({ _id, title, image, cloudinary_id }) => (
              <Grid item xs={4} sm={4} md={6} lg={4} xl={3} key={_id}>
                <Card
                  sx={{
                    position: "relative",
                    pt: `${(540 / 600) * 100}%`,
                    borderRadius: 3,
                    background: `url(${image}) no-repeat center center / cover`,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        p: "8px 12px",
                        background: "white",
                        alignSelf: "flex-end",
                        mb: 3,
                        ml: 3,
                      }}
                      onClick={() => {
                        setId(_id);
                      }}
                    >
                      <Typography sx={{ overflow: "hidden", height: "20px" }} fontWeight="fontWeightMedium">
                        {title}
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        p: 1,
                        mt: 2,
                        mr: 2,
                        ml: "auto",
                        borderRadius: "50%",
                        alignSelf: "flex-start",
                        background: "white",
                        minWidth: 40,
                      }}
                      onClick={() => deleteCookbookCollectionMutation.mutate({ collection_id: _id, cloudinary_id })}
                    >
                      <DeleteIcon sx={{ color: "black" }} />
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );
};
