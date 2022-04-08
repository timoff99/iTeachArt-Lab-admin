import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { UseMutationResult, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "router/routeNames";
import CookBookService from "services/cookbook.service";
import RecipeService from "services/recipe.service";

import { tableData } from "shared/interfaces/Table";
import { queryKey } from "shared/types/reactQueryKey";
import { Order } from "shared/types/table";
import { UserContext } from "shared/ui-kit/UserProvider";

import { TableView } from "../components";

interface Props {
  deleteMutation: UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>;
  flag: string;
}

export const TableContainer = ({ flag, deleteMutation }: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof tableData>("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const navigation = useNavigate();
  const location = useLocation();
  const { search } = useContext(UserContext);

  const openOption = Boolean(anchorElOption);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    setAnchorElOption(event.currentTarget);
    setUserId(_id);
  };
  const handleCloseMenu = () => {
    setAnchorElOption(null);
  };

  const handleDeleteRow = (_id: string) => {
    deleteMutation.mutate(_id);
    handleCloseMenu();
  };

  const handleOpenDetailsPage = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    navigation(`${location.pathname}/${_id}`);
    handleCloseMenu();
  };

  const {
    isLoading,
    isError,
    data: dataRows,
  } = useQuery(
    [queryKey.dataRows, order, orderBy, search],
    () =>
      flag === "cookbook"
        ? CookBookService.getAllSortedCookbooks(order, orderBy, search).then((res) => res.data.allSortedCookbooks)
        : RecipeService.getAllSortedRecipes(order, orderBy, search).then((res) => res.data.allSortedRecipes),
    {
      keepPreviousData: true,
    }
  );
  if (isError) {
    navigation(ROUTE_NAMES.LOGIN, { replace: true });
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof tableData) => {
    event.stopPropagation();
    const isAsc = orderBy === property && order === "asc";
    const orderValue = isAsc ? "desc" : "asc";
    setOrder(orderValue);
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataRows.length) : 0;

  return (
    <>
      {!isLoading && (
        <TableView
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          dataRows={dataRows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleOpenMenu={handleOpenMenu}
          anchorElOption={anchorElOption}
          openOption={openOption}
          handleCloseMenu={handleCloseMenu}
          handleDeleteRow={handleDeleteRow}
          handleOpenDetailsPage={handleOpenDetailsPage}
          userId={userId}
          emptyRows={emptyRows}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};
