import actiontypes from "../action-types/actiontypes";

export const setUser = (userinfo) => {
  return {
    type: actiontypes.SET_USER,
    userinfo: userinfo,
  };
};
