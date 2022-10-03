import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import { Platform, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../theme";
import { Row } from "./Row";
import { useNavigation } from "@react-navigation/native";

export const HeaderInput = ({ location }: { location: string }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("FindLocations")}
    >
      <Row style={{ alignItems: "center" }}>
        <MaterialCommunityIcons
          name="magnify"
          color={theme["color-primary-500"]}
          size={28}
        />
        <Text style={styles.text}>{location}</Text>
      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 50 : 30,
    borderWidth: 1,
    borderColor: theme["color-gray"],
    borderRadius: 30,
    padding: 10,
  },
  text: {
    marginLeft: 10,
  },
});
