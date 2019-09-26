import React from 'react';
import { render, RenderAPI, fireEvent } from 'react-native-testing-library';

import TodoList, { ITodoListProps } from './TodoList';
import { ENV } from '../../../constants';
import { getState, getTodo_1 } from '../../../test/entities';
import { createTestNavigator } from '../../../test/createTestNaviigator';

describe('TodoList', () => {
  global.console.warn = () => null;
  global.console.error = () => null;
  let props: ITodoListProps;
  let wrapper: RenderAPI;
  let TestNavigator;
  let navRef;

  beforeEach(() => {
    navRef = React.createRef();
    TestNavigator = createTestNavigator('TodoList', {}, navRef);
    props = {
      todoMap: getState().todo.todoMap,
      fetchTodoList: jest.fn()
    };
    wrapper = render(
      <TestNavigator>
        <TodoList {...props} />
      </TestNavigator>
    );

    afterEach(() => {
      wrapper.unmount();
    });
  });

  it('should render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should onEndReached', () => {
    props.todoMap = { [getTodo_1()._id]: getTodo_1() };
    wrapper = render(
      <TestNavigator>
        <TodoList {...props} />
      </TestNavigator>
    );
    fireEvent(wrapper.getByTestId('todo-list'), 'onEndReached');
    expect(props.fetchTodoList).toBeCalledWith({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { createdAt$ls: getTodo_1().createdAt } });
  });
});
