import actiontypes from "../action-types/actiontypes";

export const ADD_MESSAGE = (message, id) => {
  return {
    type: actiontypes.ADD_FRIEND,
    message: message,
    id: id,
  };
};

export const DELETE_MESSAGE = (receiver, index) => {
  return {
    type: actiontypes.DELETE_MESSAGE,
    receiver: receiver,
    index: index,
  };
};
export const EDIT_MESSAGE = (message, receiver, index) => {
  return {
    type: actiontypes.EDIT_MESSAGE,
    message: message,
    receiver: receiver,
    index: index,
  };
};

export const ADD_USER_MESSAGE = (id, messages) => {
  return {
    type: actiontypes.ADD_USER_MESSAGE,
    messages: messages,
    id: id,
  };
};

export const REMOVE_USER_MESSAGE = (receiver) => {
  return {
    type: actiontypes.EDIT_MESSAGE,
    receiver: receiver,
  };
};
