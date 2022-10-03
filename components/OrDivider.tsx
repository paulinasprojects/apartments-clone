import { Text, Divider } from "@ui-kitten/components";
import { StyleSheet, ViewStyle } from "react-native";
import { theme } from "../theme";
import { Row } from "./Row";

export const OrDivider = ({ style }: { style?: ViewStyle }) => {
  return (
    <Row style={[styles.container, style as ViewStyle]}>
      <Divider style={styles.divider} />
      <Text style={styles.orText} appearance={"hint"}>
        or
      </Text>
      <Divider style={styles.divider} />
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    borderWidth: 1,
    width: "45%",
    borderColor: theme["color-gray"],
  },
  orText: {
    paddingHorizontal: 10,
    marginTop: -5,
  },
});
