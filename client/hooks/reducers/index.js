import { friendReducer } from "./friend";
import { combineReducers } from "redux";
const Reducers = combineReducers({
  friends: friendReducer,
  //   messages: messageReducer,
});

export default Reducers;
