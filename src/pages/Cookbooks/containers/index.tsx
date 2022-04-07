import { Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

import CookBookService from "services/cookbook.service";

import { TableContainer } from "shared/ui-kit/Table/containers";

export const CookbookContainer = () => {
  const queryClient = useQueryClient();

  const deleteCookbookMutation = useMutation((_id: string) => CookBookService.deleteCookbook(_id), {
    onSettled: () => queryClient.invalidateQueries("dataRows"),
  });

  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22 }} gutterBottom>
        Cookbooks
      </Typography>
      <TableContainer flag={"cookbook"} deleteMutation={deleteCookbookMutation} />
    </>
  );
};
