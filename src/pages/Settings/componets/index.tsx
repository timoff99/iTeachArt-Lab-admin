import React from "react";
import { Avatar, Box, Button, Paper, Skeleton, TextField, Typography } from "@mui/material";

import { IAuthUser } from "shared/ui-kit/UserProvider";
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
      target: HTMLInputElement[];
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {user.username && !personName ? (
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              flexDirection: { xs: "column", md: "row" },
              mb: 4,
            }}
          >
            <Typography sx={{ fontSize: "18px", mr: { xs: 0, md: 2 } }}>Name</Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "fontWeightBold", ml: { xs: 0, md: 10 } }}>
              {user.username}
            </Typography>
            <Button
              variant="text"
              sx={{
                ml: { xs: 0, md: 1 },
                alignItems: { xs: "flex-start", md: "center" },
                textTransform: "lowercase",
                fontSize: "16px",
                minWidth: { xs: 0, md: "auto" },
                p: { xs: 0, md: "6px 8px" },
              }}
              onClick={() => setPersonName((prev) => !prev)}
            >
              change
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="flex-start" flexWrap="wrap" mb={8} flexDirection="column">
            <Typography sx={{ fontSize: "18px", mr: { xs: 0, md: 2 } }}>Name</Typography>
            <Box
              component="form"
              onSubmit={saveNewUserInfo}
              sx={{ display: "flex", mr: { xs: 0, md: 5 }, flexDirection: { xs: "column", md: "row" } }}
            >
              <TextField
                sx={{
                  ml: 0,
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
              />
              <Box alignSelf="center" mt={{ xs: 1, md: 0 }}>
                <Button
                  variant="contained"
                  sx={{ ml: { xs: 0, md: 2 } }}
                  type="reset"
                  onClick={() => setPersonName((prev) => !prev)}
                >
                  Cancel
                </Button>
                <Button variant="contained" sx={{ ml: 2 }} type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {user.email && !personEmail ? (
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              flexDirection: { xs: "column", md: "row" },
              mb: 4,
            }}
          >
            <Typography sx={{ fontSize: "18px", mr: { xs: 0, md: 2 } }}>Email</Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "fontWeightBold", ml: { xs: 0, md: 10 } }}>
              {user.email}
            </Typography>
            <Button
              variant="text"
              sx={{
                ml: { xs: 0, md: 1 },
                alignItems: { xs: "flex-start", md: "center" },
                textTransform: "lowercase",
                fontSize: "16px",
                minWidth: { xs: 0, md: "auto" },
                p: { xs: 0, md: "6px 8px" },
              }}
              onClick={() => setPersonEmail((prev) => !prev)}
            >
              change
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="flex-start" flexWrap="wrap" mb={8} flexDirection="column">
            <Typography sx={{ fontSize: "18px", mr: { xs: 0, md: 2 } }}>Email</Typography>
            <Box
              component="form"
              onSubmit={saveNewUserInfo}
              sx={{ display: "flex", mr: { xs: 0, md: 5 }, flexDirection: { xs: "column", md: "row" } }}
            >
              <TextField
                sx={{
                  ml: 0,
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
                type="email"
                defaultValue={user.email}
              />
              <Box alignSelf="center" mt={{ xs: 1, md: 0 }}>
                <Button
                  variant="contained"
                  sx={{ ml: { xs: 0, md: 2 } }}
                  type="reset"
                  onClick={() => setPersonEmail((prev) => !prev)}
                >
                  Cancel
                </Button>
                <Button variant="contained" sx={{ ml: 2 }} type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {!personPassword ? (
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Typography sx={{ fontSize: "18px", mr: 2 }}>Password</Typography>

            <Button
              variant="outlined"
              sx={{ fontSize: "18px", ml: { xs: 0, md: 5 } }}
              onClick={() => setPersonPassword((prev) => !prev)}
            >
              Change password
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", mb: 8, flexDirection: "column" }}>
            <Typography sx={{ fontSize: "18px", mr: { xs: 0, md: 2 } }}>Password</Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
                mr: { xs: 0, md: 5 },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                sx={{
                  mb: { xs: 1, md: 0 },
                  ml: 0,
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
              />
              <TextField
                sx={{
                  ml: 0,
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
              />
              <Box display="flex" alignSelf="center" mt={{ xs: 1, md: 0 }}>
                <Button
                  variant="contained"
                  sx={{ ml: { xs: 0, md: 2 } }}
                  type="reset"
                  onClick={() => setPersonPassword((prev) => !prev)}
                >
                  Cancel
                </Button>
                <Button variant="contained" sx={{ ml: 2 }} type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
            {!formik.values.oldPassword && <Box color="red">{formik.errors.oldPassword}</Box>}
            {formik.values.oldPassword && !formik.values.newPassword && (
              <Box color="red">{formik.errors.newPassword}</Box>
            )}
            {formik.values.oldPassword && formik.values.newPassword && (
              <Box sx={{ color: "red", width: { xs: "auto", md: 600, lg: "auto" } }}>{formik.errors.newPassword}</Box>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  </>
);
