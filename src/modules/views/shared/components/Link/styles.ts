import { StyleSheet } from 'react-native';

import { STYLE } from '../../../../../constants';

export default StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    letterSpacing: 0.25,
    color: STYLE.COLOR.SECONDARY,
    fontSize: STYLE.FONT.SIZE.PARAGRAPH,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
    lineHeight: STYLE.FONT.SIZE.PARAGRAPH
  }
});
