import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Formik, Form, ErrorMessage, FormikHandlers, FormikState } from "formik";
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

interface IAddCollectionView {
  navigation: NavigateFunction;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onSubmit: any;
  addCollectionSchema: any;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
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

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];

export const AddCollectionView = ({
  navigation,
  handleChange,
  value,
  onSubmit,
  addCollectionSchema,
  setImage,
  image,
}: IAddCollectionView) => {
  const [collection, setCollection] = React.useState([]);
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

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Collection type</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="cookbook" control={<Radio />} label="Cookbook" />
          <FormControlLabel value="recipe" control={<Radio />} label="Recipe" />
        </RadioGroup>
      </FormControl>
      <Formik
        initialValues={{
          title: "",
          file: "",
          collection: [],
        }}
        validationSchema={addCollectionSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Typography sx={{ fontWeight: "fontWeightMedium", fontSize: { xs: 20, md: 24 }, mt: 3, mb: 2 }}>
              Collection title
            </Typography>
            <TextField sx={{ ...inputStyle }} fullWidth name="title" onChange={handleChange} />
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
              options={top100Films}
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

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button sx={{ mt: "70px", height: 48, mr: 3 }} type="reset" size="large" variant="text">
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
