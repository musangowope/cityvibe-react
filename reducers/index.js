import { combineReducers } from "redux";
import { placesReducer } from "../SharedComponents/SearchInput/reducers";

export default combineReducers({
  placesStore: placesReducer
});
