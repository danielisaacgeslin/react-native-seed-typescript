import React from 'react';
import { render } from 'react-native-testing-library';
import { Text } from 'react-native';

import ErrorBoundary from './ErrorBoundary';

class HandGranade extends React.Component {
  public render() {
    const a: any = null;
    a.b.c = 10;
    return <Text>This should not work</Text>;
  }
}

describe('ErrorBoundaryTest', () => {
  global.console.error = () => null;
  it('should render child', () => {
    const wrapper = render(
      <ErrorBoundary>
        <Text>Render test</Text>
      </ErrorBoundary>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render placeholder when child render fails', () => {
    const wrapper = render(
      <ErrorBoundary>
        <HandGranade>Render test</HandGranade>
      </ErrorBoundary>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
