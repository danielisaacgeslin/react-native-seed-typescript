import { NavigationService } from './NavigationService';

describe('NavigationService', () => {
  let navigationService: NavigationService;
  beforeEach(() => {
    navigationService = new NavigationService();
  });

  it('should set navigation one time', () => {
    const navigation = jest.fn() as any;
    navigationService.setNavigation(navigation);
    navigationService.setNavigation(undefined as any);
    expect(navigationService.navigation).toBe(navigation);
  });
});
