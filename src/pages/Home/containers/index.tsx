import React, { useState } from "react";

import { userData } from "../../../shared/interfaces/UserTable";
import { HomeView } from "../components";

import UserService from "../../../services/user.service";

export const HomeContainer: React.FC = () => {
  const [value, setValue] = useState(0);
  const [allUsers, setAllUsers] = useState<userData[] | []>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TryGetAllUser = async (user_status?: string) => {
    try {
      let getAllUser;
      if (user_status) {
        getAllUser = await UserService.getAllUsers(user_status);
      } else {
        getAllUser = await UserService.getAllUsers();
      }
      setAllUsers(getAllUser.data.allUsers);
    } catch (error) {
      console.log(error);
    }
  };
  return <HomeView value={value} handleChange={handleChange} TryGetAllUser={TryGetAllUser} allUsers={allUsers} />;
};
