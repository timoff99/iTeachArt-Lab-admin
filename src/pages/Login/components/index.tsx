import React, { FC } from "react";
import { FormikHandlers, FormikState } from "formik";
import { Box, Button, Grid, Paper, TextField, InputLabel, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { ReactComponent as Logo } from "static/icons/Logo.svg";
import loginBg from "static/images/loginBg.png";

interface ILoginViewProps {
  formik: FormikState<any> & FormikHandlers;
}

const inputStyle = {
  "& .MuiInputBase-root": {
    height: 45,
    borderRadius: 2,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderWidth: 1,
      borderColor: "text.disabled",
    },
  },
};

const boxStyle = { background: `url(${loginBg}) no-repeat`, backgroundSize: "cover", height: "100vh" };

const parerStyle = { padding: 70, margin: "100px auto", borderRadius: "16px" };

export const LoginView: FC<ILoginViewProps> = ({ formik }) => {
  return (
    <Box style={boxStyle}>
      <Grid container>
        <Paper elevation={0} style={parerStyle}>
          <Logo />
          <Typography variant="h2" mt={5}>
            Login to Admin panel
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "500px" }}>
            <InputLabel sx={{ mt: "50px", mb: "8px" }}>Email</InputLabel>
            <TextField
              sx={{ ...inputStyle }}
              fullWidth
              placeholder="example@gmail.com"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <InputLabel sx={{ mt: "40px", mb: "8px" }}>Password</InputLabel>
            <TextField
              sx={{ ...inputStyle }}
              fullWidth
              placeholder="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button sx={{ mt: "70px", height: 48 }} type="submit" fullWidth size="large" variant="contained">
              <Typography variant="h4" component="span" sx={{ fontWeight: "medium", textTransform: "capitalize" }}>
                Login
              </Typography>
            </Button>
          </form>
        </Paper>
      </Grid>
      <ToastContainer theme="colored" />
    </Box>
  );
};
