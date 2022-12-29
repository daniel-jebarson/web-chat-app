import actiontypes from "../action-types/actiontypes";
export function messageReducer(messages = {}, action) {
  switch (action.type) {
    case actiontypes.ADD_MESSAGE:
      if (messages.hasOwnProperty(action.receiver)) {
        messages[action.receiver] = [
          ...messages[action.receiver],
          action.message,
        ];
      } else {
        messages[action.receiver] = [action.message];
      }
      return messages;

    case actiontypes.DELETE_MESSAGE:
      messages[action.receiver][action.index][isDeleted] = true;
      return messages;

    case actiontypes.EDIT_MESSAGE:
      messages[action.receiver][action.index] = action.message;
      return messages;

    case actiontypes.ADD_USER_MESSAGE:
      messages[action.receiver] = action.messages;
      return messages;

    case actiontypes.REMOVE_USER_MESSAGE:
      delete messages[action.receiver];
      return messages;

    default:
      return messages;
  }
}
