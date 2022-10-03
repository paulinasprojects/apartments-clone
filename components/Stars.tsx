import { ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Row } from "./Row";
import { theme } from "../theme";

export const Stars = ({
  score,
  style,
}: {
  score: number;
  style?: ViewStyle | ViewStyle[];
}) => {
  return (
    <Row style={style}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        let decimalValue = score % 1;
        let compareValue = score | 0;

        if (score / item >= 1)
          return (
            <MaterialCommunityIcons
              key={index}
              name={"star"}
              size={24}
              color={theme["color-primary-500"]}
            />
          );
        else if (decimalValue > 0 && compareValue === index)
          if (decimalValue >= 0.5)
            return (
              <MaterialCommunityIcons
                key={index}
                name={"star-half-full"}
                size={24}
                color={theme["color-primary-500"]}
              />
            );
        return (
          <MaterialCommunityIcons
            key={index}
            name={"star-outline"}
            size={24}
            color={theme["color-primary-500"]}
          />
        );
      })}
    </Row>
  );
};
