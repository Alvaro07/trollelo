import { reducer } from "./reducer";
import { createStore } from "redux";

/**
 * Initial state
 */

let initialState = {
  isLogin: false
};

/**
 * Redux store
 */

export let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);
