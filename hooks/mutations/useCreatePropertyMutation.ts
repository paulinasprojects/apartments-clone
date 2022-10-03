import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { endpoints, queryKeys } from "../../constants";
import { CreateProperty, Property } from "../../types/property";
import { StackActions, useNavigation } from "@react-navigation/native";

const createProperty = (obj: CreateProperty) =>
  axios.post<Property>(endpoints.createProperty, obj);

export const useCreatePropertyMutation = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNavigation();

  return useMutation((obj: CreateProperty) => createProperty(obj), {
    onError() {
      alert("Unable to create property");
    },
    onSuccess(data: { data: Property }) {
      queryClient.invalidateQueries(queryKeys.myProperties);
      dispatch(
        StackActions.replace("EditProperty", { propertyID: data.data.ID })
      );
    },
  });
};
