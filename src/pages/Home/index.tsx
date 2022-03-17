import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../router/routeNames";
import UserService from "../../services/user.service";

import { UserContext } from "../../shared/ui-kit/UserProvider";

export const Home = () => {
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

  return <div>Home</div>;
};
