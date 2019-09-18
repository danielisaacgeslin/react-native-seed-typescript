import React from 'react';
import { Text } from 'react-native';
import { Logger } from '../../../../services/Logger';

export interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.PureComponent<{}, IErrorBoundaryState> {
  private static defaultProps = {
    children: null
  };
  public state = { hasError: false };

  public componentDidCatch(error, info) {
    // eslint-disable-line
    Logger.error('ErrorBoundary: ', error, info);
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) return <Text>Error was catched</Text>;
    else return this.props.children; // eslint-disable-line
  }
}
