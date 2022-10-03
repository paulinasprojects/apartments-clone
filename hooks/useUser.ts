import { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "react-query";
import { AutContext } from "../context";
import { User } from "../types/user";
import { Property } from "../types/property";
import { queryKeys } from "../constants";

export const useUser = () => {
  const { user, setUser } = useContext(AutContext);
  const queryClient = useQueryClient();

  const login = (user: User) => {
    let stringUser = JSON.stringify(user);
    setUser(user);
    SecureStore.setItemAsync("user", stringUser);
    // if a User has searched for properties in an area and they aren't logged in
    //but they log in and they have liked properties in that aria we want to show
    //that they have those liked properties

    const searchedProperties: Property[] | undefined = queryClient.getQueryData(
      queryKeys.searchProperties
    );
    if (searchedProperties) {
      for (let i of searchedProperties) {
        i.liked = false;
        if (user.savedProperties?.includes(i.ID)) i.liked = true;
      }
      queryClient.setQueryData(queryKeys.searchProperties, searchedProperties);
    }
  };

  const logout = () => {
    setUser(null);
    SecureStore.deleteItemAsync("user");
    queryClient.clear();
  };

  const setSavedProperties = (savedProperties: number[]) => {
    if (user) {
      const newUser = { ...user };
      newUser.savedProperties = savedProperties;
      setUser(newUser);
      let stringUser = JSON.stringify(newUser);
      SecureStore.setItemAsync("user", stringUser);
    }
  };

  return { user, login, logout, setSavedProperties };
};
