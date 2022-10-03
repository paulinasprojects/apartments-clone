import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Row } from "../Row";
import { BulletedList } from "../BulletedList";
import { Property } from "../../types/property";

export const AmenitiesSection = ({ property }: { property: Property }) => {
  const apartentsAmenities = [];
  const amenityExists = new Map<string, boolean>();
  //loop trough the apartments
  for (let apartments of property.apartments) {
    for (let amenity of apartments.amenities) {
      if (!amenityExists.get(amenity)) {
        apartentsAmenities.push(amenity);
        amenityExists.set(amenity, true);
      }
    }
  }
  return (
    <>
      {property.amenities && property.amenities.length > 0 ? (
        <>
          <Text category={"h5"} style={styles.defaultMarginVertical}>
            Amenities
          </Text>
          <Row style={styles.row}>
            <MaterialCommunityIcons
              name="google-circles-communities"
              color={"black"}
              size={24}
            />
            <Text style={styles.text} category={"h6"}>
              Community Amenities
            </Text>
          </Row>
          <BulletedList data={property.amenities} />
        </>
      ) : null}

      {apartentsAmenities.length > 0 ? (
        <>
          <Row style={styles.row}>
            <MaterialCommunityIcons
              name="toy-brick-outline"
              color={"black"}
              size={24}
            />
            <Text style={styles.text} category={"h6"}>
              Apartment Features
            </Text>
          </Row>
          <BulletedList data={apartentsAmenities} />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  defaultMarginVertical: {
    marginVertical: 10,
  },
  row: {
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    marginLeft: 10,
  },
});
