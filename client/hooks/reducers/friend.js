import actiontypes from "../action-types/actiontypes";
export function friendReducer(friends = [], action) {
  switch (action.type) {
    case actiontypes.SET_FRIENDS:
      let friendData = action.data
        .map((v) => v.users)
        .reduce((acc, val) => [...acc, ...val], []);
      return (friends = friendData.filter(
        (v) => v.username !== action.username
      ));
    case actiontypes.ADD_FRIEND:
      return friends.map((x) => x.username).includes(action.friend.username)
        ? friends
        : [...friends, action.friend];
    case actiontypes.REMOVE_FRIEND:
      return friends.filter((x) => x.username != action.friend);
    default:
      return friends;
  }
}
