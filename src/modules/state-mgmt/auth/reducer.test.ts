import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getLoginResponse } from '../../../test/entities';

describe('auth reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state ActionType.SUCCESS', () => {
    const res = getLoginResponse();
    expect(reducer(undefined, actions.success(res._id))).toEqual({ ...initialState, currentUserId: res._id, hasError: false });
  });

  it('should return a new state ActionType.SET_LOADING as true', () => {
    expect(reducer(undefined, actions.setLoading(true))).toEqual({ ...initialState, isLoading: true });
  });

  it('should return a new state ActionType.SET_LOADING as false', () => {
    expect(reducer(undefined, actions.setLoading(false))).toEqual({ ...initialState, isLoading: false });
  });

  it('should return a new state ActionType.FAIL because it threw an error', () => {
    expect(reducer(undefined, actions.fail())).toEqual({ ...initialState, hasError: true });
  });
});
