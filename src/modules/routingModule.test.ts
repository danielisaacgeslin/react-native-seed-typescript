import stackNavigator from './routingModule';

jest.mock('react-native-elements', () => {
  const mockComponent = require('../../mockComponent').default;
  const Icon = mockComponent('Icon');
  return { Icon };
});

describe('routingModule', () => {
  // global.console.warn = () => { /** */ };
  it('should have the stack navigator', () => {
    expect(stackNavigator).toEqual(expect.any(Function));
  });
});
