import { reducer } from './reducer';
import { epics } from './epics';
import { initialState } from './state';
import { actions, ActionType } from './actions';

export { IState as ITodoState } from './state';
export const todoState = { actions, ActionType, reducer, epics, initialState };
