import { IState, initialState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload: any }) => {
  switch (type) {
    case ActionType.SET_LIST_SUCCESS:
      return { ...state, todoMap: payload.todoList.reduce((total, item) => ({ ...total, [item._id]: item }), state.todoMap) };
    default:
      return state;
  }
};
