import React from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { UseMutationResult } from "react-query";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
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
  deleteRecipeCollectionMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      collection_id: string;
      cloudinary_id: string;
    },
    unknown
  >;
  setId: React.Dispatch<React.SetStateAction<string>>;
  collectionType: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleClickOpenDialog: () => void;
  dialogValue: {
    collection_id: string;
    cloudinary_id: string;
  };

  setDialogValue: React.Dispatch<
    React.SetStateAction<{
      collection_id: string;
      cloudinary_id: string;
    }>
  >;
  currentCollectionType: string;
  setCurrentCollectionType: React.Dispatch<React.SetStateAction<string>>;
}

export const CollectionsView = ({
  cookbookCollection,
  deleteCookbookCollectionMutation,
  deleteRecipeCollectionMutation,
  setId,
  collectionType,
  setCurrentId,
  openDialog,
  handleCloseDialog,
  handleClickOpenDialog,
  dialogValue,
  setDialogValue,
  currentCollectionType,
  setCurrentCollectionType,
}: CollectionViewProps) => {
  const navigation = useNavigate();
  return (
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
              onClick={() => navigation(`add/${collectionType}`)}
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
                  pt: { xs: `${(200 / 300) * 100}%`, md: `${(540 / 600) * 100}%` },
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
                      setCurrentId(_id);
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
                    onClick={() => {
                      handleClickOpenDialog();
                      setDialogValue({ collection_id: _id, cloudinary_id });
                      setCurrentCollectionType(collectionType);
                    }}
                  >
                    <DeleteIcon sx={{ color: "black" }} />
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ textAlign: "center", fontSize: "30px" }}>{"Delete collection"}</DialogTitle>
          <DialogContent sx={{ alignSelf: "center" }}>
            <DialogContentText sx={{ textAlign: "center", fontSize: "20px" }}>Are you sure?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>No</Button>
            <Button
              onClick={() => {
                console.log(currentCollectionType);
                if (currentCollectionType === "cookbook") {
                  deleteCookbookCollectionMutation.mutate(dialogValue);
                } else {
                  deleteRecipeCollectionMutation.mutate(dialogValue);
                }
                handleCloseDialog();
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Paper>
  );
};
