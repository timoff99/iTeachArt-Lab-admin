import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { tableData } from "shared/interfaces/Table";
import { Order } from "shared/types/table";

import { TableView } from "../components";

interface Props {
  TryGetData: (orderValue?: Order | undefined, orderByValue?: keyof tableData | undefined) => Promise<void>;
  dataRows: tableData[];
  handleDelete: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => Promise<void>;
}

export const TableContainer = ({ TryGetData, dataRows, handleDelete }: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof tableData>("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string>("");
  const navigation = useNavigate();
  const location = useLocation();
  const openOption = Boolean(anchorElOption);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    setAnchorElOption(event.currentTarget);
    setUserId(_id);
  };
  const handleCloseMenu = () => {
    setAnchorElOption(null);
  };

  const handleDeleteRow = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    handleDelete(event, _id);
    handleCloseMenu();
  };

  const handleOpenDetailsPage = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    navigation(`${location.pathname}/${_id}`);
    handleCloseMenu();
  };

  useEffect(() => {
    TryGetData(order, orderBy);
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof tableData) => {
    event.stopPropagation();
    const isAsc = orderBy === property && order === "asc";
    const orderValue = isAsc ? "desc" : "asc";
    setOrder(orderValue);
    setOrderBy(property);
    TryGetData(orderValue, property);
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
  );
};
