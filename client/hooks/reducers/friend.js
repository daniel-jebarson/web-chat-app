import actiontypes from "../action-types/actiontypes";
export function friendReducer(friends = [], action) {
  switch (action.type) {
    case actiontypes.ADD_FRIEND:
      return [...friends, action.friend];
    case actiontypes.REMOVE_FRIEND:
      return friends.filter((x) => x != action.friend);
    default:
      return friends;
  }
}
