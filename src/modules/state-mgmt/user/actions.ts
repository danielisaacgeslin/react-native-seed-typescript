import { UserModel } from '../../models';

export enum ActionType {
  SET_LIST_START = '[user] set list start',
  SET_LIST_SUCCESS = '[user] set list success',
  SET_SUCCESS = '[user] set success'
}

export const actions = {
  setListStart: (idList: string[]) => ({ type: ActionType.SET_LIST_START, payload: { idList } }),
  setListSuccess: (userList: UserModel.IUser[]) => ({ type: ActionType.SET_LIST_SUCCESS, payload: { userList } }),
  setSuccess: (user: UserModel.IUser) => ({ type: ActionType.SET_SUCCESS, payload: { user } })
};
