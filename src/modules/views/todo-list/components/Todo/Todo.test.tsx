import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';

import Todo, { ITodoProps } from './Todo';
import { getTodo_1 } from '../../../../../test/entities';

describe('Login', () => {
  let props: ITodoProps;
  let wrapper;

  global.console.error = () => null;
  beforeEach(() => {
    props = { todo: getTodo_1() };
    wrapper = mount(<Todo {...props} />);
  });

  it('should render', () => {
    expect(create(wrapper).toJSON()).toMatchSnapshot();
  });
});
