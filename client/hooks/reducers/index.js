import { friendReducer } from "./friend";
import { chatReducer } from "./chat";
import { messageReducer } from "./message";
import { userReducer } from "./user";
import { combineReducers } from "redux";
const Reducers = combineReducers({
  friends: friendReducer,
  chat: chatReducer,
  messages: messageReducer,
  user: userReducer,
});

export default Reducers;
