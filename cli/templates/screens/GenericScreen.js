/**
 * GenericScreen Template
 * Generates a minimal screen for user-defined screen names
 */

const GENERIC_SCREEN_TEMPLATE_WITH_I18N = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

{{FUNCTION_SIGNATURE}}
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('{{SCREEN_NAME}}Screen.title')}</Text>
      <Text style={styles.description}>
        {t('{{SCREEN_NAME}}Screen.description')}
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

export default {{COMPONENT_NAME}};
`;

const GENERIC_SCREEN_TEMPLATE_NO_I18N = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

{{FUNCTION_SIGNATURE}}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{{SCREEN_TITLE}}</Text>
      <Text style={styles.description}>
        Welcome to the {{SCREEN_TITLE}} screen.
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

export default {{COMPONENT_NAME}};
`;

/**
 * Convert PascalCase to spaced title: "MyProfile" -> "My Profile"
 */
function toDisplayTitle(screenName) {
  return screenName.replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Get a rendered generic screen template
 * @param {string} framework - 'react-navigation' or 'expo-router'
 * @param {string} screenName - PascalCase name like 'About', 'FAQ', 'MyProfile'
 * @param {object} options - { useI18n: boolean, navTargets: string[], showBack: boolean, showLanguageSwitcher: boolean }
 */
function getGenericScreenTemplate(framework, screenName, options = {}) {
  const {
    renderTemplate,
    getNavigationImport,
    getNavigationHook,
    getNavigateMethod,
    getBackMethod,
    applyTheme,
  } = require('./adapter');
  const { useI18n = false, navTargets = [], showBack = false, showLanguageSwitcher = false, useTheme = false, showThemeToggle = false } = options;

  const componentName = `${screenName}Screen`;
  const displayTitle = toDisplayTitle(screenName);

  const template = useI18n
    ? GENERIC_SCREEN_TEMPLATE_WITH_I18N
    : GENERIC_SCREEN_TEMPLATE_NO_I18N;

  let rendered = renderTemplate(template, framework, {
    screenName,
    componentName,
  });

  // Replace generic placeholders
  rendered = rendered
    .replace(/\{\{SCREEN_NAME\}\}/g, screenName)
    .replace(/\{\{COMPONENT_NAME\}\}/g, componentName)
    .replace(/\{\{SCREEN_TITLE\}\}/g, displayTitle);

  // Inject navigation if navTargets or showBack is provided
  const hasNav = navTargets.length > 0 || showBack;
  if (hasNav) {
    // 1. Add Pressable to react-native import
    rendered = rendered.replace(
      /{ View, Text, StyleSheet }/,
      '{ View, Text, StyleSheet, Pressable }'
    );

    // 2. Add navigation import after last import line
    const navImport = getNavigationImport(framework);
    const lastImportIndex = rendered.lastIndexOf('import ');
    const lastImportEnd = rendered.indexOf('\n', lastImportIndex);
    rendered =
      rendered.slice(0, lastImportEnd + 1) +
      navImport +
      '\n' +
      rendered.slice(lastImportEnd + 1);

    // 3. Add navigation hook after function opening
    const navHook = getNavigationHook(framework, screenName);
    if (useI18n) {
      // Insert after useTranslation line
      rendered = rendered.replace(
        "const { t } = useTranslation();",
        `const { t } = useTranslation();\n  ${navHook}`
      );
    } else {
      // Insert after function signature opening brace
      const funcSigEnd = rendered.indexOf('{\n', rendered.indexOf('function '));
      rendered =
        rendered.slice(0, funcSigEnd + 2) +
        `  ${navHook}\n\n` +
        rendered.slice(funcSigEnd + 2);
    }

    // 4. Build navigation buttons
    const buttons = [];
    navTargets.forEach((target) => {
      const navMethod = getNavigateMethod(framework, target);
      const targetTitle = toDisplayTitle(target);
      const buttonLabel = useI18n
        ? `{t('common.goTo')} ${targetTitle}`
        : `Go to ${targetTitle}`;
      buttons.push(
        `        <Pressable style={styles.button} onPress={() => ${navMethod}}>` +
          '\n' +
          `          <Text style={styles.buttonText}>${buttonLabel}</Text>` +
          '\n' +
          `        </Pressable>`
      );
    });
    if (showBack) {
      const backMethod = getBackMethod(framework);
      const backLabel = useI18n
        ? `{t('common.goBack')}`
        : 'Go Back';
      buttons.push(
        `        <Pressable style={styles.button} onPress={() => ${backMethod}}>` +
          '\n' +
          `          <Text style={styles.buttonText}>${backLabel}</Text>` +
          '\n' +
          `        </Pressable>`
      );
    }

    const navSection =
      `      <View style={styles.navSection}>\n` +
      buttons.join('\n') +
      '\n' +
      `      </View>`;

    // 5. Insert nav section before closing </View>
    // Find the outermost closing </View> (the container)
    const lastViewClose = rendered.lastIndexOf('    </View>');
    rendered =
      rendered.slice(0, lastViewClose) +
      navSection +
      '\n' +
      rendered.slice(lastViewClose);

    // 6. Add button styles to StyleSheet
    rendered = rendered.replace(
      '});',
      `  navSection: {
    marginTop: 30,
    gap: 12,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});`
    );
  }

  // Inject language switcher if requested
  if (showLanguageSwitcher && useI18n) {
    // Add switchLocaleTo import
    const lastImportIndex = rendered.lastIndexOf('import ');
    const lastImportEnd = rendered.indexOf('\n', lastImportIndex);
    rendered =
      rendered.slice(0, lastImportEnd + 1) +
      "import { switchLocaleTo } from '@i18n/utils';\n" +
      rendered.slice(lastImportEnd + 1);

    // Add Pressable to react-native import if not already there
    if (!rendered.includes('Pressable')) {
      rendered = rendered.replace(
        /{ View, Text, StyleSheet }/,
        '{ View, Text, StyleSheet, Pressable }'
      );
    }

    // Build language switcher section
    const langSection =
      `      <View style={styles.langSection}>\n` +
      `        <Text style={styles.langTitle}>{t('common.language')}</Text>\n` +
      `        <View style={styles.langRow}>\n` +
      `          <Pressable style={styles.langButton} onPress={() => switchLocaleTo('en')}>\n` +
      `            <Text style={styles.langButtonText}>{t('common.english')}</Text>\n` +
      `          </Pressable>\n` +
      `          <Pressable style={styles.langButton} onPress={() => switchLocaleTo('it')}>\n` +
      `            <Text style={styles.langButtonText}>{t('common.italian')}</Text>\n` +
      `          </Pressable>\n` +
      `        </View>\n` +
      `      </View>`;

    // Insert before the closing </View> of the container
    const lastViewClose = rendered.lastIndexOf('    </View>');
    rendered =
      rendered.slice(0, lastViewClose) +
      langSection +
      '\n' +
      rendered.slice(lastViewClose);

    // Add language switcher styles
    rendered = rendered.replace(
      '});',
      `  langSection: {
    marginTop: 30,
    gap: 8,
  },
  langTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  langRow: {
    flexDirection: 'row',
    gap: 12,
  },
  langButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  langButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});`
    );
  }

  // Inject ThemeToggle component if requested
  if (showThemeToggle) {
    // Add ThemeToggle import after last import
    const lastImportIndex = rendered.lastIndexOf('import ');
    const lastImportEnd = rendered.indexOf('\n', lastImportIndex);
    rendered =
      rendered.slice(0, lastImportEnd + 1) +
      "import ThemeToggle from '@components/ThemeToggle';\n" +
      rendered.slice(lastImportEnd + 1);

    // Insert <ThemeToggle /> before the closing </View> of the container
    const lastViewClose = rendered.lastIndexOf('    </View>');
    rendered =
      rendered.slice(0, lastViewClose) +
      '      <ThemeToggle />\n' +
      rendered.slice(lastViewClose);
  }

  if (useTheme) {
    rendered = applyTheme(rendered);
  }

  return rendered;
}

module.exports = {
  GENERIC_SCREEN_TEMPLATE_WITH_I18N,
  GENERIC_SCREEN_TEMPLATE_NO_I18N,
  getGenericScreenTemplate,
  toDisplayTitle,
};
