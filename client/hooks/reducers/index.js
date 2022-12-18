import { friendReducer } from "./friend";
import { chatReducer } from "./chat";
import { messageReducer } from "./message";
import { combineReducers } from "redux";
const Reducers = combineReducers({
  friends: friendReducer,
  chat: chatReducer,
  messages: messageReducer,
});

export default Reducers;
