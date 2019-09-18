import React, { memo, useMemo, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';

import { ENV } from '../../../constants';
import { GeneralModel, TodoModel, UserModel } from '../../models';
import { IEntityMap } from '../../../types';
import Todo from './components/Todo';
import styles from './styles';

export interface ITodoListProps {
  currentUser: UserModel.IUser;
  todoMap: IEntityMap<TodoModel.ITodo>;
  fetchTodoList: (query: GeneralModel.IApiQuery) => void;
}

const TodoList = ({ currentUser, todoMap, fetchTodoList }: ITodoListProps) => {
  const todoList = useMemo(() => Object.values(todoMap).sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)), [todoMap]);

  const keyExtractor = useCallback((item: TodoModel.ITodo): string => item._id, []);
  const renderTodo = useCallback(({ item }: { item: TodoModel.ITodo }) => <Todo todo={item} />, []);
  const onEndReached = useCallback(() => {
    fetchTodoList({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { createdAt$ls: todoList[todoList.length - 1].createdAt } });
  }, [todoList, fetchTodoList]);

  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoBody}>
        <Text>this is an infinite scroll, please scroll down :)</Text>
        <FlatList data={todoList} renderItem={renderTodo} keyExtractor={keyExtractor} onEndReached={onEndReached} onEndReachedThreshold={0.5} />
      </View>
    </View>
  );
};

export default memo(TodoList);
