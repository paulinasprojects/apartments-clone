import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { endpoints, queryKeys } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { EditApartment } from "../../types/apartment";
import { useLoading } from "../useLoading";

const updateApartments = (propertyID: number, obj: EditApartment[]) =>
  axios.patch(`${endpoints.updateApartments}${propertyID}`, obj);

export const useEditApartmentsMutation = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useLoading();
  const { goBack } = useNavigation();

  return useMutation(
    ({ propertyID, obj }: { propertyID: number; obj: EditApartment[] }) =>
      updateApartments(propertyID, obj),
    {
      onMutate: () => {
        setLoading(true);
      },
      onError(err) {
        alert("Error updating apartments");
      },
      onSuccess() {
        queryClient.invalidateQueries(queryKeys.myProperties);
        setLoading(false);
        goBack();
      },
    }
  );
};
