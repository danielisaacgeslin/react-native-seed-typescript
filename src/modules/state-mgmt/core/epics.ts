import { Epic, ofType } from 'redux-observable';
import { of, empty, interval, defer } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { tap, map, catchError, mergeMap, switchMap, startWith } from 'rxjs/operators';
import { StackActions, NavigationActions } from 'react-navigation';

import { ENV } from '../../../constants';
import { actions as todoActions } from '../todo/actions';
import { actions as userActions } from '../user/actions';
import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';

export const coreGetEpicSetNavigation: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.SET_NAVIGATION),
    mergeMap(action =>
      of(action).pipe(
        tap(({ payload }) => deps.navigationService.setNavigation(payload.navigation)),
        map(actions.setNavigationSuccess),
        catchError(error => of(actions.epicError(error)))
      )
    )
  );

export const coreGetEpicErrorHandler: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.EPIC_ERROR),
    mergeMap(action =>
      of(action).pipe(
        tap(({ payload }) => deps.logger.error(payload.error)),
        switchMap(({ payload }) => {
          const { error } = payload;
          /** streams that get a 401 from the api get here so you con do something like return of(authState.actions.resetSession()) */
          if (error instanceof AjaxError && error.status === 401) return empty();
          else return empty();
        })
      )
    )
  );

export const coreGetEpicCheckForUpdates: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.CHECK_FOR_UPDATES),
    mergeMap(() =>
      interval(ENV.CHECK_FOR_UPDATES_INTERVAL).pipe(
        startWith(defer(deps.helperService.checkForUpdates)),
        tap(deps.helperService.checkForUpdates),
        switchMap(() => empty())
      )
    )
  );

export const coreGetEpicBootstrap: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    /** ofType filters the type of action */
    ofType(ActionType.BOOTSTRAP),
    /** side effect to sets api token */
    tap(({ payload }) => deps.apiService.setToken(payload.accessToken)),
    /** merge maps emits get current user & first todo list fetch data and isolates an observable branch in case it fails  */
    mergeMap(() =>
      of(userActions.setListStart([state$.value.auth.currentUserId]), todoActions.setListStart({ page: 1, limit: ENV.PAGINATION.LIMIT })).pipe(
        /** side effect to navigate to initial authenticated view and reset the router so the user can't go back to the login */
        tap(() => {
          const resetAction = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'TodoList' })] });
          deps.navigationService.navigation.dispatch(resetAction);
        }),
        /** catches possible errors with statements inside this mergeMap (not the api service from users since this epic only emits an action) */
        catchError(error => of(actions.epicError(error)))
      )
    )
  );

export const epics = [coreGetEpicSetNavigation, coreGetEpicErrorHandler, coreGetEpicCheckForUpdates, coreGetEpicBootstrap];
