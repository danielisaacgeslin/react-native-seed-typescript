import { GeneralModel, TodoModel } from '../../models';

export enum ActionType {
  SET_LIST_START = '[todo] set list start',
  SET_LIST_SUCCESS = '[todo] set list success'
}

export const actions = {
  setListStart: (query: GeneralModel.IApiQuery) => ({ type: ActionType.SET_LIST_START, payload: { query } }),
  setListSuccess: (todoList: TodoModel.ITodo[]) => ({ type: ActionType.SET_LIST_SUCCESS, payload: { todoList } })
};
