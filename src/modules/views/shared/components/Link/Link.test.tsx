import React from 'react';
import { fireEvent, render, RenderAPI } from 'react-native-testing-library';

import Link from './Link';

describe('Link', () => {
  let props;
  let wrapper: RenderAPI;

  beforeEach(() => {
    props = {
      url: 'https://url.jpg'
    };
    wrapper = render(<Link {...props} />);
  });

  it('should render', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should render with text', () => {
    props = {
      url: 'https://url.jpg',
      text: 'This is a Link'
    };
    wrapper = render(<Link {...props} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should open a link', done => {
    const url = 'https://google.com';
    const text = 'Google';
    Link.linking = {
      canOpenURL: jest.fn().mockReturnValue(Promise.resolve(true)),
      openURL: jest.fn()
    } as any;
    wrapper = render(<Link {...props} />);
    wrapper.update(<Link {...props} text={text} url={url} />);
    fireEvent.press(wrapper.getByTestId('link'));
    setTimeout(() => {
      expect(Link.linking.canOpenURL).toBeCalledWith(url);
      expect(Link.linking.openURL).toBeCalledWith(url);
      done();
    });
  });

  it('should not open a link', done => {
    const url = 'https://google.com';
    const text = 'Google';
    Link.linking = {
      canOpenURL: jest.fn().mockReturnValue(Promise.resolve(false)),
      openURL: jest.fn()
    } as any;
    wrapper = render(<Link {...props} />);
    wrapper.update(<Link {...props} text={text} url={url} />);
    fireEvent.press(wrapper.getByTestId('link'));
    setTimeout(() => {
      expect(Link.linking.canOpenURL).toBeCalledWith(url);
      expect(Link.linking.openURL).not.toBeCalledWith(url);
      done();
    });
  });

  it('should catch error', () => {
    const url = 'https://google.com';
    Link.linking = {
      canOpenURL: () => {
        throw new Error('Error');
      }
    } as any;
    wrapper = render(<Link {...props} />);
    wrapper.update(<Link {...props} url={url} />);
    fireEvent.press(wrapper.getByTestId('link'));
  });
});
