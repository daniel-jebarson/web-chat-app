import actiontypes from "../action-types/actiontypes";

export const addFriend = (friend) => {
  return {
    type: actiontypes.ADD_FRIEND,
    friend: friend,
  };
};

export const removeFriend = (friend) => {
  return {
    type: actiontypes.REMOVE_FRIEND,
    friend: friend,
  };
};
