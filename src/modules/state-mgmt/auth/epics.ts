import { Epic, ofType } from 'redux-observable';
import { of, concat } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import { GeneralModel } from '../../models';
import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { coreState } from '../core';
import { actions, ActionType } from './actions';

export const authGetEpicAuthStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.START),
    mergeMap(action =>
      concat(
        of(actions.setLoading(true)),
        of(action).pipe(
          switchMap(({ payload }) => deps.apiService.login(payload)),
          switchMap((res: GeneralModel.ILoginResponse) => [actions.success(res._id), coreState.actions.bootstrap(res.access_token)])
        ),
        of(actions.setLoading(false))
      ).pipe(catchError(() => of(actions.fail(), actions.setLoading(false))))
    )
  );

export const epics = [authGetEpicAuthStart];
