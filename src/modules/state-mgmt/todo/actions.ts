import { GeneralModel, TodoModel } from '../../models';

export enum ActionType {
  FETCH_LIST_START = '[todo] fetch list start',
  FETCH_LIST_SUCCESS = '[todo] fetch list success'
}

export const actions = {
  fetchListStart: (query: GeneralModel.IApiQuery) => ({ type: ActionType.FETCH_LIST_START, payload: { query } }),
  fetchListSuccess: (todoList: TodoModel.ITodo[]) => ({ type: ActionType.FETCH_LIST_SUCCESS, payload: { todoList } })
};
