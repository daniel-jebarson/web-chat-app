import actiontypes from "../action-types/actiontypes";
export function friendReducer(friends = [], action) {
  switch (action.type) {
    case actiontypes.SET_FRIENDS:
      return (friends = action.data.reduce((acc, val) => {
        let data = val.users.filter((x) => x.username != action.username)[0];
        return [
          ...acc,
          {
            id: data._id,
            chatId: val._id,
            gmail: data.gmail,
            username: data.username,
            image: data.image,
          },
        ];
      }, []));

    // let friendData = action.data
    //   .map((v) => v.users)
    //   .reduce((acc, val) => [...acc, ...val], []);
    // return (friends = friendData.filter(
    //   (v) => v.username !== action.username
    // ));
    case actiontypes.ADD_FRIEND:
      return friends.map((x) => x.username).includes(action.friend.username)
        ? friends
        : [...friends, action.friend];
    case actiontypes.REMOVE_FRIEND:
      return friends.filter((x) => x.username != action.friend);
    case actiontypes.NOTIFY_DELETED_CHAT:
      return friends.filter((x) => x.chatId != action.chatId);
    default:
      return friends;
  }
}
