import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import Reducers from "../reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// export const store = createStore(Reducers, {}, applyMiddleware(thunk));

export const store = createStore(
  Reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

store.subscribe(() => {
  console.log(store.getState());
});
