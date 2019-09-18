/*
  @flow
  @providesModule mockComponent
*/
import React from 'react';

export default function mockComponent(name: string) {
  return (props) => React.createElement(name, props, props.children);
}
