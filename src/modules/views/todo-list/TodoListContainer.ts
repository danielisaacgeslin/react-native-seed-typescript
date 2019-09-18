import { connect } from 'react-redux';

import { GeneralModel } from '../../models';
import { IRootState } from '../../state-mgmt/rootState';
import { todoState } from '../..//state-mgmt/todo';
import TodoList from './TodoList';

export const mapStateToProps = (state: IRootState) => ({
  todoMap: state.todo.todoMap,
  currentUser: state.user.userMap[state.auth.currentUserId]
});

export const mapDispatchToProps = dispatch => ({
  fetchTodoList: (query: GeneralModel.IApiQuery) => dispatch(todoState.actions.setListStart(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
