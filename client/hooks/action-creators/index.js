import { addFriend, removeFriend } from "../actions/friend";

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
