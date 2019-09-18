import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import { userGetEpicGetUserList } from './epics';
import { getDeps } from '../../../test/epicDependencies';
import { getUser_1 } from '../../../test/entities';
import { coreState } from '../core';
import { ActionType, actions } from './actions';

describe('user epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('userGetEpicGetUserList', () => {
    const idList = ['userId', 'userId', 'userId'];

    it('should get epic for get user list', done => {
      const emitedActions = [];
      userGetEpicGetUserList(ActionsObservable.of(actions.setListStart(idList)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LIST_SUCCESS) {
          expect(deps.apiService.getUserList).toBeCalledWith(idList);
          expect(emitedActions[0]).toEqual(actions.setListSuccess([getUser_1()]));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the user error handler', done => {
      const emitedActions = [];
      deps.apiService.getUserList = () => throwError(error);
      userGetEpicGetUserList(ActionsObservable.of(actions.setListStart(idList)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        expect(emitedActions[0]).toEqual(coreState.actions.epicError(error));
        done();
      });
    });
  });
});
