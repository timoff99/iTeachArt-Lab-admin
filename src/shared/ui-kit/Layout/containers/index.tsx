import React, { FC, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_NAMES } from "router/routeNames";
import UserService from "services/user.service";
import { UserContext } from "shared/ui-kit/UserProvider";

import { LayoutView } from "../components";

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}
export const LayoutContainer: FC = (props: Props) => {
  const context = useContext(UserContext);
  const navigation = useNavigate();

  const TryGetUser = async () => {
    if (!context?.user?.username) {
      try {
        const getUser = await UserService.getUser();
        context?.setUser(getUser.data.user);
      } catch (error) {
        return navigation(ROUTE_NAMES.LOGIN, { replace: true });
      }
    }
  };

  useEffect(() => {
    TryGetUser();
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <LayoutView
      handleDrawerToggle={handleDrawerToggle}
      handleOpenUserMenu={handleOpenUserMenu}
      handleCloseUserMenu={handleCloseUserMenu}
      anchorElUser={anchorElUser}
      container={container}
      mobileOpen={mobileOpen}
    />
  );
};
