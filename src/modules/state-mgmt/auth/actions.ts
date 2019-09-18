export enum ActionType {
  START = '[auth] start',
  SUCCESS = '[auth] success',
  SET_LOADING = '[auth] loading',
  FAIL = '[auth] fail'
}

export const actions = {
  start: (email: string, password: string) => ({ type: ActionType.START, payload: { email, password } }),
  success: (currentUserId: string) => ({ type: ActionType.SUCCESS, payload: { currentUserId } }),
  setLoading: (isLoading: boolean) => ({ type: ActionType.SET_LOADING, payload: { isLoading } }),
  fail: () => ({ type: ActionType.FAIL, payload: { hasError: true } })
};
