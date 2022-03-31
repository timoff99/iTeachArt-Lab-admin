import { Typography } from "@mui/material";
import React, { useState } from "react";

import CookBookService from "services/cookbook.service";

import { tableData } from "shared/interfaces/Table";
import { Order } from "shared/types/table";
import { TableContainer } from "shared/ui-kit/Table/containers";

export const CookbookContainer = () => {
  const [dataRows, setDataRows] = useState<tableData[]>([]);

  const TryGetCookbook = async (orderValue?: Order, orderByValue?: keyof tableData) => {
    try {
      const getAllCookbooks = await CookBookService.getAllSortedCookbooks(orderValue, orderByValue);
      setDataRows(getAllCookbooks.data.allSortedCookbooks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCookbook = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => {
    event.stopPropagation();
    await CookBookService.deleteCookbook(_id);
    TryGetCookbook();
  };

  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: "22px" }} gutterBottom>
        Cookbooks
      </Typography>
      <TableContainer TryGetData={TryGetCookbook} dataRows={dataRows} handleDelete={handleDeleteCookbook} />
    </>
  );
};
