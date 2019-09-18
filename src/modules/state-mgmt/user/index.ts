import { reducer } from './reducer';
import { epics } from './epics';
import { initialState } from './state';
import { actions, ActionType } from './actions';

export { IState as IUserState } from './state';
export const userState = { actions, ActionType, reducer, epics, initialState };
