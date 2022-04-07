import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { IAuthUser } from "shared/ui-kit/UserProvider";
import { FormPasswordData } from "shared/interfaces/Settings";

interface ISettingsViewProps {
  personName: boolean;
  personEmail: boolean;
  personPassword: boolean;
  handleOpenNameInput: () => void;
  handleOpenEmailInput: () => void;
  handleOpenPasswordInput: () => void;
  saveNewUserInfo: (
    e: React.KeyboardEvent<HTMLDivElement> & {
      target: HTMLInputElement;
    }
  ) => Promise<React.ReactText | undefined>;
  saveNewUserPassword: (
    e: React.KeyboardEvent<HTMLDivElement> & {
      target: HTMLInputElement;
    }
  ) => Promise<React.ReactText | undefined>;
  setChangePassword: React.Dispatch<React.SetStateAction<FormPasswordData | null>>;
  setImage: (e: React.ChangeEvent) => Promise<void>;
  user: IAuthUser;
}

export const SettingsView = ({
  personName,
  personEmail,
  personPassword,
  handleOpenNameInput,
  handleOpenEmailInput,
  handleOpenPasswordInput,
  saveNewUserInfo,
  saveNewUserPassword,
  setChangePassword,
  setImage,
  user,
}: ISettingsViewProps) => (
  <>
    <Typography sx={{ fontWeight: "fontWeightBold", fontSize: "22px" }} gutterBottom>
      Settings
    </Typography>
    <Paper sx={{ pl: { xs: 2, md: 5 }, py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="contained-button-file">
          <Box sx={{ display: "none" }} id="contained-button-file" component="input" type="file" onChange={setImage} />
          <Box
            component="img"
            sx={{
              borderRadius: "50%",
              maxWidth: { xs: "72px", md: "126px" },
              maxHeight: "126px",
              width: "100%",
              objectFit: "cover",
              cursor: "pointer",
              mr: 4,
            }}
            alt="userImage"
            src={user.image}
          />
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
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
            onClick={handleOpenNameInput}
          >
            change
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
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
            onClick={handleOpenEmailInput}
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
              onClick={handleOpenPasswordInput}
            >
              Change password
            </Button>
          ) : (
            <Box
              component="form"
              onSubmit={saveNewUserPassword}
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                sx={{
                  ml: { xs: 0, md: 5 },
                  mb: { xs: 2, md: 0 },
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
                onKeyPress={saveNewUserInfo}
                onChange={(e) => setChangePassword((prev) => ({ ...prev, oldPassword: e.target.value }))}
              />

              <TextField
                sx={{
                  ml: { xs: 0, md: 5 },
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
                onKeyPress={saveNewUserInfo}
                onChange={(e) => setChangePassword((prev) => ({ ...prev, newPassword: e.target.value }))}
              />

              <Button type="submit" sx={{ alignSelf: "center" }}>
                submit
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
    <ToastContainer theme="colored" />
  </>
);
