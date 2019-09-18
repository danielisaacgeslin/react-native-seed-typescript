import { IState, initialState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload: any }) => {
  switch (type) {
    case ActionType.SET_LIST_SUCCESS:
      return { ...state, userMap: payload.userList.reduce((total, item) => ({ ...total, [item._id]: item }), state.userMap) };
    case ActionType.SET_SUCCESS:
      return { ...state, userMap: { ...state.userMap, [payload.user._id]: payload.user } };
    default:
      return state;
  }
};
