import React, { FC } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Order } from "shared/types/table";
import { tableData } from "shared/interfaces/Table";

interface HeadCell {
  id: keyof tableData;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "title",
    label: "Title",
  },
  {
    id: "author",
    label: "Author",
  },
  {
    id: "views",
    label: "Views",
  },
  {
    id: "likes",
    label: "Likes",
  },
  {
    id: "comments",
    label: "Comments",
  },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: keyof tableData;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof tableData) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof tableData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sx={{ fontSize: 16, fontWeight: "fontWeightBold", pt: 5, pb: 0, pl: 5 }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}
interface ITableProps {
  order: Order;
  orderBy: keyof tableData;
  handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof tableData) => void;
  dataRows: tableData[];
  page: number;
  rowsPerPage: number;
  handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: string) => void;
  anchorElOption: HTMLElement | null;
  openOption: boolean;
  handleCloseMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDeleteRow: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => void;
  handleOpenDetailsPage: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => void;
  userId: string;
  emptyRows: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TableView: FC<ITableProps> = ({
  order,
  orderBy,
  handleRequestSort,
  dataRows,
  page,
  rowsPerPage,
  handleOpenMenu,
  anchorElOption,
  openOption,
  handleCloseMenu,
  handleDeleteRow,
  handleOpenDetailsPage,
  userId,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: "20px" }}>
        <TableContainer sx={{ borderRadius: "20px" }}>
          <Table stickyHeader sx={{ "& .MuiTableCell-root": { borderBottom: 0, pt: 5, pb: 0, pl: 5 } }} size={"medium"}>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {dataRows.length > 0 &&
                dataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id} onClick={() => console.log(1)}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 2 }}>
                          <img
                            style={{ borderRadius: "50%", width: "36px", height: "36px" }}
                            src={row.image}
                            alt={"img"}
                            loading="lazy"
                          />
                        </Box>
                        <Box>{row.title}</Box>
                      </TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>{row.views}</TableCell>
                      <TableCell>{row.likes.length}</TableCell>
                      <TableCell>{row.comments.length}</TableCell>
                      <TableCell>
                        <IconButton onClick={(event) => handleOpenMenu(event, row._id)}>{<MoreHorizIcon />}</IconButton>
                        <Menu
                          anchorEl={anchorElOption}
                          open={openOption}
                          sx={{ bottom: 0, left: "-30px" }}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem onClick={(event) => handleOpenDetailsPage(event, userId)}>View</MenuItem>
                          <MenuItem onClick={(event) => handleDeleteRow(event, userId)}>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
