import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';

import TodoList, { ITodoListProps } from './TodoList';
import { ENV } from '../../../constants';
import { getState, getUser_1, getTodo_1 } from '../../../test/entities';

describe('TodoList', () => {
  let props: ITodoListProps;
  let wrapper;

  global.console.error = () => null;
  beforeEach(() => {
    props = {
      currentUser: getUser_1(),
      todoMap: getState().todo.todoMap,
      fetchTodoList: jest.fn()
    };
    wrapper = mount(<TodoList {...props} />);
  });

  it('should render', () => {
    expect(create(wrapper).toJSON()).toMatchSnapshot();
  });

  it('should onEndReached', () => {
    props.todoMap = { [getTodo_1()._id]: getTodo_1() };
    wrapper = mount(<TodoList {...props} />);
    wrapper
      .find('FlatList')
      .props()
      .onEndReached();
    expect(props.fetchTodoList).toBeCalledWith({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { createdAt$ls: getTodo_1().createdAt } });
  });
});
