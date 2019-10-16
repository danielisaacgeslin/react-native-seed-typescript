import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import { getUserList } from './epics';
import { getDeps } from '../../../test/epicDependencies';
import { getUser_1 } from '../../../test/entities';
import { coreState } from '../core';
import { actions } from './actions';
import { runEpic } from '../../../test/runEpic';

describe('user epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('getUserList', () => {
    const idList = ['userId', 'userId', 'userId'];

    it('get user list', () => {
      return runEpic(getUserList(ActionsObservable.of(actions.fetchListStart(idList)), {} as any, deps), actionList => {
        expect(deps.apiService.getUserList).toBeCalledWith(idList);
        expect(actionList[0]).toEqual(actions.fetchListSuccess([getUser_1()]));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getUserList = () => throwError(error);
      return runEpic(getUserList(ActionsObservable.of(actions.fetchListStart(idList)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(coreState.actions.epicError(error));
      });
    });
  });
});
