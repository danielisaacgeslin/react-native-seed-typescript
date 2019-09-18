import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload: any }): IState => {
  switch (type) {
    case ActionType.SUCCESS:
      return { ...state, currentUserId: payload.currentUserId, hasError: false };
    case ActionType.SET_LOADING:
      return { ...state, isLoading: payload.isLoading };
    case ActionType.FAIL:
      return { ...state, hasError: payload.hasError };
    default:
      return state;
  }
};
