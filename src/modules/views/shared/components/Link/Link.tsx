import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';

import { Logger } from '../../../../services/Logger';
import Styles from './styles';

export interface ILinkProps {
  url: string;
  text?: string;
}

export default class Link extends React.PureComponent<ILinkProps> {
  public static linking: Linking = Linking;

  public render() {
    const { url, text } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text style={Styles.link}>{text || url}</Text>
      </TouchableOpacity>
    );
  }

  private onPress = async () => {
    const { url } = this.props;
    try {
      const supported = await Link.linking.canOpenURL(url);
      if (supported) Link.linking.openURL(url);
    } catch (e) {
      Logger.error('Error linking', e);
    }
  };
}
