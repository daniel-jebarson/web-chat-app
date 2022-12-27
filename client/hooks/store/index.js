import { legacy_createStore as createStore, applyMiddleware } from "redux";
import Reducers from "../reducers/index";
import thunk from "redux-thunk";

export const store = createStore(Reducers, {}, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});
