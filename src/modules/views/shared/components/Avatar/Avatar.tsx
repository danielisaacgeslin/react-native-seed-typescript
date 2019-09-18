import React from 'react';
import { Image } from 'react-native';

import Style from './styles';

export interface IAvatarProps {
  avatar: string;
}

export default class Avatar extends React.PureComponent<IAvatarProps> {
  public render() {
    const { avatar } = this.props;
    return <Image style={Style.avatar} source={{ uri: avatar }} />;
  }
}
