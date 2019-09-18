import React from 'react';
import { render, RenderAPI } from 'react-native-testing-library';

import Todo, { ITodoProps } from './Todo';
import { getTodo_1 } from '../../../../../test/entities';

describe('Todo', () => {
  let props: ITodoProps;
  let wrapper: RenderAPI;

  beforeEach(() => {
    props = { todo: getTodo_1() };
    wrapper = render(<Todo {...props} />);
  });

  it('should render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
