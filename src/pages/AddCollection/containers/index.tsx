import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Box, Paper } from "@mui/material";

import CookBookService from "services/cookbook.service";
import CookbookCollectionService from "services/cookbookCollection.service";
import ImageService from "services/image.service";
import RecipeService from "services/recipe.service";
import RecipeCollectionService from "services/recipeCollection.service";

import { CustomError } from "shared/interfaces/CustomError";
import { IRecipe } from "shared/interfaces/DetailsPage";
import { ICollection } from "shared/types/collection";
import { queryKey } from "shared/types/reactQueryKey";
import { AddCollectionView } from "../components";
import { ROUTE_NAMES } from "router/routeNames";

export const AddCollectionContainer = () => {
  const [image, setImage] = useState("");
  const [collection, setCollection] = useState<IRecipe[]>([]);
  const [options, setOptions] = useState<any>([]);
  const navigation = useNavigate();
  const { collectionType } = useParams();
  const formData = new FormData();
  const queryClient = useQueryClient();

  const initialState = {
    title: "",
    file: "",
    collection: [] as string[],
  };
  const createCookbookCollectionMutation = useMutation(
    ({
      collectionData,
    }: {
      collectionData: { title: string; image: string; cloudinary_id: string; collection: string[] };
    }) => CookbookCollectionService.createCollection(collectionData),
    { onSuccess: () => queryClient.invalidateQueries(queryKey.getAllCookbookCollection) }
  );

  const createRecipeCollectionMutation = useMutation(
    ({
      collectionData,
    }: {
      collectionData: { title: string; image: string; cloudinary_id: string; collection: string[] };
    }) => RecipeCollectionService.createCollection(collectionData),
    { onSuccess: () => queryClient.invalidateQueries(queryKey.getAllRecipeCollection) }
  );

  const { data: getCookbookQuery, isLoading: loadingCookbooks } = useQuery(queryKey.getAllCookbook, () =>
    CookBookService.getAllCookBooks().then((res) => res.data.allCookbooks)
  );
  const { data: getRecipeQuery, isLoading: loadingRecipe } = useQuery(queryKey.getAllRecipes, () =>
    RecipeService.getAllRecipes().then((res) => res.data.allRecipes)
  );

  useEffect(() => {
    collectionType === "cookbook" && !loadingCookbooks && setOptions(getCookbookQuery);
    collectionType === "recipe" && !loadingRecipe && setOptions(getRecipeQuery);
    setCollection([]);
  }, [collectionType, loadingCookbooks, loadingRecipe]);

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

  const successNotify = (msg: string) => {
    return toast.success(msg);
  };

  const errorNotify = (errors: { message: string }) => {
    if (errors?.message) {
      return toast.error(errors.message);
    }
  };

  const onSubmit = async (values: ICollection) => {
    try {
      const newImage: { secure_url: string; public_id: string } = await createImage(values.file);
      formData.append("image", values.file);
      console.log(newImage);
      const collectionId = values?.collection?.map(({ _id }: { _id: string }) => _id);
      const collectionData = {
        title: values.title,
        image: newImage.secure_url,
        cloudinary_id: newImage.public_id,
        collection: collectionId as string[],
      };

      if (collectionType === "cookbook") {
        createCookbookCollectionMutation.mutate({ collectionData });
      } else if (collectionType === "recipe") {
        createRecipeCollectionMutation.mutate({ collectionData });
      }
      successNotify("collection created");
      navigation(ROUTE_NAMES.COLLECTIONS);
      return true;
    } catch (error) {
      return errorNotify((error as CustomError).response.data);
    }
  };

  return (
    <Paper sx={{ p: { xs: 1, md: 2, lg: 4 } }}>
      {collectionType && (
        <Box>
          <AddCollectionView
            navigation={navigation}
            initialState={initialState}
            onSubmit={onSubmit}
            image={image}
            setImage={setImage}
            options={options}
            collection={collection}
            setCollection={setCollection}
          />
        </Box>
      )}
    </Paper>
  );
};
