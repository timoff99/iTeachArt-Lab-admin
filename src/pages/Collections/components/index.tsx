import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Grid, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Props {}

export const CollectionsView = () => {
  const lol = [1, 2, 3, 4, 5, 6, 7, 8];
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
          {lol.map((el, index) => (
            <Grid item xs={4} sm={4} md={6} lg={4} xl={3} key={index}>
              <Card
                sx={{
                  position: "relative",
                  pt: `${(540 / 600) * 100}%`,
                  borderRadius: 3,
                  background: `url(${"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"}) no-repeat center center / cover`,
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
                  >
                    <Typography sx={{ overflow: "hidden", height: "20px" }} fontWeight="fontWeightMedium">
                      Popular cookbooks of 2022 year
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
