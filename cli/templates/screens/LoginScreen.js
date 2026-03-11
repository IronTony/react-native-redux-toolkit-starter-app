/**
 * LoginScreen Template
 * Template for the login/authentication screen
 */

const LOGIN_SCREEN_TEMPLATE = `import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
{{NAVIGATION_IMPORT}}
import { useTranslation } from 'react-i18next';
import { useAuthClient } from '@auth';
import { useUserCredentials } from '@hooks/useUserCredentials';
import { useAsyncCallback } from '@hooks/useAsyncCallback';

{{NAVIGATION_TYPE}}

{{FUNCTION_SIGNATURE}}
  const { t } = useTranslation();
  {{NAVIGATION_HOOK}}
  const client = useAuthClient();
  const userCredentials = useUserCredentials();

  const [onLogin, isLoginLoading] = useAsyncCallback(
    () =>
      client.login({
        email: userCredentials.email,
        password: userCredentials.password,
      }),
    [client, userCredentials],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('LoginScreen.title')}</Text>
      <Text style={styles.subtitle}>{t('LoginScreen.subtitle')}</Text>

      <View style={styles.form}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          value={userCredentials.email}
          onChangeText={userCredentials.updateEmail}
          style={styles.textInputStyle}
          {{UNDERLINE_COLOR_ANDROID}}
          placeholder={t('LoginScreen.emailPlaceholder')}
          keyboardType="email-address"
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          value={userCredentials.password}
          onChangeText={userCredentials.updatePassword}
          style={styles.textInputStyle}
          {{UNDERLINE_COLOR_ANDROID}}
          placeholder={t('LoginScreen.passwordPlaceholder')}
        />

        <Pressable
          style={[styles.button, isLoginLoading && styles.buttonDisabled]}
          onPress={onLogin}
          disabled={isLoginLoading}
        >
          <Text style={styles.buttonText}>
            {isLoginLoading
              ? t('LoginScreen.loading')
              : t('LoginScreen.loginButton')}
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => {{BACK_METHOD}}}
          disabled={isLoginLoading}
        >
          <Text style={styles.backButtonText}>{t('LoginScreen.back')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7f8c8d',
  },
  form: {
    width: '100%',
    maxWidth: 350,
    gap: 15,
  },
  textInputStyle: {
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
  },
});

export default LoginScreen;
`;

function getLoginScreenTemplate(framework, options = {}) {
  const { renderTemplate, FRAMEWORKS, applyTheme } = require('./adapter');

  let template = LOGIN_SCREEN_TEMPLATE;

  // Handle underlineColorAndroid (only for React Navigation)
  // Replace all occurrences using global regex
  if (framework === FRAMEWORKS.REACT_NAVIGATION) {
    template = template.replace(
      /\{\{UNDERLINE_COLOR_ANDROID\}\}/g,
      'underlineColorAndroid="rgba(0,0,0,0)"'
    );
  } else {
    template = template.replace(/\{\{UNDERLINE_COLOR_ANDROID\}\}/g, '');
  }

  let rendered = renderTemplate(template, framework, {
    screenName: 'Login',
    componentName: 'LoginScreen',
  });

  if (options.useTheme) {
    rendered = applyTheme(rendered);
  }

  return rendered;
}

module.exports = {
  LOGIN_SCREEN_TEMPLATE,
  getLoginScreenTemplate,
};
