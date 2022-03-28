import React, { useEffect, useState } from "react";

import UserService from "../../../../services/user.service";
import { userData } from "../../../../shared/interfaces/UserTable";
import { Order } from "../../../../shared/types/userTable";

import { UserTableView } from "../components";

export const UserTableContainer = ({
  allUsers,
  TryGetAllUser,
}: {
  allUsers: userData[];
  TryGetAllUser: () => Promise<void>;
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof userData>("username");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const openOption = Boolean(anchorElOption);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, _id: string) => {
    setAnchorElOption(event.currentTarget);
    setUserId(_id);
  };
  const handleCloseMenu = () => {
    setAnchorElOption(null);
  };

  useEffect(() => {
    TryGetAllUser();
  }, []);

  const handleUpdateUserStatus = async (_id: string, user_status: string) => {
    await UserService.updateUserStatus(_id, user_status);
    TryGetAllUser();
    handleCloseMenu();
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof userData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0;

  return (
    <UserTableView
      order={order}
      orderBy={orderBy}
      handleRequestSort={handleRequestSort}
      allUsers={allUsers}
      page={page}
      rowsPerPage={rowsPerPage}
      handleOpenMenu={handleOpenMenu}
      anchorElOption={anchorElOption}
      openOption={openOption}
      handleCloseMenu={handleCloseMenu}
      handleUpdateUserStatus={handleUpdateUserStatus}
      userId={userId}
      emptyRows={emptyRows}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};
