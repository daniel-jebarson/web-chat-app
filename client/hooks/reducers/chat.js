import actiontypes from "../action-types/actiontypes";
export function chatReducer(
  chat = {
    name: "",
    id: -1,
  },
  action
) {
  switch (action.type) {
    case actiontypes.SET_CHAT:
      return (chat = {
        name: action.name,
        id: action.id,
      });
    default:
      return chat;
  }
}
