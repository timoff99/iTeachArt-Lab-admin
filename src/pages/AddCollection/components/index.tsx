import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { RecipeView } from "./Recipe";

interface IAddCollectionView {
  navigation: NavigateFunction;
  handleChangeRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onSubmit: any;
  addCollectionSchema: any;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  options: any; //for now
  collection: any;
  setCollection: any;
}

interface IRef {
  title: string;
  file: string;
  collection: string[];
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
  handleChangeRadio,
  value,
  onSubmit,
  addCollectionSchema,
  setImage,
  image,
  options,
  collection,
  setCollection,
}: IAddCollectionView) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton sx={{ color: "black", pl: 0 }} onClick={() => navigation(-1)}>
          <Icon>
            <ArrowBackIcon sx={{ fontSize: { xs: 20, md: 26 } }} />
          </Icon>
        </IconButton>
        <Typography sx={{ fontWeight: "fontWeightBold", fontSize: { xs: 20, md: 26 } }}>Return</Typography>
      </Box>

      <Formik
        initialValues={{
          title: "",
          file: "",
          collection: [] as string[],
        }}
        validationSchema={addCollectionSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, setFieldValue, handleSubmit, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Collection type</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e) => {
                  handleChangeRadio(e);
                  setFieldValue("collection", []);
                }}
              >
                <FormControlLabel value="cookbook" control={<Radio />} label="Cookbook" />
                <FormControlLabel value="recipe" control={<Radio />} label="Recipe" />
              </RadioGroup>
            </FormControl>
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
            <label htmlFor="contained-button-file" style={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{ display: "none" }}
                id="contained-button-file"
                component="input"
                type="file"
                name="file"
                onChange={(e: any) => {
                  setFieldValue("file", e.currentTarget.files[0]);
                  setImage(URL.createObjectURL(e.currentTarget.files[0]));
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
                  mr: 4,
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
              onChange={(e: any, value: any) => {
                setFieldValue("collection", value);
                setCollection(value);
              }}
              getOptionLabel={(option: any) => option.title} // TODO: form not {title: string}
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
              <Button sx={{ mt: "70px", height: 48, mr: 3 }} type="submit" size="large" variant="contained">
                <Typography variant="h4" component="span" sx={{ fontWeight: "medium", textTransform: "capitalize" }}>
                  Confirm
                </Typography>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
