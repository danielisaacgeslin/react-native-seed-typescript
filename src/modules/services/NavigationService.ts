import { NavigationScreenProp } from 'react-navigation';

export class NavigationService {
  public navigation: NavigationScreenProp<any, any>;

  public setNavigation(navigation: NavigationScreenProp<any, any>): void {
    if (navigation) this.navigation = navigation;
  }
}
