import actiontypes from "../action-types/actiontypes";

export function userReducer(data = {}, action) {
  switch (action.type) {
    case actiontypes.SET_USER:
      data = action.userinfo;
      return data;
    default:
      return data;
  }
}
