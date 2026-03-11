/**
 * ProfileScreen Template
 * Template for the user profile screen
 */

const PROFILE_SCREEN_TEMPLATE = `import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthClient } from '@auth';
import { useAsyncCallback } from '@hooks/useAsyncCallback';
{{NAVIGATION_IMPORTS}}
{{EXPO_ROUTER_IMPORT}}

{{FUNCTION_SIGNATURE}}
  const { t } = useTranslation();
  {{NAVIGATION_HOOK}}
  const client = useAuthClient();
  const { tokens } = client;

  const [onLogout, isLogoutLoading] = useAsyncCallback(async () => {
    await client.logout();
    {{LOGOUT_NAVIGATION}}
  }, [client]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('ProfileScreen.title')}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('ProfileScreen.accessToken')}</Text>
        <Text style={styles.value} numberOfLines={1} ellipsizeMode="middle">
          {tokens?.access_token || '-'}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('ProfileScreen.refreshToken')}</Text>
        <Text style={styles.value} numberOfLines={1} ellipsizeMode="middle">
          {tokens?.refresh_token || '-'}
        </Text>
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={onLogout}
        disabled={!client.isAuthenticated || isLogoutLoading}
      >
        <Text style={styles.logoutButtonText}>{t('ProfileScreen.logout')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
  },
  infoContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: '#2c3e50',
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProfileScreen;
`;

function getProfileScreenTemplate(framework, options = {}) {
  const { renderTemplate, FRAMEWORKS, getReplaceMethod, applyTheme } = require('./adapter');

  let template = PROFILE_SCREEN_TEMPLATE;

  // Handle navigation imports
  if (framework === FRAMEWORKS.REACT_NAVIGATION) {
    template = template.replace(
      '{{NAVIGATION_IMPORTS}}',
      "import { useNavigation } from '@react-navigation/native';"
    );
    template = template.replace(
      '{{NAVIGATION_HOOK}}',
      `const navigation = useNavigation();`
    );
    template = template.replace('{{EXPO_ROUTER_IMPORT}}', '');
    template = template.replace(
      '{{LOGOUT_NAVIGATION}}',
      `return navigation.navigate('Intro');`
    );
  } else {
    template = template.replace('{{NAVIGATION_IMPORTS}}', '');
    template = template.replace(
      '{{NAVIGATION_HOOK}}',
      'const router = useRouter();'
    );
    template = template.replace(
      '{{EXPO_ROUTER_IMPORT}}',
      "import { useRouter } from 'expo-router';"
    );
    template = template.replace(
      '{{LOGOUT_NAVIGATION}}',
      `router.replace('/intro');`
    );
  }

  let rendered = renderTemplate(template, framework, {
    screenName: 'Profile',
    componentName: 'ProfileScreen',
  });

  if (options.useTheme) {
    rendered = applyTheme(rendered);
  }

  return rendered;
}

module.exports = {
  PROFILE_SCREEN_TEMPLATE,
  getProfileScreenTemplate,
};
