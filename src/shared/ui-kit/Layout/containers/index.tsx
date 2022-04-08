import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import debounce from "lodash/debounce";

import { ROUTE_NAMES } from "router/routeNames";
import UserService from "services/user.service";
import { CookiesType } from "shared/types/routes";
import { UserContext } from "shared/ui-kit/UserProvider";

import { LayoutView } from "../components";
import { queryKey } from "shared/types/reactQueryKey";

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}
export const LayoutContainer = (props: Props) => {
  const { user, setUser, setSearch } = useContext(UserContext);
  const navigation = useNavigate();

  const { isError } = useQuery(queryKey.getUser, () =>
    UserService.getUser().then((getUser) => setUser(getUser.data.user))
  );

  if (isError) {
    navigation(ROUTE_NAMES.LOGIN, { replace: true });
    throw new Error("user not found!");
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const logout = () => {
    Cookies.remove(CookiesType.token);
    handleCloseUserMenu();
    return navigation(ROUTE_NAMES.LOGIN, { replace: true });
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const debouncedChange = debounce((value) => {
    setSearch(value);
  }, 500);

  const handleChange = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> & {
        target: HTMLInputElement;
      }
    ) => {
      debouncedChange(e.target.value);
    },
    [debouncedChange]
  );

  return (
    <LayoutView
      handleDrawerToggle={handleDrawerToggle}
      handleOpenUserMenu={handleOpenUserMenu}
      handleCloseUserMenu={handleCloseUserMenu}
      logout={logout}
      anchorElUser={anchorElUser}
      container={container}
      mobileOpen={mobileOpen}
      user={user}
      handleChange={handleChange}
    />
  );
};
