import React from "react";
import { Avatar, Box, Button, Paper, Skeleton, TextField, Typography } from "@mui/material";

import { IAuthUser } from "shared/ui-kit/UserProvider";
import { FormPasswordData } from "shared/interfaces/Settings";
import { FormikHandlers, FormikState } from "formik";

interface ISettingsViewProps {
  personName: boolean;
  personEmail: boolean;
  personPassword: boolean;
  setPersonName: (value: React.SetStateAction<boolean>) => void;
  setPersonEmail: (value: React.SetStateAction<boolean>) => void;
  setPersonPassword: (value: React.SetStateAction<boolean>) => void;
  saveNewUserInfo: (
    e: React.KeyboardEvent<HTMLDivElement> & {
      target: HTMLInputElement;
    }
  ) => Promise<React.ReactText | undefined>;
  setImage: (e: React.ChangeEvent) => Promise<void>;
  user: IAuthUser;
  loading: boolean;
  formik: FormikState<any> & FormikHandlers;
}

export const SettingsView = ({
  personName,
  personEmail,
  personPassword,
  setPersonName,
  setPersonEmail,
  setPersonPassword,
  saveNewUserInfo,
  setImage,
  user,
  loading,
  formik,
}: ISettingsViewProps) => (
  <>
    <Typography sx={{ fontWeight: "fontWeightBold", fontSize: "22px" }} gutterBottom>
      Settings
    </Typography>
    <Paper sx={{ pl: { xs: 2, md: 5 }, py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="contained-button-file">
          <Box sx={{ display: "none" }} id="contained-button-file" component="input" type="file" onChange={setImage} />
          {!loading ? (
            <Avatar
              variant="circular"
              sx={{
                width: 126,
                height: 126,
                mr: 4,
              }}
              alt="userImage"
              src={user.image}
            />
          ) : (
            <Skeleton
              variant="circular"
              sx={{
                width: 126,
                height: 126,
                mr: 4,
              }}
            />
          )}
        </label>
        <Box>
          <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: "36px" }}>{user.username}</Typography>
          <Typography sx={{ fontSize: "24px" }}>{user.roles.value}</Typography>
        </Box>
      </Box>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: "24px", mb: 4, mt: 4 }}>
        Personal information
      </Typography>
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", mb: 4 }}>
          <Typography sx={{ fontSize: "18px", mr: 2 }}>Name</Typography>
          {user.username && !personName ? (
            <Typography sx={{ fontSize: "18px", ml: 5 }}>{user.username}</Typography>
          ) : (
            <TextField
              sx={{
                ml: 5,
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
              }}
              name="username"
              defaultValue={user.username}
              onKeyPress={saveNewUserInfo}
            />
          )}
          <Button
            variant="text"
            sx={{ ml: 1, alignItems: "center", textTransform: "lowercase", fontSize: "16px" }}
            onClick={() => setPersonName((prev) => !prev)}
          >
            change
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", mb: 4 }}>
          <Typography sx={{ fontSize: "18px", mr: 2 }}>Email</Typography>
          {user.email && !personEmail ? (
            <Typography sx={{ fontSize: "18px", ml: 5 }}>{user.email}</Typography>
          ) : (
            <TextField
              sx={{
                ml: 5,
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
              }}
              name="email"
              defaultValue={user.email}
              onKeyPress={saveNewUserInfo}
            />
          )}
          <Button
            variant="text"
            sx={{ ml: 1, alignItems: "center", textTransform: "lowercase", fontSize: "16px" }}
            onClick={() => setPersonEmail((prev) => !prev)}
          >
            change
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Typography sx={{ fontSize: "18px", mr: 2 }}>Password</Typography>
          {!personPassword ? (
            <Button
              variant="outlined"
              sx={{ fontSize: "18px", ml: { xs: 0, md: 5 } }}
              onClick={() => setPersonPassword((prev) => !prev)}
            >
              Change password
            </Button>
          ) : (
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start" },
                flexDirection: { xs: "column" },
              }}
            >
              <TextField
                sx={{
                  ml: { xs: 0 },
                  mb: { xs: 2 },
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
                }}
                placeholder="Old Password"
                name="oldPassword"
                onChange={formik.handleChange}
                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              />

              <TextField
                sx={{
                  ml: { xs: 0 },
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
                }}
                placeholder="New Password"
                name="newPassword"
                onChange={formik.handleChange}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
              />

              <Button type="submit" sx={{ alignSelf: "center" }}>
                submit
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  </>
);
