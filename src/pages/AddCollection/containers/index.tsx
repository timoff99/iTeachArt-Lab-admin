import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Box, Paper } from "@mui/material";

import { AddCollectionView } from "../components";

const addCollectionSchema = yup.object().shape({
  title: yup.string().trim().required(),
  file: yup.mixed().required("File is required"),
  collection: yup.array().min(1, "collection is required"),
});

// type ILogin = yup.InferType<typeof addCollectionSchema>;

export const AddCollectionContainer = () => {
  const [image, setImage] = useState("");
  const [value, setValue] = useState("cookbook");

  const navigation = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const onSubmit = async (values: any) => {
    console.log(values);

    // try {
    //   const loginData = await AuthService.login(values.email, values.password);
    //   if (!loginData.data) {
    //     throw loginData;
    //   }
    //   Cookies.set(CookiesType.token, loginData.data.token);

    //   successNotify("user login");
    //   setTimeout(() => {
    //     navigation(ROUTE_NAMES.HOME, { replace: true });
    //   }, 1000);
    //   return true;
    // } catch (error) {
    //   return errorNotify((error as CustomError).response.data);
    // }
  };

  return (
    <Paper sx={{ p: { xs: 1, md: 2, lg: 4 } }}>
      <Box>
        <AddCollectionView
          navigation={navigation}
          handleChange={handleChange}
          value={value}
          onSubmit={onSubmit}
          addCollectionSchema={addCollectionSchema}
          image={image}
          setImage={setImage}
        />
      </Box>
    </Paper>
  );
};
