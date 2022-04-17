import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { Autocomplete, Box, Button, Icon, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import { RecipeView } from "./Recipe";
import { IRecipe } from "shared/interfaces/DetailsPage";
import { addCollectionSchema } from "shared/shema/collection";
import { LoadingButton } from "@mui/lab";

interface IAddCollectionView {
  navigation: NavigateFunction;
  initialState: {
    title: string;
    file: string;
    collection: string[];
  };
  onSubmit: (values: any) => Promise<true | React.ReactText | undefined>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  readonly options: any[];
  collection: IRecipe[];
  setCollection: React.Dispatch<React.SetStateAction<IRecipe[]>>;
  loading: boolean;
}

const inputStyle = {
  "& .MuiInputBase-root": {
    height: 45,
    borderRadius: 2,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderWidth: 1,
      borderColor: "text.disabled",
    },
  },
};
const autocompleteStyle = {
  "& .MuiInputBase-root": {
    borderRadius: 2,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderWidth: 1,
      borderColor: "text.disabled",
    },
  },
};

export const AddCollectionView = ({
  navigation,
  initialState,
  onSubmit,
  setImage,
  image,
  options,
  collection,
  setCollection,
  loading,
}: IAddCollectionView) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton sx={{ color: "black" }} onClick={() => navigation(-1)}>
          <Icon>
            <ArrowBackIcon sx={{ fontSize: { xs: 20, md: 26 } }} />
          </Icon>
        </IconButton>
        <Typography sx={{ fontWeight: "fontWeightBold", fontSize: { xs: 20, md: 26 } }}>Return</Typography>
      </Box>

      <Formik initialValues={initialState} validationSchema={addCollectionSchema} onSubmit={onSubmit}>
        {({ values, handleChange, setFieldValue, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 20, md: 24 }, mt: 3, mb: 2 }}>
              Collection title
            </Typography>
            <TextField
              sx={{ ...inputStyle }}
              fullWidth
              name="title"
              value={values ? values?.title : ""}
              onChange={handleChange}
            />
            <Box color="red" mb={10}>
              {<ErrorMessage name={"title"} />}
            </Box>
            <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 20, md: 24 }, mt: 3, mb: 2 }}>
              Collection picture
            </Typography>
            <label htmlFor="contained-button-file" style={{ display: "inline-flex", flexDirection: "column" }}>
              <Box
                sx={{ display: "none" }}
                id="contained-button-file"
                component="input"
                type="file"
                name="file"
                onChange={(e: React.ChangeEvent) => {
                  const target = e.target as HTMLInputElement;
                  const file: File = (target.files as FileList)[0];
                  setFieldValue("file", file);
                  setImage(URL.createObjectURL(file));
                }}
              />
              <Box
                component="img"
                sx={{
                  borderRadius: 1,
                  maxWidth: { xs: "150px", md: "320px" },
                  maxHeight: { xs: "150px", md: "320px" },
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                alt=""
                src={image}
              />

              <Button
                variant="contained"
                sx={{ width: "fit-content", px: 2, py: 1, mt: 1 }}
                id="contained-button-file"
                startIcon={<AddIcon />}
                component="span"
              >
                Upload
              </Button>
            </label>
            <Box color="red" mb={10}>
              {<ErrorMessage name={"file"} />}
            </Box>

            <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 20, md: 24 }, mt: 4, mb: 2 }}>
              Recipes and Cookbooks
            </Typography>
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="collection"
              value={collection}
              onChange={(e: any, value: IRecipe[]) => {
                setFieldValue("collection", value);
                setCollection(value);
              }}
              getOptionLabel={(option: IRecipe) => option.title}
              options={options}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ ...autocompleteStyle }}
                  fullWidth
                  name="collection"
                  value={collection}
                  onChange={handleChange}
                />
              )}
            />
            <Box color="red" mb={10}>
              {<ErrorMessage name={"collection"} />}
            </Box>

            <RecipeView recipes={collection} />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ mt: "70px", height: 48, mr: 3 }}
                type="reset"
                size="large"
                variant="text"
                onClick={() => {
                  setImage("");
                  setFieldValue("collection", []);
                  setCollection([]);
                  resetForm();
                }}
              >
                <Typography variant="h4" component="span" sx={{ fontWeight: "medium", textTransform: "capitalize" }}>
                  Cancel
                </Typography>
              </Button>
              <LoadingButton
                sx={{ mt: "70px", height: 48, mr: 3 }}
                type="submit"
                size="large"
                variant="contained"
                loading={loading}
              >
                <Typography variant="h4" component="span" sx={{ fontWeight: "medium", textTransform: "capitalize" }}>
                  Confirm
                </Typography>
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
