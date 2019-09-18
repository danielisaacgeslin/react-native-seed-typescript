import { ActionsObservable } from 'redux-observable';

import { IEpicDependencies } from '../rootState';
import { authGetEpicAuthStart } from './epics';
import { ActionType, actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getLoginResponse } from '../../../test/entities';
import { coreState } from '../core';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('authGetEpicAuthStart', () => {
    const email = 'email';
    const password = 'password';

    it('should get epic for auth start', done => {
      const emitedActions = [];
      const loginResponse = getLoginResponse();
      authGetEpicAuthStart(ActionsObservable.of(actions.start(email, password)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LOADING && output.payload.isLoading === false) {
          expect(deps.apiService.login).toBeCalledWith({ email, password });
          expect(emitedActions[0]).toEqual(actions.setLoading(true));
          expect(emitedActions[1]).toEqual(actions.success(loginResponse._id));
          expect(emitedActions[2]).toEqual(coreState.actions.bootstrap(loginResponse.access_token));
          expect(emitedActions[3]).toEqual(actions.setLoading(false));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the auth error handler', done => {
      const emitedActions = [];
      deps.apiService.login = () => {
        throw error;
      };
      authGetEpicAuthStart(ActionsObservable.of(actions.start(email, password)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LOADING && output.payload.isLoading === false) {
          expect(emitedActions[0]).toEqual(actions.setLoading(true));
          expect(emitedActions[1]).toEqual(actions.fail());
          expect(emitedActions[2]).toEqual(actions.setLoading(false));
          done();
        }
      });
    });
  });
});
