import { ActionsObservable } from 'redux-observable';
import { AjaxError } from 'rxjs/ajax';

import { ENV } from '../../../constants';
import { IEpicDependencies } from '../rootState';
import { todoState } from '../todo';
import { userState } from '../user';
import { setNavigation, errorHandler, coreGetEpicCheckForUpdates, coreGetEpicBootstrap } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getInitialState, getState } from '../../../test/entities';
import { runEpic } from '../../../test/runEpic';

describe('core epics', () => {
  let deps: IEpicDependencies;
  let error;
  let state$;
  beforeEach(() => {
    error = new Error('scary error');
    state$ = { value: getInitialState() };
    deps = getDeps();
  });

  describe('setNavigation', () => {
    const navigation = state$;

    it('core set navigation', () => {
      return runEpic(setNavigation(ActionsObservable.of(actions.setNavigation(navigation)), state$, deps), actionList => {
        expect(deps.navigationService.setNavigation).toBeCalledWith(navigation);
        expect(actionList[0]).toEqual(actions.setNavigationSuccess());
      });
    });
    it('should catch errors', () => {
      deps.navigationService.setNavigation = () => {
        throw error;
      };
      return runEpic(setNavigation(ActionsObservable.of(actions.setNavigation(navigation)), state$, deps), actionList => {
        expect(actionList[0]).toEqual(actions.epicError(error));
      });
    });
  });

  describe('errorHandler', () => {
    it('should dispatch no actions', () => {
      return runEpic(
        errorHandler(ActionsObservable.of(actions.epicError(error)), state$, deps),
        actionList => {
          expect(actionList).toHaveLength(0);
          expect(deps.logger.error).toBeCalledWith(error);
        },
        10
      );
    });

    it('should dispatch resetSession action on 401 errors', () => {
      const ajaxError = new AjaxError('message', { status: 401 } as any, {} as any);
      return runEpic(
        errorHandler(ActionsObservable.of(actions.epicError(ajaxError)), state$, deps),
        actionList => {
          expect(actionList).toHaveLength(0);
          expect(deps.logger.error).toBeCalledWith(error);
        },
        10
      );
    });
  });

  describe('coreGetEpicCheckForUpdates', () => {
    it('should run the check for updates interval without emitting values', () => {
      return runEpic(
        coreGetEpicCheckForUpdates(ActionsObservable.of(actions.checkForUpdates()), state$, deps),
        actionList => {
          expect((deps.helperService.checkForUpdates as any).mock.calls).toHaveLength(2);
        },
        ENV.CHECK_FOR_UPDATES_INTERVAL * 1.5
      );
    });
  });

  describe('coreGetEpicBootstrap', () => {
    it('should bootstrap the app', () => {
      const token = 'token';
      state$ = { value: getState() };
      return runEpic(coreGetEpicBootstrap(ActionsObservable.of(actions.bootstrap(token)), state$, deps), actionList => {
        expect(deps.apiService.setToken).toBeCalledWith(token);
        expect(deps.navigationService.navigation.dispatch).toBeCalled();
        expect(actionList[0]).toEqual(userState.actions.fetchListStart([state$.value.auth.currentUserId]));
        expect(actionList[1]).toEqual(todoState.actions.fetchListStart({ page: 1, limit: ENV.PAGINATION.LIMIT }));
      });
    });

    it('should catch errors', () => {
      deps.navigationService.navigation.dispatch = () => {
        throw error;
      };
      return runEpic(coreGetEpicBootstrap(ActionsObservable.of(actions.bootstrap('token')), state$, deps), actionList => {
        expect(actionList[0]).toEqual(actions.epicError(error));
      });
    });
  });
});
