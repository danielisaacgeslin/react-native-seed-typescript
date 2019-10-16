import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GeneralModel } from '../../models';
import { IRootState } from '../../state-mgmt/rootState';
import { todoState } from '../..//state-mgmt/todo';
import TodoList from './TodoList';

export const mapStateToProps = (state: IRootState) => ({
  todoMap: state.todo.todoMap
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchTodoList: (query: GeneralModel.IApiQuery) => dispatch(todoState.actions.fetchListStart(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
