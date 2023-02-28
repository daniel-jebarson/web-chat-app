import {
  addFriend,
  removeFriend,
  setFriends,
  notifyDeletedChat,
} from "../actions/friend";
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

export const NOTIFYDELETEDCHAT = (chatId) => {
  return (dispatch) => {
    dispatch(notifyDeletedChat(chatId));
  };
};

export const ADDMESSAGE = (message, id) => {
  return (dispatch) => {
    dispatch(ADD_MESSAGE(message, id));
  };
};

export const DELETEMESSAGE = (chatId, index) => {
  return (dispatch) => {
    dispatch(DELETE_MESSAGE(chatId, index));
  };
};

export const EDITMESSAGE = (message, chatId, index) => {
  return (dispatch) => {
    dispatch(EDIT_MESSAGE(message, chatId, index));
  };
};

export const SETCHAT = (username, id) => {
  return (dispatch) => {
    dispatch(setChat(username, id));
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

export const SETFRIENDS = (data, username) => {
  return (dispatch) => {
    dispatch(setFriends(data, username));
  };
};
