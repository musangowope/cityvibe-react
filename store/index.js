import { createStore } from "redux";
import reducers from "../reducers";

export const store = createStore(
  reducers,
  null,
  window.devToolsExtension && window.devToolsExtension()
);
