import { SEARCH_PLACES } from "../constants";

const initialState = {
  places: [],
  placeDetailUrl: '',
};

export function placesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_PLACES:
      return {
        ...state,
        places: [...state.places, ...payload]
      };
    default:
      return state;
  }
}
