import { Location, SearchLocation } from "../types/locationIQ";
import { getStateAbbreviation } from "./getStateAbbreviation";

export const getFormattedLocationText = (
  item: Location | SearchLocation,
  type: "autocomplete" | "search"
) => {
  let location = "";
  if (type === "search") {
    item = item as SearchLocation;
    let address = item.address;
    location = item.display_name;
    if (item.address?.country_code && item.address.country_code == "us") {
      location = `${address.city}, ${getStateAbbreviation(address.state)}`;

      if (address?.road) location = `${address.road}, ${location}`;
      if (address?.house_number)
        location = `${address.house_number} ${location}`;
    }
  } else {
    location = item.address?.name ? item.address.name : "";
    if (item.type === "city" && item.address.state)
      location = `${location}, ${getStateAbbreviation(item.address.state)}`;
  }
  return location;
};
