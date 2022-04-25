import React from "react";
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
  Avatar,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
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
    id: "views",
    label: "Views",
  },
  {
    id: "author",
    label: "Author",
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
          <TableCell key={headCell.id} sx={{ fontSize: 16, fontWeight: "fontWeightBold", pt: 5, pb: 2, pl: 5 }}>
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
  handleDeleteRow: (_id: string) => void;
  handleOpenDetailsPage: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => void;
  userId: string;
  emptyRows: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openDialog: boolean;
  handleClickOpenDialog: () => void;
  handleCloseDialog: () => void;
}

export const TableView = ({
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
  openDialog,
  handleClickOpenDialog,
  handleCloseDialog,
}: ITableProps) => (
  <Box sx={{ width: "100%" }}>
    <Paper sx={{ width: "100%", mb: 2, borderRadius: "20px" }}>
      <TableContainer sx={{ borderRadius: "20px" }}>
        <Table
          stickyHeader
          sx={{ "& .MuiTableCell-root": { borderBottom: 0 }, "& .MuiTableCell-body": { pt: 2, pb: 2, pl: 5 } }}
          size={"medium"}
        >
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {dataRows.length > 0 &&
              dataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      {row.image ? (
                        <Avatar
                          style={{ borderRadius: "50%", width: "36px", height: "36px", marginRight: "16px" }}
                          src={row.image}
                          alt={"img"}
                        />
                      ) : (
                        <Skeleton variant="circular" width="36px" height="36px" />
                      )}
                      <Box>{row.title}</Box>
                    </TableCell>
                    <TableCell>{row.views}</TableCell>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      {row.image ? (
                        <Avatar
                          style={{ borderRadius: "50%", width: "36px", height: "36px", marginRight: "16px" }}
                          src={row.user_id?.image}
                          alt={"img"}
                        />
                      ) : (
                        <Skeleton variant="circular" width="36px" height="36px" />
                      )}
                      <Box>{row.user_id?.username}</Box>
                    </TableCell>
                    <TableCell>{row.likes.length}</TableCell>
                    <TableCell>{row.comments.length}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleOpenMenu(event, row._id)}>{<MoreHorizIcon />}</IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

            <Menu
              anchorEl={anchorElOption}
              open={openOption}
              sx={{ bottom: 0, left: "-30px" }}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={(event) => handleOpenDetailsPage(event, userId)}>View</MenuItem>
              <MenuItem color="error" onClick={handleClickOpenDialog}>
                Delete
              </MenuItem>
            </Menu>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
              <DialogTitle sx={{ textAlign: "center", fontSize: "30px" }}>{"Delete collection"}</DialogTitle>
              <DialogContent sx={{ alignSelf: "center" }}>
                <DialogContentText sx={{ textAlign: "center", fontSize: "20px" }}>Are you sure?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>No</Button>
                <Button
                  onClick={() => {
                    handleDeleteRow(userId);
                    handleCloseDialog();
                  }}
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
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
