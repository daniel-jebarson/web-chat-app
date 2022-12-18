import { addFriend, removeFriend } from "../actions/friend";
import { setChat } from "../actions/chat";
export const ADDFRIEND = (friend) => {
  return (dispatch) => {
    dispatch(addFriend(friend));
  };
};

export const REMOVEFRIEND = (friend) => {
  return (dispatch) => {
    dispatch(removeFriend(friend));
  };
};

export const SETCHAT = (name, index) => {
  return (dispatch) => {
    dispatch(setChat(name, index));
  };
};
