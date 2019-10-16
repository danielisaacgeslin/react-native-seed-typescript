import React, { memo } from 'react';
import { View, Text } from 'react-native';

import { TodoModel } from '../../../../models';
import { ErrorBoundary } from '../../../shared/components';
import styles from './styles';

export interface ITodoProps {
  todo: TodoModel.ITodo;
}

const Todo = ({ todo }: ITodoProps) => {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <Text style={styles.title}>{todo.title.toUpperCase()}</Text>
        <Text style={styles.description}>{todo.description}</Text>
        <Text style={styles.date}>created at: {String(todo.createdAt)}</Text>
      </View>
    </ErrorBoundary>
  );
};

export default memo(Todo);
