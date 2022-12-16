import { friendReducer } from "./friend";
import { combineReducers } from "redux";
export default combineReducers({
  friends: friendReducer,
  //   messages: messageReducer,
});
