import { TodoModel } from '../../models';
import { IEntityMap } from '../../../types';

export interface IState {
  todoMap: IEntityMap<TodoModel.ITodo>;
}

export const initialState = {
  todoMap: {}
};
