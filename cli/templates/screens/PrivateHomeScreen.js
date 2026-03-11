/**
 * PrivateHomeScreen Template
 * Template for the private/home screen (authenticated access)
 */

const PRIVATE_HOME_SCREEN_TEMPLATE = `import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
{{NAVIGATION_IMPORT}}
import { useTranslation } from 'react-i18next';
{{I18N_IMPORTS}}

{{NAVIGATION_TYPE}}

{{FUNCTION_SIGNATURE}}
  const { t } = useTranslation();
  {{NAVIGATION_HOOK}}
  {{CURRENT_LOCALE}}

  const switchLocale = useCallback(
    (locale: string) => () => {
      switchLocaleTo(locale);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{t('PrivateHomeScreen.welcome')}</Text>
      <Text style={styles.title}>{t('PrivateHomeScreen.title')}</Text>
      <Text style={styles.description}>
        {t('PrivateHomeScreen.description')}
      </Text>

{{STACK_SCREEN_BUTTONS}}

      <View style={styles.languageButtonsContainer}>
        <Pressable
          style={[
            styles.languageButton,
            currentLocale === 'it'
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={switchLocale('it')}
        >
          <Text style={styles.languageButtonText}>{t('common.italian')}</Text>
        </Pressable>

        <Pressable
          style={[
            styles.languageButton,
            currentLocale === 'en'
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={switchLocale('en')}
        >
          <Text style={styles.languageButtonText}>{t('common.english')}</Text>
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
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 10,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7f8c8d',
    lineHeight: 24,
  },
  detailsButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  languageButton: {
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#27ae60',
  },
  inactiveButton: {
    backgroundColor: '#e67e22',
  },
  languageButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
  },
});

export default PrivateHomeScreen;
`;

function getPrivateHomeScreenTemplate(framework, options = {}) {
  const { renderTemplate, FRAMEWORKS, applyTheme, getNavigateMethod } = require('./adapter');

  let template = PRIVATE_HOME_SCREEN_TEMPLATE;

  // Handle i18n imports - navigation imports are handled by adapter
  if (framework === FRAMEWORKS.REACT_NAVIGATION) {
    template = template.replace(
      '{{I18N_IMPORTS}}',
      `import '@i18n/i18n';
import i18n from '@i18n/i18n';
import { switchLocaleTo } from '@i18n/utils';`
    );
    template = template.replace(
      '{{CURRENT_LOCALE}}',
      'const currentLocale = i18n.language;'
    );
  } else {
    template = template.replace(
      '{{I18N_IMPORTS}}',
      `import i18n from '@i18n/i18n';
import { switchLocaleTo } from '@i18n/utils';`
    );
    template = template.replace(
      '{{CURRENT_LOCALE}}',
      'const currentLocale = i18n.language;'
    );
  }

  // Generate navigation buttons for all private stack screens
  const privateStackScreens = options.privateStackScreens || ['Details'];
  const stackButtons = privateStackScreens
    .map((name) => {
      const navMethod = getNavigateMethod(framework, name);
      return `      <Pressable
        style={styles.detailsButton}
        onPress={() => ${navMethod}}
      >
        <Text style={styles.buttonText}>
          {t('PrivateHomeScreen.goTo${name}')}
        </Text>
      </Pressable>`;
    })
    .join('\n\n');

  template = template.replace('{{STACK_SCREEN_BUTTONS}}', stackButtons);

  let rendered = renderTemplate(template, framework, {
    screenName: 'PrivateHome',
    componentName: 'PrivateHomeScreen',
  });

  if (options.useTheme) {
    rendered = applyTheme(rendered);
  }

  return rendered;
}

module.exports = {
  PRIVATE_HOME_SCREEN_TEMPLATE,
  getPrivateHomeScreenTemplate,
};
