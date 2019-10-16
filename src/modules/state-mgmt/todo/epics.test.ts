import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import { getTodoList } from './epics';
import { getDeps } from '../../../test/epicDependencies';
import { getTodo_1, getInitialState } from '../../../test/entities';
import { coreState } from '../core';
import { actions } from './actions';
import { runEpic } from '../../../test/runEpic';

describe('user epics', () => {
  let deps: IEpicDependencies;
  let error;
  let state$;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
    state$ = { value: getInitialState() };
  });

  describe('getTodoList', () => {
    const query = { page: 1, limit: 1 };
    it('get user list', () => {
      return runEpic(getTodoList(ActionsObservable.of(actions.fetchListStart(query)), state$, deps), actionList => {
        expect(deps.apiService.getTodoList).toBeCalledWith(query);
        expect(actionList[0]).toEqual(actions.fetchListSuccess([getTodo_1()]));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getTodoList = () => throwError(error);
      return runEpic(getTodoList(ActionsObservable.of(actions.fetchListStart({ page: 1, limit: 1 })), state$, deps), actionList => {
        expect(actionList[0]).toEqual(coreState.actions.epicError(error));
      });
    });
  });
});
