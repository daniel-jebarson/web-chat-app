import { TYPE } from "../action-types/actiontypes";
// import { Dispatch } from "redux";

export const SENDMESSAGE = (desc) => {
  return (dispatch) => {
    dispatch({
      type: TYPE.SEND_MESSAGE,
      description: desc,
    });
  };
};

export const DELETEMESSAGE = (x) => {
  return (dispatch) => {
    dispatch({
      type: TYPE.DELETE_MESSAGE,
      index: x,
    });
  };
};
