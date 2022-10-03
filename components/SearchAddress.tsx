import { Button, Input, Text } from "@ui-kitten/components";
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { theme } from "../theme";
import { getFormattedLocationText } from "../utils/getFormattedLocationText";
import { Row } from "./Row";
import { Location, SearchLocation } from "../types/locationIQ";
import { useState } from "react";
import { getSuggestedLocations, searchLocations } from "../services/location";

export const SearchAddress = ({
  type,
  suggestions,
  setSuggestions,
  handleGoBack,
  defaultLocation = "",
  handleSuggestionPress,
}: {
  suggestions: Location[] | SearchLocation[];
  handleGoBack: () => void;
  setSuggestions: (item: Location[] | SearchLocation[]) => void;
  handleSuggestionPress: (item: Location | SearchLocation) => void;
  defaultLocation?: string;
  type: "autocomplete" | "search";
}) => {
  const [value, setValue] = useState(defaultLocation);

  const handleChange = async (val: string) => {
    setValue(val);
    if (val.length > 2) await getSuggestions(val);
    else if (val.length === 0) setSuggestions([]);
  };

  const getSuggestions = async (value: string) => {
    let locations;
    if (type === "search") locations = await searchLocations(value);
    else locations = await getSuggestedLocations(value);
    if (locations.length > 0) setSuggestions(locations);
  };

  const handleSubmitEditing = async () => {
    await getSuggestions(value);

    if (
      (type === "autocomplete" && suggestions.length > 0) ||
      suggestions.length === 1
    )
      handleSuggestionPress(suggestions[0]);
  };

  const SuggestedText = ({
    locationItem,
  }: {
    locationItem: Location | SearchLocation;
  }) => {
    const location = getFormattedLocationText(locationItem, type);
    return (
      <Row style={styles.suggestionContainer}>
        <Text>{location}</Text>
      </Row>
    );
  };

  const getInput = () => {
    if (Platform.OS === "ios" && type === "autocomplete")
      return (
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter Location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={styles.defaultMarginTop}
        />
      );

    return (
      <Row>
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter Location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={[styles.defaultMarginTop, { width: "80%" }]}
        />
        <Button appearance={"ghost"} status="info" onPress={handleGoBack}>
          Cancel
        </Button>
      </Row>
    );
  };

  return (
    <View>
      {getInput()}
      {suggestions.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={suggestions as Location[]}
          keyExtractor={(item, index) => item.place_id + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                handleSuggestionPress(item);
              }}
            >
              <SuggestedText locationItem={item} />
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultMarginTop: {
    marginTop: 10,
  },
  suggestionContainer: {
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme["color-gray"],
  },
});