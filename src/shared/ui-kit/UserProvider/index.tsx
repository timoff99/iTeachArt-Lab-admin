import React, { useState, createContext } from "react";

type IUserProviderProps = {
  children: JSX.Element | React.ReactNode;
};

type IAuthUser = {
  _id: string;
  email: string;
  password: string;
  username: string;
  roles: {
    _id: string;
    value: string;
  };
  cloudinary_id: string;
  image: string;
  status: string;
};

export type IUserContextProviderProps = {
  user: IAuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<IAuthUser | null>>;
};

export const UserContext = createContext<IUserContextProviderProps | null>(null);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
