import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Link from './Link';

describe('Link', () => {
  let props;
  beforeEach(() => {
    props = {
      url: 'https://url.jpg'
    };
  });
  it('should render', () => {
    const rendered = renderer.create(<Link {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should render with text', () => {
    props = {
      url: 'https://url.jpg',
      text: 'This is a Link'
    };
    const rendered = renderer.create(<Link {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should open a link', async () => {
    const url = 'https://google.com';
    const text = 'Google';
    Link.linking = {
      canOpenURL: jest.fn().mockReturnValue(Promise.resolve(true)),
      openURL: jest.fn()
    } as any;
    const wrapper = shallow(<Link {...props} />);
    wrapper.setProps({ url, text });
    await (wrapper
      .find('TouchableOpacity')
      .first()
      .prop('onPress') as any)();
    expect(Link.linking.canOpenURL).toBeCalledWith(url);
    expect(Link.linking.openURL).toBeCalledWith(url);
  });

  it('should not open a link', async () => {
    const url = 'https://google.com';
    const text = 'Google';
    Link.linking = {
      canOpenURL: jest.fn().mockReturnValue(Promise.resolve(false)),
      openURL: jest.fn()
    } as any;
    const wrapper = shallow(<Link {...props} />);
    wrapper.setProps({ url, text });
    await (wrapper
      .find('TouchableOpacity')
      .first()
      .prop('onPress') as any)();
    expect(Link.linking.canOpenURL).toBeCalledWith(url);
    expect(Link.linking.openURL).not.toBeCalledWith(url);
  });

  it('should catch error', () => {
    const url = 'https://google.com';
    Link.linking = {
      canOpenURL: () => {
        throw new Error('Error');
      }
    } as any;
    const wrapper = shallow(<Link {...props} />);
    wrapper.setProps({ url });
    (wrapper
      .find('TouchableOpacity')
      .first()
      .prop('onPress') as any)();
  });
});
