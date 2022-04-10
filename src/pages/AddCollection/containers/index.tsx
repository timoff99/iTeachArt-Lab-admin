import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";
import { Box, Paper } from "@mui/material";

import CookBookService from "services/cookbook.service";
import CookbookCollectionService from "services/cookbookCollection.service";
import ImageService from "services/image.service";

import { AddCollectionView } from "../components";
import { queryKey } from "shared/types/reactQueryKey";
import { ROUTE_NAMES } from "router/routeNames";
import RecipeService from "services/recipe.service";

const addCollectionSchema = yup.object().shape({
  title: yup.string().trim().required(),
  file: yup.mixed().required("File is required"),
  collection: yup.array().min(1, "collection is required"),
});

interface IRef {
  title: string;
  file: string;
  collection: string[];
}

// type ILogin = yup.InferType<typeof addCollectionSchema>;

export const AddCollectionContainer = () => {
  const [image, setImage] = useState("");
  const [value, setValue] = useState("cookbook");
  const [collection, setCollection] = useState([]);
  const [options, setOptions] = useState<any>([]); //for now, but [{_id:string, title: sting, and more img, description:string, likes, comments, views}]
  const navigation = useNavigate();
  const formData = new FormData();
  const queryClient = useQueryClient();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const createCookbookCollectionMutation = useMutation(
    ({
      collectionData,
    }: {
      collectionData: { title: string; image: string; cloudinary_id: string; collection: string[] };
    }) => CookbookCollectionService.createCollection(collectionData),
    { onSuccess: () => queryClient.invalidateQueries(queryKey.getAllCookbookCollection) }
  );

  const { data: getCookbookQuery, isLoading: loadingCookbooks } = useQuery(queryKey.getAllCookbook, () =>
    CookBookService.getAllCookBooks().then((res) => res.data.allCookbooks)
  );
  const { data: getRecipeQuery, isLoading: loadingRecipe } = useQuery(queryKey.getAllRecipes, () =>
    RecipeService.getAllRecipes().then((res) => res.data.allRecipes)
  );

  useEffect(() => {
    value === "cookbook" && !loadingCookbooks && setOptions(getCookbookQuery);
    value === "recipe" && !loadingRecipe && setOptions(getRecipeQuery);
    setCollection([]);
  }, [value, loadingCookbooks, loadingRecipe]);

  const createImage = async (fileImage: File) => {
    try {
      formData.append("image", fileImage);
      const image = await ImageService.addImage(formData);
      return image.data;
    } catch (error) {
      console.log("error occurred  while uploading image", error);
    }
    return true;
  };

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const newImage: { secure_url: string; public_id: string } = await createImage(values.file);
      formData.append("image", values.file);
      console.log(newImage);
      const collectionId = values.collection.map(({ _id }: { _id: string }) => _id);
      const collectionData = {
        title: values.title,
        image: newImage.secure_url,
        cloudinary_id: newImage.public_id,
        collection: collectionId,
      };
      createCookbookCollectionMutation.mutate({ collectionData });
      navigation(ROUTE_NAMES.COLLECTIONS);
      return true;
    } catch (error) {
      // return false;
    }
  };

  return (
    <Paper sx={{ p: { xs: 1, md: 2, lg: 4 } }}>
      <Box>
        <AddCollectionView
          navigation={navigation}
          handleChangeRadio={handleChange}
          value={value}
          onSubmit={onSubmit}
          addCollectionSchema={addCollectionSchema}
          image={image}
          setImage={setImage}
          options={options}
          collection={collection}
          setCollection={setCollection}
        />
      </Box>
    </Paper>
  );
};
