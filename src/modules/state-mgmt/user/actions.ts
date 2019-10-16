import { UserModel } from '../../models';

export enum ActionType {
  FETCH_LIST_START = '[user] fetch list start',
  FETCH_LIST_SUCCESS = '[user] fetch list success',
  FETCH_SUCCESS = '[user] fetch success'
}

export const actions = {
  fetchListStart: (idList: string[]) => ({ type: ActionType.FETCH_LIST_START, payload: { idList } }),
  fetchListSuccess: (userList: UserModel.IUser[]) => ({ type: ActionType.FETCH_LIST_SUCCESS, payload: { userList } }),
  fetchSuccess: (user: UserModel.IUser) => ({ type: ActionType.FETCH_SUCCESS, payload: { user } })
};
