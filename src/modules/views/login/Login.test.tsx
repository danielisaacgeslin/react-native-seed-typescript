import React from 'react';
import Login, { ILoginProps } from './Login';
import { mount } from 'enzyme';

import { create } from 'react-test-renderer';

describe('Login', () => {
  let props: ILoginProps;
  let wrapper;

  global.console.error = () => null;
  beforeEach(() => {
    props = {
      isLoading: false,
      hasError: false,
      login: jest.fn(),
      setNavigation: jest.fn(),
      navigation: jest.fn() as any,
      checkForUpdates: jest.fn()
    };
    wrapper = mount(<Login {...props} />);
  });

  it('should render', () => {
    props.isAndroid = false;
    wrapper = mount(<Login {...props} />);
    expect(create(wrapper).toJSON()).toMatchSnapshot();
    expect(props.setNavigation).toBeCalledWith(props.navigation);
    expect(props.checkForUpdates).toBeCalled();
  });

  it('should render on Android', () => {
    props.isAndroid = true;
    wrapper = mount(<Login {...props} />);
    expect(create(wrapper).toJSON()).toMatchSnapshot();
  });

  it('should render with errors', () => {
    props.hasError = true;
    wrapper = mount(<Login {...props} />);
    expect(create(wrapper).toJSON()).toMatchSnapshot();
  });

  it('should login', () => {
    const email = 'mail@mail.mail';
    const password = 'psw';
    wrapper
      .find('[testID="email-input"]')
      .first()
      .props()
      .onChangeText(email);
    wrapper.update();
    wrapper
      .find('[testID="password-input"]')
      .first()
      .props()
      .onChangeText(password);
    wrapper.update();
    wrapper
      .find('[testID="login-button"]')
      .first()
      .props()
      .onPress();
    expect(props.login).lastCalledWith(email, password);
  });
});
