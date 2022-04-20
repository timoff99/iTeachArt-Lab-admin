import { Paper, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import CookbookCollectionService from "services/cookbookCollection.service";
import RecipeCollectionService from "services/recipeCollection.service";

import { queryKey } from "shared/types/reactQueryKey";
import { CollectionsView } from "../components/Collection";
import { CardsView } from "../components/Cards";

export const CollectionsContainer = () => {
  const [cards, setCards] = useState<any>([]);
  const [type, setType] = useState<string>("");
  const [CookbookCollectionId, setCookbookCollectionId] = useState<string>("");
  const [RecipeCollectionId, setRecipeCollectionId] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCollectionType, setCurrentCollectionType] = useState<string>("");
  const [dialogValue, setDialogValue] = useState<{ collection_id: string; cloudinary_id: string }>({
    collection_id: "string",
    cloudinary_id: "",
  });
  const queryClient = useQueryClient();

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { data: cookbookCollection, isLoading: loadingCookbookCollection } = useQuery(
    queryKey.getAllCookbookCollection,
    () => CookbookCollectionService.getAllCookbookCollection().then((res) => res.data)
  );
  const {
    data: oneCookbookCollection,
    isLoading: loadingOneCookbookCollection,
    refetch: refetchCookbookCollection,
  } = useQuery(
    [queryKey.getOneCookbookCollection, CookbookCollectionId],
    () => CookbookCollectionService.getOneCookbookCollection(CookbookCollectionId).then((res) => res?.data),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const { data: recipeCollection, isLoading: loadingRecipeCollection } = useQuery(queryKey.getAllRecipeCollection, () =>
    RecipeCollectionService.getAllRecipeCollection().then((res) => res.data)
  );

  const {
    data: oneRecipeCollection,
    isLoading: loadingOneRecipeCollection,
    refetch: refetchRecipeCollection,
  } = useQuery(
    [queryKey.getOneRecipeCollection, RecipeCollectionId],
    () => RecipeCollectionService.getOneRecipeCollection(RecipeCollectionId).then((res) => res?.data),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    if (CookbookCollectionId !== "" && CookbookCollectionId === currentId) {
      refetchCookbookCollection();
    }
    if (RecipeCollectionId !== "" && RecipeCollectionId === currentId) {
      refetchRecipeCollection();
    }
  }, [RecipeCollectionId, CookbookCollectionId, currentId]);

  useEffect(() => {
    if (CookbookCollectionId === currentId) {
      !loadingOneCookbookCollection && setCards(oneCookbookCollection);
      setType("cookbook");
    }
    if (RecipeCollectionId === currentId) {
      !loadingOneRecipeCollection && setCards(oneRecipeCollection);
      setType("recipe");
    }
  }, [
    loadingOneCookbookCollection,
    CookbookCollectionId,
    oneCookbookCollection,
    loadingOneRecipeCollection,
    RecipeCollectionId,
    oneRecipeCollection,
    currentId,
  ]);

  const deleteCookbookCollectionMutation = useMutation(
    ({ collection_id, cloudinary_id }: { collection_id: string; cloudinary_id: string }) =>
      CookbookCollectionService.deleteCollection(collection_id, cloudinary_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey.getAllCookbookCollection);
        setCards([]);
      },
    }
  );
  const deleteCookbookCollectionFiledMutation = useMutation(
    ({
      collection_id,
      cloudinary_id,
      collection_filed_id,
    }: {
      collection_id: string;
      cloudinary_id: string;
      collection_filed_id: string;
    }) => CookbookCollectionService.deleteCollectionFiled(collection_id, cloudinary_id, collection_filed_id),
    {
      onSuccess: () => {
        refetchCookbookCollection();
        queryClient.invalidateQueries(queryKey.getAllCookbookCollection);
      },
    }
  );

  const deleteRecipeCollectionMutation = useMutation(
    ({ collection_id, cloudinary_id }: { collection_id: string; cloudinary_id: string }) =>
      RecipeCollectionService.deleteCollection(collection_id, cloudinary_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey.getAllRecipeCollection);
        setCards([]);
      },
    }
  );

  const deleteRecipeCollectionFiledMutation = useMutation(
    ({
      collection_id,
      cloudinary_id,
      collection_filed_id,
    }: {
      collection_id: string;
      cloudinary_id: string;
      collection_filed_id: string;
    }) => RecipeCollectionService.deleteCollectionFiled(collection_id, cloudinary_id, collection_filed_id),
    {
      onSuccess: () => {
        refetchRecipeCollection();
        queryClient.invalidateQueries(queryKey.getAllRecipeCollection);
      },
    }
  );

  return (
    <>
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22 }} gutterBottom>
        Cookbook Collections
      </Typography>

      {!loadingCookbookCollection ? (
        <CollectionsView
          cookbookCollection={cookbookCollection}
          deleteCookbookCollectionMutation={deleteCookbookCollectionMutation}
          deleteRecipeCollectionMutation={deleteRecipeCollectionMutation}
          setId={setCookbookCollectionId}
          collectionType={"cookbook"}
          setCurrentId={setCurrentId}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleClickOpenDialog={handleClickOpenDialog}
          dialogValue={dialogValue}
          setDialogValue={setDialogValue}
          currentCollectionType={currentCollectionType}
          setCurrentCollectionType={setCurrentCollectionType}
        />
      ) : (
        <Skeleton variant="rectangular" height="50%" />
      )}
      <Typography sx={{ fontWeight: "fontWeightBold", fontSize: 22, mt: 5 }} gutterBottom>
        Recipe Collections
      </Typography>
      {!loadingRecipeCollection ? (
        <CollectionsView
          cookbookCollection={recipeCollection}
          deleteCookbookCollectionMutation={deleteCookbookCollectionMutation}
          deleteRecipeCollectionMutation={deleteRecipeCollectionMutation}
          setId={setRecipeCollectionId}
          collectionType={"recipe"}
          setCurrentId={setCurrentId}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleClickOpenDialog={handleClickOpenDialog}
          dialogValue={dialogValue}
          setDialogValue={setDialogValue}
          currentCollectionType={currentCollectionType}
          setCurrentCollectionType={setCurrentCollectionType}
        />
      ) : (
        <Skeleton variant="rectangular" height="50%" />
      )}

      {cards && (
        <Paper sx={{ p: { xs: 3, md: 1 }, mt: 3 }}>
          <Typography
            sx={{ fontWeight: "fontWeightBold", fontSize: 20, ml: 4, mt: 3, mb: 1, textTransform: "capitalize" }}
            gutterBottom
          >
            {cards.title}
          </Typography>
          <CardsView
            cards={cards.collection_arr}
            collectionId={cards._id}
            cloudinaryId={cards.cloudinary_id}
            type={type}
            deleteCookbookCollectionFiledMutation={deleteCookbookCollectionFiledMutation}
            deleteRecipeCollectionFiledMutation={deleteRecipeCollectionFiledMutation}
          />
        </Paper>
      )}
    </>
  );
};
