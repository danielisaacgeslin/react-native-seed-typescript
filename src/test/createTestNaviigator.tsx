import React, { Children } from 'react';
import { NavigationParams, createAppContainer, createSwitchNavigator } from 'react-navigation';

export const createTestNavigator = (routeName: string = 'TestScreen', additionalRouteMap: { [routeName: string]: any } = {}, ref?: React.RefObject<any>) => ({
  children,
  params
}: {
  children: any;
  params?: NavigationParams;
}) => {
  const Navigator = createAppContainer(
    createSwitchNavigator({
      [routeName]: { screen: () => Children.only(children), params } as any,
      ...additionalRouteMap
    })
  );
  return <Navigator ref={ref} />;
};
