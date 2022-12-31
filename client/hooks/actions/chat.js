import actiontypes from "../action-types/actiontypes";

export const setChat = (name, id) => {
  return {
    type: actiontypes.SET_CHAT,
    name:name,
    id: id,
  };
};
