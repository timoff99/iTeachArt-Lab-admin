import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import {
  Avatar,
  Button,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Skeleton,
  Slide,
  styled,
  useScrollTrigger,
  ListItemButton,
  Typography,
  Toolbar,
  ListItemText,
  List,
  IconButton,
  Drawer,
  CssBaseline,
  Box,
  AppBar,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import { ReactComponent as Logo } from "static/icons/Dashboard-logo.svg";
import { menu } from "../mockData";

import { UserContext } from "shared/ui-kit/UserProvider";

interface Scroll {
  window?: () => Window;
  children: React.ReactElement;
}
const drawerWidth = 240;

const UserProfile = () => {
  const context = useContext(UserContext);

  return (
    <Box sx={{ display: "flex", backgroundColor: "common.white", borderRadius: "10px", pr: 2 }}>
      {context?.user ? (
        <>
          <Avatar alt="Remy Sharp" src={context?.user?.image} variant="rounded" sx={{ width: 56, height: 56 }} />
          <Box sx={{ display: "flex", flexDirection: "column", ml: 2, justifyContent: "center" }}>
            <Typography color="black">{context?.user?.username}</Typography>
            <Typography color="grey.600" fontSize={14}>
              {context?.user?.roles.value}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" width={50} height={50} />
          <Box sx={{ display: "flex", flexDirection: "column", ml: 2, justifyContent: "center" }}>
            <Skeleton width={50} />
            <Skeleton />
          </Box>
        </>
      )}
    </Box>
  );
};

function HideOnScroll(props: Scroll) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  width: "100%",

  backgroundColor: "white",
  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.06)",
  [theme.breakpoints.up("sm")]: {
    marginRight: 10,
  },
  [theme.breakpoints.up("md")]: {
    marginRight: 60,
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "56px",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));
const UserProfileWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginRight: 0,
  },
  [theme.breakpoints.up("md")]: {
    marginRight: 16,
  },
}));

interface Props {
  window?: () => Window;
}

interface IHomeViewProps {
  handleDrawerToggle: () => void;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  anchorElUser: HTMLElement | null;
  container: (() => HTMLElement) | undefined;
  mobileOpen: boolean;
}

export const LayoutView = (
  { handleDrawerToggle, handleOpenUserMenu, handleCloseUserMenu, anchorElUser, container, mobileOpen }: IHomeViewProps,
  props: Props
) => {
  const drawer = (
    <div>
      <Toolbar>
        <Logo />
      </Toolbar>
      <List>
        {menu.map(({ text, Icon, href }) => (
          <ListItemButton key={text} component={Link} href={href}>
            <ListItemIcon>
              {
                <Icon
                  color={
                    href === location.pathname ||
                    href === location.pathname.slice(0, location.pathname.lastIndexOf("/"))
                      ? "primary"
                      : "inherit"
                  }
                />
              }
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{
                "&	.MuiListItemText-primary": {
                  color:
                    href === location.pathname ||
                    href === location.pathname.slice(0, location.pathname.lastIndexOf("/"))
                      ? "primary.main"
                      : "inherit",
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "-webkit-box", bgcolor: "grey.100" }}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ mt: 5 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" />
            </Search>

            <UserProfileWrapper>
              <Button onClick={handleOpenUserMenu}>
                <UserProfile />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{ width: "100%" }}>
                    Log out
                  </Typography>
                </MenuItem>
              </Menu>
            </UserProfileWrapper>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, height: "100vh", flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, pt: 5, pl: 2 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, pt: 5, pl: 2 },
            "& .MuiPaper-root": { borderRight: 0 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={{ mt: 5 }} />
        <Outlet />
      </Box>
    </Box>
  );
};
