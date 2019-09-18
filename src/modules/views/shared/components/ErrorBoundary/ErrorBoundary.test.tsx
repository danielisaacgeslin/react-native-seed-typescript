import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

class HandGranade extends React.Component {
  public render() {
    const a: any = null;
    a.b.c = 10;
    return <Text>This should not work</Text>;
  }
}

describe('ErrorBoundaryTest', () => {
  global.console.error = () => {
    /** */
  };
  it('should render child', () => {
    const rendered = renderer
      .create(
        <ErrorBoundary>
          <Text>Render test</Text>
        </ErrorBoundary>
      )
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should render placeholder when child render fails', () => {
    const rendered = renderer
      .create(
        <ErrorBoundary>
          <HandGranade>Render test</HandGranade>
        </ErrorBoundary>
      )
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
