import React from 'react';
import { render, RenderAPI } from 'react-native-testing-library';

import Avatar from './Avatar';

describe('Avatar', () => {
  let props;
  let wrapper: RenderAPI;
  beforeEach(() => {
    props = {
      avatar: 'https://avatar.jpg'
    };
    wrapper = render(<Avatar {...props} />);
  });
  it('should render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
