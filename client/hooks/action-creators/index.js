import { addFriend, removeFriend } from "../actions/friend";
import { setChat } from "../actions/chat";
import { setUser } from "../actions/user";
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  ADD_USER_MESSAGE,
  REMOVE_USER_MESSAGE,
} from "../actions/message";
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

export const ADDMESSAGE = (message, receiver) => {
  return (dispatch) => {
    dispatch(ADD_MESSAGE(message, receiver));
  };
};

export const DELETEMESSAGE = (receiver, index) => {
  return (dispatch) => {
    dispatch(DELETE_MESSAGE(receiver, index));
  };
};

export const EDITMESSAGE = (message, receiver, index) => {
  return (dispatch) => {
    dispatch(EDIT_MESSAGE(message, receiver, index));
  };
};

export const SETCHAT = (name, index) => {
  return (dispatch) => {
    dispatch(setChat(name, index));
  };
};

export const ADDUSERMESSAGE = (receiver, messages) => {
  return (dispatch) => {
    dispatch(ADD_USER_MESSAGE(receiver, messages));
  };
};

export const REMOVEUSERMESSAGE = (receiver) => {
  return (dispatch) => {
    dispatch(REMOVE_USER_MESSAGE(receiver));
  };
};

export const SETUSER = (userinfo) => {
  return (dispatch) => {
    dispatch(setUser(userinfo));
  };
};
