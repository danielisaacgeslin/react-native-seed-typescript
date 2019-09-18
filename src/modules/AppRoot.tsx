import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';

import { store } from './state-mgmt';
import RootStackNavigator from './routingModule';

global.console.disableYellowBox = true;

export default class App extends React.Component<{}, {}> {
  public componentDidMount() {
    SplashScreen.hide();
  }

  public render() {
    return (
      <Provider store={store}>
        <RootStackNavigator />
      </Provider>
    );
  }
}
