import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import CookbookCollectionService from "services/cookbookCollection.service";
import { queryKey } from "shared/types/reactQueryKey";

import { CollectionsView } from "../components";
import { CardsView } from "../components/Cards";

export const CollectionsContainer = () => {
  const [cards, setCards] = useState<any>([]);
  const [id, setId] = useState<string>("");
  const queryClient = useQueryClient();
  const { data: cookbookCollection, isLoading: loadingCookbookCollection } = useQuery(
    queryKey.getAllCookbookCollection,
    () => CookbookCollectionService.getAllCookbookCollection().then((res) => res.data)
  );
  const { data: oneCookbookCollection, isLoading: loadingOneCookbookCollection } = useQuery(
    [queryKey.getOneCookbookCollection, id],
    () => CookbookCollectionService.getOneCookbookCollection(id).then((res) => res?.data),
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    !loadingOneCookbookCollection && setCards(oneCookbookCollection);
  }, [loadingOneCookbookCollection, id]);

  const deleteCookbookCollectionMutation = useMutation(
    ({ collection_id, cloudinary_id }: { collection_id: string; cloudinary_id: string }) =>
      CookbookCollectionService.deleteCollection(collection_id, cloudinary_id),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey.getAllCookbookCollection),
    }
  );

  return (
    <>
      {!loadingCookbookCollection && (
        <CollectionsView
          cookbookCollection={cookbookCollection}
          deleteCookbookCollectionMutation={deleteCookbookCollectionMutation}
          setId={setId}
        />
      )}
      {cards && (
        <Paper sx={{ p: { xs: 3, md: 1 }, mt: 3 }}>
          <Typography>{cards.title}</Typography>
          <CardsView cards={cards.collection_arr} />
        </Paper>
      )}
    </>
  );
};
