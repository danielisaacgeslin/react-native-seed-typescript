import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TodoList from './views/todo-list';
import Login from './views/login';
import { ROUTE } from '../constants';

(TodoList as any).navigationOptions = { title: 'Todo List' };

const stackNavigator = createStackNavigator(
  {
    [ROUTE.LOGIN]: Login,
    [ROUTE.TODO_LIST]: TodoList
  },
  { initialRouteName: ROUTE.LOGIN, headerMode: 'float' }
);

export default createAppContainer(stackNavigator);
