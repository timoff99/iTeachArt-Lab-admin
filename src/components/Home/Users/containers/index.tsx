import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "router/routeNames";

import UserService from "services/user.service";
import { userData } from "shared/interfaces/UserTable";
import { queryKey } from "shared/types/reactQueryKey";
import { Order } from "shared/types/table";
import { UserContext } from "shared/ui-kit/UserProvider";

import { UserTableView } from "../components";

export const UserTableContainer = ({ status }: { status: string }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof userData>("username");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const { search } = useContext(UserContext);
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: allUsers,
  } = useQuery(
    [queryKey.allUsers, status, order, orderBy, search],
    () => UserService.getAllUsers(search, status, order, orderBy).then((getAllUser) => getAllUser.data.allUsers),
    {
      keepPreviousData: true,
    }
  );
  if (isError) {
    navigation(ROUTE_NAMES.LOGIN, { replace: true });
  }

  const openOption = Boolean(anchorElOption);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: string) => {
    setAnchorElOption(event.currentTarget);
    setUserId(_id);
  };
  const handleCloseMenu = () => {
    setAnchorElOption(null);
  };

  const UpdateStatusMutation = useMutation(
    ({ _id, user_status }: { _id: string; user_status: string }) => UserService.updateUserStatus(_id, user_status),
    {
      onSettled: () => queryClient.invalidateQueries(queryKey.allUsers),
    }
  );

  const handleUpdateUserStatus = (_id: string, user_status: string) => {
    UpdateStatusMutation.mutate({ _id, user_status });
    handleCloseMenu();
  };

  const handleRequestSort = (property: keyof userData) => {
    const isAsc = orderBy === property && order === "asc";
    const orderValue = isAsc ? "desc" : "asc";
    setOrder(orderValue);
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
    <>
      {!isLoading && (
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
      )}
    </>
  );
};
