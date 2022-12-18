import actiontypes from "../action-types/actiontypes";

export const ADD_MESSAGE = (message, receiver) => {
  return {
    type: actiontypes.ADD_FRIEND,
    message: message,
    receiver: receiver,
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

export const ADD_USER_MESSAGE = (receiver, messages) => {
  return {
    type: actiontypes.ADD_USER_MESSAGE,
    messages: messages,
    receiver: receiver,
  };
};

export const REMOVE_USER_MESSAGE = (receiver) => {
  return {
    type: actiontypes.EDIT_MESSAGE,
    receiver: receiver,
  };
};
