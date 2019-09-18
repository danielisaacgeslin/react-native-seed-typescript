import { ActionsObservable } from 'redux-observable';
import { AjaxError } from 'rxjs/ajax';

import { ENV } from '../../../constants';
import { IEpicDependencies } from '../rootState';
import { todoState } from '../todo';
import { userState } from '../user';
import { coreGetEpicSetNavigation, coreGetEpicErrorHandler, coreGetEpicCheckForUpdates, coreGetEpicBootstrap } from './epics';
import { actions, ActionType } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getInitialState, getState } from '../../../test/entities';

describe('Core epics', () => {
  let deps: IEpicDependencies;
  let error;
  let state$;
  beforeEach(() => {
    error = new Error('scary error');
    state$ = { value: getInitialState() };
    deps = getDeps();
  });

  describe('coreGetEpicSetNavigation', () => {
    const navigation = state$;

    it('should get epic for core set navigation', done => {
      coreGetEpicSetNavigation(ActionsObservable.of(actions.setNavigation(navigation)), state$, deps).subscribe(output => {
        expect(deps.navigationService.setNavigation).toBeCalledWith(navigation);
        expect(output).toEqual(actions.setNavigationSuccess());
        done();
      });
    });
    it('should catch errors and dispatch them to the general error handler', done => {
      deps.navigationService.setNavigation = () => {
        throw error;
      };
      coreGetEpicSetNavigation(ActionsObservable.of(actions.setNavigation(navigation)), state$, deps).subscribe(output => {
        expect(output).toEqual(actions.epicError(error));
        done();
      });
    });
  });

  describe('coreGetEpicErrorHandler', () => {
    it('should dispatch no actions', done => {
      coreGetEpicErrorHandler(ActionsObservable.of(actions.epicError(error)), state$, deps).subscribe(() => {
        expect(false).toBe(true);
        done();
      });
      setTimeout(() => {
        expect(deps.logger.error).toBeCalledWith(error);
        done();
      }, 10);
    });

    it('should dispatch resetSession action on 401 errors', done => {
      const ajaxError = new AjaxError('message', { status: 401 } as any, {} as any);
      coreGetEpicErrorHandler(ActionsObservable.of(actions.epicError(ajaxError)), state$, deps).subscribe(output => {
        expect(false).toBe(true);
        done();
      });
      setTimeout(() => {
        expect(deps.logger.error).toBeCalledWith(error);
        done();
      }, 10);
    });
  });

  describe('coreGetEpicCheckForUpdates', () => {
    it('should run the check for updates interval without emitting values', done => {
      coreGetEpicCheckForUpdates(ActionsObservable.of(actions.checkForUpdates()), state$, deps).subscribe(() => {
        expect(false).toBe(true); // this will never run because this observable doesn't emit values
      });
      setTimeout(() => {
        expect((deps.helperService.checkForUpdates as any).mock.calls).toHaveLength(2);
        done();
      }, ENV.CHECK_FOR_UPDATES_INTERVAL * 1.5);
    });
  });

  describe('coreGetEpicBootstrap', () => {
    it('should bootstrap the app', done => {
      const emitedActions = [];
      const token = 'token';
      state$ = { value: getState() };
      coreGetEpicBootstrap(ActionsObservable.of(actions.bootstrap(token)), state$, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === todoState.ActionType.SET_LIST_START) {
          expect(deps.apiService.setToken).toBeCalledWith(token);
          expect(deps.navigationService.navigation.dispatch).toBeCalled();
          expect(emitedActions[0]).toEqual(userState.actions.setListStart([state$.value.auth.currentUserId]));
          expect(emitedActions[1]).toEqual(todoState.actions.setListStart({ page: 1, limit: ENV.PAGINATION.LIMIT }));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the general error handler', done => {
      deps.navigationService.navigation.dispatch = () => {
        throw error;
      };
      coreGetEpicBootstrap(ActionsObservable.of(actions.bootstrap('token')), state$, deps).subscribe(output => {
        if (output.type === ActionType.EPIC_ERROR) {
          expect(output).toEqual(actions.epicError(error));
          done();
        }
      });
    });
  });
});
