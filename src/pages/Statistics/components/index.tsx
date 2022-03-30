import React, { FC } from "react";
import { Avatar, Box, Card, CardMedia, Grid, Typography } from "@mui/material";

interface Props {
  statistics: Array<{ title: string; value: number }>;
  userStatistics: Array<{ title: string; value: number }>;
  mostActiveUserStatistics: Array<{ image: string; username: string; value: number; type: string }>;
  cardsStatistics: Array<{ title: string; views: number; image: string; cardName: string; author: string }>;
}

export const StatisticsView: FC<Props> = ({
  statistics,
  userStatistics,
  mostActiveUserStatistics,
  cardsStatistics,
}) => {
  return (
    <Box>
      <Typography fontWeight="fontWeightBold" fontSize={22} gutterBottom>
        Statistics
      </Typography>
      <Grid container spacing={3} columns={10}>
        {statistics.length > 0 &&
          statistics.map(({ title, value }, index) => (
            <Grid item key={index}>
              <Card sx={{ borderRadius: 5, p: 1, width: "196px" }}>
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: 18 }} fontWeight="fontWeightBold" gutterBottom>
                    {title}
                  </Typography>
                  <Typography>{value}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={3} columns={10}>
        <Grid item sx={{ mt: 3 }}>
          <Card sx={{ borderRadius: 5, p: 1, minWidth: "196px" }}>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ fontSize: 20 }} fontWeight="fontWeightBold" gutterBottom>
                Users
              </Typography>
              {userStatistics.map(({ title, value }, index) => (
                <Box sx={{ display: "flex", justifyContent: "space-between" }} key={index}>
                  <Typography gutterBottom>{title}</Typography>
                  <Typography>{value}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item sx={{ mt: 3 }} xs={12} sm={12} md={4}>
          <Card sx={{ borderRadius: 5, p: 1 }}>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ fontSize: 20 }} fontWeight="fontWeightBold" gutterBottom>
                Most active users
              </Typography>
              {mostActiveUserStatistics.map(({ image, username, value, type }, index) => (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }} key={index}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src={image} />
                    <Typography sx={{ ml: 2 }}>{username}</Typography>
                  </Box>
                  <Typography sx={{ ml: 6 }}>
                    {value} {type}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} columns={10}>
        {cardsStatistics.map(({ title, views, image, cardName, author }, index) => (
          <Grid item sx={{ mt: 3 }} key={index} xs={12} sm={12} md={3}>
            <Card sx={{ borderRadius: 5, p: 1 }}>
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom sx={{ fontSize: "20px", fontWeight: "fontWeightBold" }}>
                  {title}
                </Typography>
                <Typography>{views}</Typography>
                <CardMedia component="img" height="140" sx={{ borderRadius: "8px" }} image={image} alt="green iguana" />
                <Typography sx={{ mt: 1, fontSize: "20px", fontWeight: "fontWeightMedium" }}>{cardName}</Typography>
                <Typography sx={{ fontSize: "12px" }}>{author}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
