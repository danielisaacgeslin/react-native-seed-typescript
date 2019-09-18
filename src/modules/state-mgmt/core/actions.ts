import { NavigationScreenProp } from 'react-navigation';

export enum ActionType {
  SET_NAVIGATION = '[core] set navigation',
  SET_NAVIGATION_SUCCESS = '[core] set navigation success',
  EPIC_ERROR = '[core] epic error',
  CHECK_FOR_UPDATES = '[core] checking for updates',
  BOOTSTRAP = '[core] bootstrap (token, get current user, etc?)'
}

export const actions = {
  setNavigation: (navigation: NavigationScreenProp<any, any>) => ({ type: ActionType.SET_NAVIGATION, payload: { navigation } }),
  setNavigationSuccess: () => ({ type: ActionType.SET_NAVIGATION_SUCCESS, payload: {} }),
  epicError: (error: any) => ({ type: ActionType.EPIC_ERROR, payload: { error } }),
  checkForUpdates: () => ({ type: ActionType.CHECK_FOR_UPDATES, payload: {} }),
  bootstrap: (accessToken: string) => ({ type: ActionType.BOOTSTRAP, payload: { accessToken } })
};
