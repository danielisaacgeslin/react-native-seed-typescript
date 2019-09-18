import React from 'react';
import { fireEvent, render, RenderAPI } from 'react-native-testing-library';

import Login, { ILoginProps } from './Login';

describe('Login', () => {
  let props: ILoginProps;
  let wrapper: RenderAPI;

  beforeEach(() => {
    props = {
      isLoading: false,
      hasError: false,
      login: jest.fn(),
      setNavigation: jest.fn(),
      navigation: jest.fn() as any,
      checkForUpdates: jest.fn()
    };
    wrapper = render(<Login {...props} />);
  });

  it('should render', () => {
    props.isAndroid = false;
    wrapper = render(<Login {...props} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
    expect(props.setNavigation).toBeCalledWith(props.navigation);
    expect(props.checkForUpdates).toBeCalled();
  });

  it('should render on Android', () => {
    props.isAndroid = true;
    wrapper = render(<Login {...props} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render with errors', () => {
    props.hasError = true;
    wrapper = render(<Login {...props} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should login', () => {
    const email = 'mail@mail.mail';
    const password = 'psw';
    fireEvent.changeText(wrapper.getByTestId('email-input'), email);
    fireEvent.changeText(wrapper.getByTestId('password-input'), password);
    fireEvent.press(wrapper.getByTestId('login-button'));
    expect(props.login).lastCalledWith(email, password);
  });
});
