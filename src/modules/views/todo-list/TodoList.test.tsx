import React from 'react';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';

import TodoList, { ITodoListProps } from './TodoList';
import { ENV } from '../../../constants';
import { getState, getUser_1, getTodo_1 } from '../../../test/entities';

describe('TodoList', () => {
  let props: ITodoListProps;
  let wrapper: RenderAPI;

  beforeEach(() => {
    props = {
      currentUser: getUser_1(),
      todoMap: getState().todo.todoMap,
      fetchTodoList: jest.fn()
    };
    wrapper = render(<TodoList {...props} />);
  });

  it('should render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should onEndReached', () => {
    props.todoMap = { [getTodo_1()._id]: getTodo_1() };
    wrapper = render(<TodoList {...props} />);
    fireEvent(wrapper.getByTestId('todo-list'), 'onEndReached');
    expect(props.fetchTodoList).toBeCalledWith({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { createdAt$ls: getTodo_1().createdAt } });
  });
});
