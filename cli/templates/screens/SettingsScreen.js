/**
 * SettingsScreen Template
 * Template for the settings screen
 * When theming is enabled, includes a theme toggle (Light / Dark / System)
 */

const SETTINGS_SCREEN_TEMPLATE = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

{{FUNCTION_SIGNATURE}}
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('SettingsScreen.title')}</Text>
      <Text style={styles.description}>
        {t('SettingsScreen.description')}
      </Text>
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
    marginBottom: 20,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
  },
});

export default SettingsScreen;
`;

const SETTINGS_SCREEN_TEMPLATE_WITH_THEME = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import ThemeToggle from '@components/ThemeToggle';

{{FUNCTION_SIGNATURE}}
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {t('SettingsScreen.title')}
      </Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        {t('SettingsScreen.description')}
      </Text>

      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SettingsScreen;
`;

function getSettingsScreenTemplate(framework, options = {}) {
  const { renderTemplate } = require('./adapter');

  const template = options.useTheme
    ? SETTINGS_SCREEN_TEMPLATE_WITH_THEME
    : SETTINGS_SCREEN_TEMPLATE;

  return renderTemplate(template, framework, {
    screenName: 'Settings',
    componentName: 'SettingsScreen',
  });
}

module.exports = {
  SETTINGS_SCREEN_TEMPLATE,
  SETTINGS_SCREEN_TEMPLATE_WITH_THEME,
  getSettingsScreenTemplate,
};
