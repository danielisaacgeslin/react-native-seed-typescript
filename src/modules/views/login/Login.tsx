import React, { useEffect, useState, memo, useCallback } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from 'react-native-elements';

import { ENV, STYLE } from '../../../constants';
import styles from './styles';

export interface ILoginProps {
  isLoading: boolean;
  hasError: boolean;
  navigation: NavigationScreenProp<any, any>;
  isAndroid?: boolean;
  login: (email: string, password: string) => void;
  setNavigation: (navigation: NavigationScreenProp<any, any>) => void;
  checkForUpdates: () => void;
}

export interface ILoginState {
  email: string;
  password: string;
}

const Login = ({ navigation, hasError, isLoading, login, setNavigation, checkForUpdates, isAndroid = ENV.PLATFORM.IS_ANDROID }: ILoginProps) => {
  const [state, setState] = useState<ILoginState>({ email: 'fake@email.com', password: 'password' });

  const onChangeEmail = useCallback((email: string) => setState({ ...state, email }), [state, setState]);
  const onChangePassword = useCallback((password: string) => setState({ ...state, password }), [state, setState]);
  const onLogin = useCallback(() => login(state.email, state.password), [login, state]);

  useEffect(() => {
    setNavigation(navigation);
    checkForUpdates();
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer} keyboardVerticalOffset={isAndroid ? ENV.KEYBOARD_VERTICAL_OFFSET : 0}>
        {hasError ? <Text style={styles.headingError}>Oops! Invalid email or password</Text> : null}
        <Text style={styles.heading1}>React Native Seed</Text>
        <Text style={styles.heading2}>Please login to your account</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>EMAIL:</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter your email..."
            placeholderTextColor={STYLE.COLOR.OCTANARY}
            style={[styles.input, hasError && styles.inputError]}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={state.email}
            onChangeText={onChangeEmail}
            testID="email-input"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>PASSWORD</Text>
          <TextInput
            placeholder="Enter your password..."
            placeholderTextColor={STYLE.COLOR.OCTANARY}
            secureTextEntry={true}
            style={[styles.input, hasError && styles.inputError]}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={state.password}
            onChangeText={onChangePassword}
            testID="password-input"
          />
        </View>
        <Button loading={isLoading} disabled={isLoading} onPress={onLogin} title="Login" testID="login-button" disabledStyle={styles.buttonDisabled} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default memo(Login);
