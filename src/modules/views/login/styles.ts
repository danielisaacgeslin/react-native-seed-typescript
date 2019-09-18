import { StyleSheet, Platform } from 'react-native';
import { STYLE } from '../../../constants';

export default StyleSheet.create({
  heading1: {
    color: STYLE.COLOR.PRIMARY,
    fontSize: STYLE.FONT.SIZE.HEADING_1,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'left'
  },
  heading2: {
    color: STYLE.COLOR.QUATERNARY,
    fontSize: STYLE.FONT.SIZE.HEADING_2,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    letterSpacing: 0.2,
    marginBottom: 30
  },
  headingError: {
    color: STYLE.COLOR.NONARY,
    fontSize: STYLE.FONT.SIZE.PARAGRAPH_SMALL,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    marginTop: 8
  },
  inputContainer: {
    marginBottom: 32
  },
  input: {
    borderColor: STYLE.COLOR.OCTANARY,
    borderRadius: 4,
    borderWidth: 1,
    color: STYLE.COLOR.SENARY,
    fontSize: STYLE.FONT.SIZE.PARAGRAPH,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    padding: 16,
    ...Platform.select({
      android: { paddingVertical: 12 }
    })
  },
  inputError: {
    borderColor: STYLE.COLOR.NONARY,
    borderWidth: 1
  },
  inputLabel: {
    color: STYLE.COLOR.QUATERNARY,
    fontSize: STYLE.FONT.SIZE.PARAGRAPH_SMALL,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
    marginBottom: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20
  },
  keyboardContainer: {
    paddingHorizontal: 20
  },
  buttonDisabled: {
    backgroundColor: STYLE.COLOR.QUATERNARY
  }
});
