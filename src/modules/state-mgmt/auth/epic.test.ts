import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';

import { IEpicDependencies } from '../rootState';
import { authStart } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getLoginResponse } from '../../../test/entities';
import { coreState } from '../core';
import { runEpic } from '../../../test/runEpic';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('authStart', () => {
    const email = 'email';
    const password = 'password';

    it('auth start', () => {
      const loginResponse = getLoginResponse();
      return runEpic(authStart(ActionsObservable.of(actions.start(email, password)), {} as any, deps), actionList => {
        expect(deps.apiService.login).toBeCalledWith({ email, password });
        expect(actionList[0]).toEqual(actions.setLoading(true));
        expect(actionList[1]).toEqual(actions.success(loginResponse._id));
        expect(actionList[2]).toEqual(coreState.actions.bootstrap(loginResponse.access_token));
        expect(actionList[3]).toEqual(actions.setLoading(false));
      });
    });

    it('should catch errors', () => {
      deps.apiService.login = () => throwError(error);
      return runEpic(authStart(ActionsObservable.of(actions.start(email, password)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(actions.setLoading(true));
        expect(actionList[1]).toEqual(actions.fail());
        expect(actionList[2]).toEqual(actions.setLoading(false));
      });
    });
  });
});
