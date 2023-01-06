import { addFriend, removeFriend,setFriends } from "../actions/friend";
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

export const ADDMESSAGE = (message, id) => {
  return (dispatch) => {
    dispatch(ADD_MESSAGE(message, id));
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

export const SETCHAT = (username,id) => {
  return (dispatch) => {
    dispatch(setChat(username,id));
  };
};

export const ADDUSERMESSAGE = (id, messages) => {
  return (dispatch) => {
    dispatch(ADD_USER_MESSAGE(id, messages));
  };
};

export const REMOVEUSERMESSAGE = (id) => {
  return (dispatch) => {
    dispatch(REMOVE_USER_MESSAGE(id));
  };
};

export const SETUSER = (userinfo) => {
  return (dispatch) => {
    dispatch(setUser(userinfo));
  };
};

export const SETFRIENDS=(data,username)=>{
  return(dispatch)=>{
    dispatch(setFriends(data,username))
  }
}
