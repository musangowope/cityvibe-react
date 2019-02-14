import {
  GOOGLE_PLACES_API_KEY,
  GOOGLE_PLACE_API_BASE_URL
} from "react-native-dotenv";

export function getNearMeUrl(lat, long, placeType = "") {
  return `${GOOGLE_PLACE_API_BASE_URL}/nearbysearch/json?&location=${lat},${long}&type=${placeType}&key=${GOOGLE_PLACES_API_KEY}&opennow&rankby=distance`;
}

export function getTextSearchUrl(searchQuery, placeType) {
  return `${GOOGLE_PLACE_API_BASE_URL}/nearbysearch/json?key=${GOOGLE_PLACES_API_KEY}&query=${searchQuery}
  &rankby=distance&opennow&type=${placeType}&pagetoken=10`;
}
