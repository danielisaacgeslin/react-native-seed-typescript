import { mapStateToProps, mapDispatchToProps } from './TodoListContainer';
import { todoState } from '../..//state-mgmt/todo';
import { getState, getUser_1 } from '../../../test/entities';

describe('TodoListContainer', () => {
  it('should mapStateToProps, ', () => {
    const state = getState();
    expect(mapStateToProps(getState())).toEqual({
      todoMap: getState().todo.todoMap,
      currentUser: getUser_1()
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchTodoList: expect.any(Function)
    });
  });

  it('should dispatch todoState setListStart on fetchTodoList', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = { page: 1, limit: 1 };
    props.fetchTodoList(query);
    expect(dispatch).toBeCalledWith(todoState.actions.setListStart(query));
  });
});
