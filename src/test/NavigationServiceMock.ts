export class NavigationServiceMock {
  public navigation = {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
  };

  public setNavigation = jest.fn();
}
