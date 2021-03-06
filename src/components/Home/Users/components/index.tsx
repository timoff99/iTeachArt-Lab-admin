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
  Chip,
  Menu,
  MenuItem,
  alpha,
  Skeleton,
  Avatar,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { userData } from "shared/interfaces/UserTable";
import { Order } from "shared/types/table";

interface HeadCell {
  id: keyof userData;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "username",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "cookbook_id",
    label: "Cookbooks",
  },
  {
    id: "recipe_id",
    label: "Recipes",
  },
  {
    id: "user_status",
    label: "Status",
  },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: keyof userData;
  onRequestSort: (property: keyof userData) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof userData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(property);
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
interface IUserTableProps {
  order: Order;
  orderBy: keyof userData;
  handleRequestSort: (property: keyof userData) => void;
  allUsers: userData[];
  page: number;
  rowsPerPage: number;
  handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: string) => void;
  anchorElOption: HTMLElement | null;
  openOption: boolean;
  handleCloseMenu: () => void;
  handleUpdateUserStatus: (_id: string, user_status: string) => void;
  userId: string;
  emptyRows: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserTableView = ({
  order,
  orderBy,
  handleRequestSort,
  allUsers,
  page,
  rowsPerPage,
  handleOpenMenu,
  anchorElOption,
  openOption,
  handleCloseMenu,
  handleUpdateUserStatus,
  userId,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
}: IUserTableProps) => {
  return (
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
              {allUsers.length > 0 &&
                allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ mr: 2 }}>
                          {row.image ? (
                            <Avatar
                              sx={{ borderRadius: "50%", width: "36px", height: "36px" }}
                              src={row.image}
                              alt={"img"}
                            />
                          ) : (
                            <Skeleton variant="circular" width="36px" height="36px" />
                          )}
                        </Box>
                        <Box>{row.username}</Box>
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.cookbook_id.length}</TableCell>
                      <TableCell>{row.recipe_id.length}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.user_status}
                          sx={{
                            fontSize: 14,
                            fontWeight: "fontWeightMedium",
                            width: 76,
                            height: 25,
                            textTransform: "capitalize",
                            "&.MuiChip-root.MuiChip-filled": {
                              color: (theme) => {
                                switch (row.user_status) {
                                  case "active":
                                    return theme.palette.success.main;
                                  case "blocked":
                                    return theme.palette.warning.main;
                                  case "deleted":
                                    return theme.palette.error.main;
                                  default:
                                    return theme.palette.success.main;
                                }
                              },
                              bgcolor: (theme) => {
                                switch (row.user_status) {
                                  case "active":
                                    return alpha(theme.palette.success.main, 0.1);
                                  case "blocked":
                                    return alpha(theme.palette.warning.main, 0.1);
                                  case "deleted":
                                    return alpha(theme.palette.error.main, 0.1);
                                  default:
                                    return alpha(theme.palette.success.main, 0.1);
                                }
                              },
                            },
                          }}
                        />
                      </TableCell>
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
                <MenuItem onClick={() => handleUpdateUserStatus(userId, "active")}>Active</MenuItem>
                <MenuItem onClick={() => handleUpdateUserStatus(userId, "blocked")}>Block</MenuItem>
                <MenuItem onClick={() => handleUpdateUserStatus(userId, "deleted")}>Delete</MenuItem>
              </Menu>

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
          count={allUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
