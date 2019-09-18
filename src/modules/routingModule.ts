import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TodoListContainer from './views/todo-list';
import LoginContainer from './views/login';

(TodoListContainer as any).navigationOptions = { title: 'Todo List' };

const stackNavigator = createStackNavigator(
  {
    Login: LoginContainer,
    TodoList: TodoListContainer
  },
  { initialRouteName: 'Login', headerMode: 'float' }
);

export default createAppContainer(stackNavigator);
