import { Dimensions, Platform, StatusBar } from "react-native";

export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;
export const PHOTOS_STR = "photos";
export const AMENITIES_STR = "amenities";
export const DESCRIPTION_STR = "description";

const baseHight = 160;
const iosNotch = 40;
const iosHeight = baseHight + iosNotch;
let androidHeight = baseHight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;

const serverUrl = "http://192.168.1.2:4000/api";
const location = "/location";
const user = "/user";
const property = "/property";
const apartment = "/apartment";
const review = "/review";
const locationEndPoint = serverUrl + location;
const userEndPoint = serverUrl + user;
const propertyEndPoint = serverUrl + property;
const apartmentEndPoint = serverUrl + apartment;
const reviewEndPoint = serverUrl + review;
const savedEndPoint = (id: number) => `${userEndPoint}/${id}/properties/saved`;

export const endpoints = {
  autoCompleteEndpoint: locationEndPoint + "/autocomplete",
  searchEndpoint: locationEndPoint + "/search",
  register: userEndPoint + "/register",
  login: userEndPoint + "/login",
  facebook: userEndPoint + "/facebook",
  google: userEndPoint + "/google",
  apple: userEndPoint + "/apple",
  forgotPassword: userEndPoint + "/forgotpassword",
  resetPassword: userEndPoint + "/resetpassword",
  createProperty: propertyEndPoint + "/create",
  getPropertyByID: propertyEndPoint + "/",
  getPropertiesByUserID: propertyEndPoint + "/userid/",
  getPropertiesByBoundingBox: propertyEndPoint + "/search",
  deleteProperty: propertyEndPoint + "/",
  updateProperty: propertyEndPoint + "/update/",
  getApartmentByPropertyID: apartmentEndPoint + "/property/",
  updateApartments: apartmentEndPoint + "/property/",
  createReview: reviewEndPoint + "/property/",
  getSavedPropertiesByUserID: savedEndPoint,
  alterSavedPropertiesByUserID: savedEndPoint,
};

export const queryKeys = {
  searchProperties: "searchProperties",
  selectedProperty: "selectedProperty",
  savedProperties: "savedProperties",
  myProperties: "myProperties",
  editProperty: "editProperty",
  apartments: "apartments",
};
