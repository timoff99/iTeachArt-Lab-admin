import React, { useState, createContext } from "react";

type IUserProviderProps = {
  children: JSX.Element | React.ReactNode;
};

export type IAuthUser = {
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
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const defaultValue = {
  user: null,
  setUser: () => {},
  search: "",
  setSearch: () => {},
};

export const UserContext = createContext<IUserContextProviderProps>(defaultValue);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [search, setSearch] = useState<string>("");
  return <UserContext.Provider value={{ user, setUser, search, setSearch }}>{children}</UserContext.Provider>;
};
