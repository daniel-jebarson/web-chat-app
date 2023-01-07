import actiontypes from "../action-types/actiontypes";
export function messageReducer(messages = {}, action) {
  switch (action.type) {
    case actiontypes.ADD_MESSAGE:
      // messages = [...messages, action.message];
      if (messages.hasOwnProperty(action.id)) {
        messages[action.id] = [...messages[action.id], action.message];
        // console.log("old");
      } else {
        messages[action.id] = [action.message];
        // console.log("new");
      }
      return messages;

    case actiontypes.DELETE_MESSAGE:
      messages[action.id][action.index]["isDeleted"] = true;
      return messages;

    case actiontypes.EDIT_MESSAGE:
      messages[action.id][action.index] = action.message;
      return messages;

    case actiontypes.ADD_USER_MESSAGE:
      messages[action.id] =
        action.messages.length === 0 ? [] : [...action.messages];
      return messages;

    case actiontypes.REMOVE_USER_MESSAGE:
      delete messages[action.id];
      return messages;

    default:
      return messages;
  }
}
