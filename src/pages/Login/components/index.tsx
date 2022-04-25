import { FormikHandlers, FormikState } from "formik";
import { Box, Grid, Paper, TextField, InputLabel, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer } from "react-toastify";

import { ReactComponent as Logo } from "static/icons/Logo.svg";
import loginBg from "static/images/loginBg.png";

interface ILoginViewProps {
  formik: FormikState<any> & FormikHandlers;
  loading: boolean;
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

const parerStyle = {
  padding: { xs: "30px", md: "70px" },
  margin: "100px auto",
  borderRadius: "16px",
  width: "100%",
  maxWidth: { xs: 560, md: 640 },
  minWidth: 240,
};

export const LoginView = ({ formik, loading }: ILoginViewProps) => {
  return (
    <Box style={boxStyle}>
      <Grid container>
        <Paper elevation={0} sx={parerStyle}>
          <Logo />
          <Typography variant="h2" mt={5}>
            Login to Admin panel
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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

            <LoadingButton
              sx={{ mt: "70px", height: 48 }}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              loading={loading}
            >
              <Typography variant="h4" component="span" sx={{ fontWeight: "medium", textTransform: "capitalize" }}>
                Login
              </Typography>
            </LoadingButton>
          </form>
        </Paper>
      </Grid>
      <ToastContainer theme="colored" position="bottom-right" />
    </Box>
  );
};
