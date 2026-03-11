/**
 * Dynamic Screen Generation
 * Creates screen files based on user-defined screen config (non-auth flow)
 */

const fs = require('fs');
const path = require('path');
const { log } = require('../utils/logger');
const {
  getScreenTemplateForName,
  FRAMEWORKS,
  getScreenFile,
} = require('../templates/screens');
const { convertToExpoRouterPath } = require('../templates/screens/adapter');
const { toDisplayTitle } = require('../templates/screens/GenericScreen');
const { NAVIGATION_PATTERNS } = require('../utils/screen-config');

const DEFAULT_ICONS = {
  0: '🏠',
  1: '👤',
  2: '⚙️',
  3: '📋',
  4: '🔔',
  5: '💬',
};

function hasSettingsScreen(screenConfig) {
  const { getAllScreenNames } = require('../utils/screen-config');
  return getAllScreenNames(screenConfig).some((n) => n === 'Settings');
}

// ─── Screen File Creation ──────────────────────────────────────────────

/**
 * Create screens dynamically based on screen config (non-auth flow only)
 */
function createDynamicScreens(projectPath, screenConfig, options) {
  const { useExpoRouter, useI18n, useTheme } = options;
  const pattern = screenConfig.navigationPattern || NAVIGATION_PATTERNS.STACK;
  const framework = useExpoRouter
    ? FRAMEWORKS.EXPO_ROUTER
    : FRAMEWORKS.REACT_NAVIGATION;

  if (pattern === NAVIGATION_PATTERNS.STACK) {
    createStackScreenFiles(
      projectPath,
      screenConfig,
      framework,
      useExpoRouter,
      useI18n,
      useTheme,
    );
  } else if (pattern === NAVIGATION_PATTERNS.TABS) {
    createTabScreenFiles(
      projectPath,
      screenConfig,
      framework,
      useExpoRouter,
      useI18n,
      useTheme,
    );
  } else if (pattern === NAVIGATION_PATTERNS.DRAWER) {
    createDrawerScreenFiles(
      projectPath,
      screenConfig,
      framework,
      useExpoRouter,
      useI18n,
      useTheme,
    );
  } else if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
    createTabDrawerScreenFiles(
      projectPath,
      screenConfig,
      framework,
      useExpoRouter,
      useI18n,
      useTheme,
    );
  }

  // Update i18n translations if enabled
  if (useI18n) {
    const { getAllScreenNames } = require('../utils/screen-config');
    updateDynamicScreenTranslations(
      projectPath,
      getAllScreenNames(screenConfig),
      screenConfig,
      useTheme,
    );
  }

  const { getAllScreenNames } = require('../utils/screen-config');
  const allScreens = getAllScreenNames(screenConfig);
  log.success(
    `${allScreens.length} screen(s) created: ${allScreens.join(', ')}`,
  );
}

function createStackScreenFiles(
  projectPath,
  screenConfig,
  framework,
  useExpoRouter,
  useI18n,
  useTheme,
) {
  const screensDir = useExpoRouter
    ? path.join(projectPath, 'app')
    : path.join(projectPath, 'src', 'screens');
  ensureDir(screensDir);

  const screens = screenConfig.screens;
  const needsThemeToggle = useTheme && !hasSettingsScreen(screenConfig);
  screens.forEach((screenName, index) => {
    const opts = { useI18n, useTheme };
    if (index === 0) {
      const otherScreens = screens.slice(1);
      if (otherScreens.length > 0) {
        opts.navTargets = otherScreens;
      }
      if (useI18n) {
        opts.showLanguageSwitcher = true;
      }
      if (needsThemeToggle) {
        opts.showThemeToggle = true;
      }
    }
    const template = getScreenTemplateForName(framework, screenName, opts);
    let fileName;
    if (useExpoRouter && index === 0) {
      fileName = 'index.tsx';
    } else {
      fileName = getScreenFile(framework, `${screenName}Screen`);
    }
    fs.writeFileSync(path.join(screensDir, fileName), template);
  });
}

function createTabScreenFiles(
  projectPath,
  screenConfig,
  framework,
  useExpoRouter,
  useI18n,
  useTheme,
) {
  const stackScreens = screenConfig.stackScreens || [];
  const needsThemeToggle = useTheme && !hasSettingsScreen(screenConfig);

  if (useExpoRouter) {
    // Tab screens go in app/(tabs)/
    const tabsDir = path.join(projectPath, 'app', '(tabs)');
    ensureDir(tabsDir);
    screenConfig.tabScreens.forEach((name, index) => {
      const opts = { useI18n, useTheme };
      if (index === 0 && stackScreens.length > 0) {
        opts.navTargets = stackScreens;
      }
      if (index === 0 && useI18n) {
        opts.showLanguageSwitcher = true;
      }
      if (index === 0 && needsThemeToggle) {
        opts.showThemeToggle = true;
      }
      const template = getScreenTemplateForName(framework, name, opts);
      const fileName =
        index === 0 ? 'index.tsx' : convertToExpoRouterPath(name) + '.tsx';
      fs.writeFileSync(path.join(tabsDir, fileName), template);
    });
    // Stack screens go in app/
    const appDir = path.join(projectPath, 'app');
    stackScreens.forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
        showBack: true,
      });
      const fileName = convertToExpoRouterPath(name) + '.tsx';
      fs.writeFileSync(path.join(appDir, fileName), template);
    });
  } else {
    // React Navigation: all screens in src/screens/
    const screensDir = path.join(projectPath, 'src', 'screens');
    ensureDir(screensDir);
    screenConfig.tabScreens.forEach((name, index) => {
      const opts = { useI18n, useTheme };
      if (index === 0 && stackScreens.length > 0) {
        opts.navTargets = stackScreens;
      }
      if (index === 0 && useI18n) {
        opts.showLanguageSwitcher = true;
      }
      if (index === 0 && needsThemeToggle) {
        opts.showThemeToggle = true;
      }
      const template = getScreenTemplateForName(framework, name, opts);
      const fileName = getScreenFile(framework, `${name}Screen`);
      fs.writeFileSync(path.join(screensDir, fileName), template);
    });
    stackScreens.forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
        showBack: true,
      });
      const fileName = getScreenFile(framework, `${name}Screen`);
      fs.writeFileSync(path.join(screensDir, fileName), template);
    });
  }
}

function createDrawerScreenFiles(
  projectPath,
  screenConfig,
  framework,
  useExpoRouter,
  useI18n,
  useTheme,
) {
  const stackScreens = screenConfig.stackScreens || [];
  const needsThemeToggle = useTheme && !hasSettingsScreen(screenConfig);

  if (useExpoRouter) {
    // Drawer screens go in app/(drawer)/
    const drawerDir = path.join(projectPath, 'app', '(drawer)');
    ensureDir(drawerDir);
    screenConfig.drawerScreens.forEach((name, index) => {
      const opts = { useI18n, useTheme };
      if (index === 0 && stackScreens.length > 0) {
        opts.navTargets = stackScreens;
      }
      if (index === 0 && useI18n) {
        opts.showLanguageSwitcher = true;
      }
      if (index === 0 && needsThemeToggle) {
        opts.showThemeToggle = true;
      }
      const template = getScreenTemplateForName(framework, name, opts);
      const fileName =
        index === 0 ? 'index.tsx' : convertToExpoRouterPath(name) + '.tsx';
      fs.writeFileSync(path.join(drawerDir, fileName), template);
    });
    // Stack screens go in app/
    const appDir = path.join(projectPath, 'app');
    stackScreens.forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
        showBack: true,
      });
      const fileName = convertToExpoRouterPath(name) + '.tsx';
      fs.writeFileSync(path.join(appDir, fileName), template);
    });
  } else {
    // React Navigation: all screens in src/screens/
    const screensDir = path.join(projectPath, 'src', 'screens');
    ensureDir(screensDir);
    screenConfig.drawerScreens.forEach((name, index) => {
      const opts = { useI18n, useTheme };
      if (index === 0 && stackScreens.length > 0) {
        opts.navTargets = stackScreens;
      }
      if (index === 0 && useI18n) {
        opts.showLanguageSwitcher = true;
      }
      if (index === 0 && needsThemeToggle) {
        opts.showThemeToggle = true;
      }
      const template = getScreenTemplateForName(framework, name, opts);
      const fileName = getScreenFile(framework, `${name}Screen`);
      fs.writeFileSync(path.join(screensDir, fileName), template);
    });
    stackScreens.forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
        showBack: true,
      });
      const fileName = getScreenFile(framework, `${name}Screen`);
      fs.writeFileSync(path.join(screensDir, fileName), template);
    });
  }
}

function createTabDrawerScreenFiles(
  projectPath,
  screenConfig,
  framework,
  useExpoRouter,
  useI18n,
  useTheme,
) {
  const stackScreens = screenConfig.stackScreens || [];
  const needsThemeToggle = useTheme && !hasSettingsScreen(screenConfig);

  if (useExpoRouter) {
    // Tab screens go in app/(drawer)/(tabs)/
    const tabsDir = path.join(projectPath, 'app', '(drawer)', '(tabs)');
    ensureDir(tabsDir);
    screenConfig.tabScreens.forEach((name, index) => {
      const opts = { useI18n, useTheme };
      if (index === 0 && stackScreens.length > 0) {
        opts.navTargets = stackScreens;
      }
      if (index === 0 && useI18n) {
        opts.showLanguageSwitcher = true;
      }
      if (index === 0 && needsThemeToggle) {
        opts.showThemeToggle = true;
      }
      const template = getScreenTemplateForName(framework, name, opts);
      const fileName =
        index === 0 ? 'index.tsx' : convertToExpoRouterPath(name) + '.tsx';
      fs.writeFileSync(path.join(tabsDir, fileName), template);
    });
    // Drawer-only screens go in app/(drawer)/
    const drawerDir = path.join(projectPath, 'app', '(drawer)');
    (screenConfig.drawerScreens || []).forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
      });
      const fileName = convertToExpoRouterPath(name) + '.tsx';
      fs.writeFileSync(path.join(drawerDir, fileName), template);
    });
    // Stack screens go in app/
    const appDir = path.join(projectPath, 'app');
    stackScreens.forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
        showBack: true,
      });
      const fileName = convertToExpoRouterPath(name) + '.tsx';
      fs.writeFileSync(path.join(appDir, fileName), template);
    });
  } else {
    // React Navigation: all screens in src/screens/
    const screensDir = path.join(projectPath, 'src', 'screens');
    ensureDir(screensDir);
    screenConfig.tabScreens.forEach((name, index) => {
      const opts = { useI18n, useTheme };
      if (index === 0 && stackScreens.length > 0) {
        opts.navTargets = stackScreens;
      }
      if (index === 0 && useI18n) {
        opts.showLanguageSwitcher = true;
      }
      if (index === 0 && needsThemeToggle) {
        opts.showThemeToggle = true;
      }
      const template = getScreenTemplateForName(framework, name, opts);
      const fileName = getScreenFile(framework, `${name}Screen`);
      fs.writeFileSync(path.join(screensDir, fileName), template);
    });
    (screenConfig.drawerScreens || []).forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
      });
      const fileName = getScreenFile(framework, `${name}Screen`);
      fs.writeFileSync(path.join(screensDir, fileName), template);
    });
    stackScreens.forEach((name) => {
      const template = getScreenTemplateForName(framework, name, {
        useI18n,
        useTheme,
        showBack: true,
      });
      const fileName = getScreenFile(framework, `${name}Screen`);
      fs.writeFileSync(path.join(screensDir, fileName), template);
    });
  }
}

// ─── Navigation Types (React Navigation) ───────────────────────────────

/**
 * Generate navigation.d.ts for React Navigation
 */
function generateNavTypes(screenConfig) {
  // Auth flow configs use a different shape. auth.js overwrites this file later,
  // but we need a valid placeholder to avoid crashing here
  if (screenConfig.hasAuth) {
    return generateAuthNavTypes(screenConfig);
  }

  const pattern = screenConfig.navigationPattern || NAVIGATION_PATTERNS.STACK;

  if (pattern === NAVIGATION_PATTERNS.STACK) {
    return generateStackNavTypes(screenConfig);
  }
  if (pattern === NAVIGATION_PATTERNS.TABS) {
    return generateTabNavTypes(screenConfig);
  }
  if (pattern === NAVIGATION_PATTERNS.DRAWER) {
    return generateDrawerNavTypes(screenConfig);
  }
  if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
    return generateTabDrawerNavTypes(screenConfig);
  }
  return generateStackNavTypes(screenConfig);
}

function generateStackNavTypes(screenConfig) {
  const screens = screenConfig.screens;
  const stackEntries = screens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');

  return `/**
 * Navigation types for React Navigation
 * Learn more: https://reactnavigation.org/docs/typescript/
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root Stack Navigator Param List
 * Define all your route names and their params here
 */
export type RootStackParamList = {
${stackEntries}
};

/**
 * Helper type for screen props
 * Usage: type Props = RootStackScreenProps<'${screens[0]}'>;
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/**
 * Global type declaration for React Navigation
 * This makes the types available to useNavigation, Link, etc.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}`;
}

function generateAuthNavTypes(screenConfig) {
  const rootScreens = [
    ...(screenConfig.fixedScreens || []),
    ...(screenConfig.publicScreens || []),
    'MainTabs',
    ...(screenConfig.privateStackScreens || []),
  ];
  const rootEntries = rootScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');
  const tabEntries = (screenConfig.privateTabScreens || [])
    .map((name) => `  ${name}: undefined;`)
    .join('\n');

  return `/**
 * Navigation types for React Navigation
 * Learn more: https://reactnavigation.org/docs/typescript/
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
${rootEntries}
};

export type TabParamList = {
${tabEntries}
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}`;
}

function generateTabNavTypes(screenConfig) {
  const rootScreens = ['MainTabs', ...(screenConfig.stackScreens || [])];
  const rootEntries = rootScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');
  const tabEntries = screenConfig.tabScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');

  return `/**
 * Navigation types for React Navigation
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
${rootEntries}
};

export type TabParamList = {
${tabEntries}
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}`;
}

function generateDrawerNavTypes(screenConfig) {
  const rootScreens = ['MainDrawer', ...(screenConfig.stackScreens || [])];
  const rootEntries = rootScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');
  const drawerEntries = screenConfig.drawerScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');

  return `/**
 * Navigation types for React Navigation
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps as RNDrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
${rootEntries}
};

export type DrawerParamList = {
${drawerEntries}
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type DrawerScreenProps<T extends keyof DrawerParamList> = CompositeScreenProps<
  RNDrawerScreenProps<DrawerParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}`;
}

function generateTabDrawerNavTypes(screenConfig) {
  const rootScreens = ['MainDrawer', ...(screenConfig.stackScreens || [])];
  const rootEntries = rootScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');
  const tabEntries = screenConfig.tabScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');
  const drawerScreens = ['MainTabs', ...(screenConfig.drawerScreens || [])];
  const drawerEntries = drawerScreens
    .map((name) => `  ${name}: undefined;`)
    .join('\n');

  return `/**
 * Navigation types for React Navigation
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps as RNDrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
${rootEntries}
};

export type DrawerParamList = {
${drawerEntries}
};

export type TabParamList = {
${tabEntries}
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type DrawerScreenProps<T extends keyof DrawerParamList> = CompositeScreenProps<
  RNDrawerScreenProps<DrawerParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RNDrawerScreenProps<DrawerParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}`;
}

// ─── AppNavigator (React Navigation) ───────────────────────────────────

/**
 * Generate AppNavigator.tsx for React Navigation with dynamic screens
 */
function generateAppNavigator(screenConfig, useI18n, useTheme = false) {
  // Auth flow configs use a different shape. auth-navigator.js overwrites this file later,
  // but we need a valid placeholder to avoid crashing here
  if (screenConfig.hasAuth) {
    return generateAuthAppNavigator(screenConfig, useI18n, useTheme);
  }

  const pattern = screenConfig.navigationPattern || NAVIGATION_PATTERNS.STACK;

  if (pattern === NAVIGATION_PATTERNS.STACK) {
    return generateStackAppNavigator(screenConfig, useI18n, useTheme);
  }
  if (pattern === NAVIGATION_PATTERNS.TABS) {
    return generateTabAppNavigator(screenConfig, useI18n, useTheme);
  }
  if (pattern === NAVIGATION_PATTERNS.DRAWER) {
    return generateDrawerAppNavigator(screenConfig, useI18n, useTheme);
  }
  if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
    return generateTabDrawerAppNavigator(screenConfig, useI18n, useTheme);
  }
  return generateStackAppNavigator(screenConfig, useI18n, useTheme);
}

function generateStackAppNavigator(screenConfig, useI18n, useTheme = false) {
  const screens = screenConfig.screens;
  const initialScreen = screenConfig.initialScreen;

  const imports = screens
    .map((name) => `import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const screenEntries = screens
    .map(
      (name) =>
        `        <Stack.Screen
          name="${name}"
          component={${name}Screen}
          options={{ title: ${useI18n ? `t('${name}Screen.title')` : `'${name}'`} }}
        />`,
    )
    .join('\n');

  const themeImport = useTheme
    ? "import { useTheme, toNavigationTheme } from '@theme';"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);'
    : '';
  const navContainerTheme = useTheme ? ' theme={navigationTheme}' : '';

  return `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
${imports}
import type { RootStackParamList } from '@navigation';
${useI18n ? "import '@i18n/i18n';" : ''}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <NavigationContainer${navContainerTheme}>
      <Stack.Navigator initialRouteName="${initialScreen}">
${screenEntries}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;`;
}

function generateAuthAppNavigator(screenConfig, useI18n, useTheme = false) {
  // Placeholder AppNavigator for auth flow. auth-navigator.js overwrites this
  const allScreens = [
    ...(screenConfig.fixedScreens || []),
    ...(screenConfig.publicScreens || []),
    ...(screenConfig.privateTabScreens || []),
    ...(screenConfig.privateStackScreens || []),
  ];

  const imports = allScreens
    .map((name) => `// import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const themeImport = useTheme
    ? "import { useTheme, toNavigationTheme } from '@theme';"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);'
    : '';
  const navContainerTheme = useTheme ? ' theme={navigationTheme}' : '';

  return `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation';
${imports}
${useI18n ? "import '@i18n/i18n';" : ''}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <NavigationContainer${navContainerTheme}>
      <Stack.Navigator>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;`;
}

function generateTabAppNavigator(screenConfig, useI18n, useTheme = false) {
  const stackScreens = screenConfig.stackScreens || [];

  const stackImports = stackScreens
    .map((name) => `import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const stackScreenEntries = stackScreens
    .map(
      (name) =>
        `        <Stack.Screen
          name="${name}"
          component={${name}Screen}
          options={{ headerShown: true, title: ${useI18n ? `t('${name}Screen.title')` : `'${name}'`} }}
        />`,
    )
    .join('\n');

  const themeImport = useTheme
    ? "import { useTheme, toNavigationTheme } from '@theme';"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);'
    : '';
  const navContainerTheme = useTheme ? ' theme={navigationTheme}' : '';

  return `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation';
import TabNavigator from './navigators/TabNavigator';
${stackImports}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <NavigationContainer${navContainerTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
${stackScreenEntries}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;`;
}

function generateDrawerAppNavigator(screenConfig, useI18n, useTheme = false) {
  const stackScreens = screenConfig.stackScreens || [];

  const stackImports = stackScreens
    .map((name) => `import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const stackScreenEntries = stackScreens
    .map(
      (name) =>
        `        <Stack.Screen
          name="${name}"
          component={${name}Screen}
          options={{ headerShown: true, title: ${useI18n ? `t('${name}Screen.title')` : `'${name}'`} }}
        />`,
    )
    .join('\n');

  const themeImport = useTheme
    ? "import { useTheme, toNavigationTheme } from '@theme';"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);'
    : '';
  const navContainerTheme = useTheme ? ' theme={navigationTheme}' : '';

  return `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation';
import DrawerNavigator from './navigators/DrawerNavigator';
${stackImports}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <NavigationContainer${navContainerTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
${stackScreenEntries}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;`;
}

function generateTabDrawerAppNavigator(
  screenConfig,
  useI18n,
  useTheme = false,
) {
  const stackScreens = screenConfig.stackScreens || [];

  const stackImports = stackScreens
    .map((name) => `import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const stackScreenEntries = stackScreens
    .map(
      (name) =>
        `        <Stack.Screen
          name="${name}"
          component={${name}Screen}
          options={{ headerShown: true, title: ${useI18n ? `t('${name}Screen.title')` : `'${name}'`} }}
        />`,
    )
    .join('\n');

  const themeImport = useTheme
    ? "import { useTheme, toNavigationTheme } from '@theme';"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);'
    : '';
  const navContainerTheme = useTheme ? ' theme={navigationTheme}' : '';

  return `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation';
import DrawerNavigator from './navigators/DrawerNavigator';
${stackImports}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <NavigationContainer${navContainerTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
${stackScreenEntries}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;`;
}

// ─── React Navigation: TabNavigator ────────────────────────────────────

function generateTabNavigator(
  screenConfig,
  useI18n,
  insideDrawer = false,
  useTheme = false,
) {
  const tabScreens = screenConfig.tabScreens;

  const tabImports = tabScreens
    .map((name) => `import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const tabIconCallbacks = tabScreens
    .map(
      (name, i) =>
        `  const render${name}Icon = useCallback(
    ({ focused }: { focused: boolean }) => (
      <TabIcon label="${DEFAULT_ICONS[i] || '📄'}" focused={focused} />
    ),
    [],
  );`,
    )
    .join('\n\n');

  const tabScreenEntries = tabScreens
    .map(
      (name, i) =>
        `      <Tab.Screen
        name="${name}"
        component={${name}Screen}
        options={{
          title: ${useI18n ? `t('TabNavigator.${name.charAt(0).toLowerCase() + name.slice(1)}')` : `'${toDisplayTitle(name)}'`},
          tabBarLabel: ${useI18n ? `t('TabNavigator.tabBarLabels.${name.charAt(0).toLowerCase() + name.slice(1)}')` : `'${toDisplayTitle(name)}'`},
          tabBarIcon: render${name}Icon,
        }}
      />`,
    )
    .join('\n');

  const themeImport = useTheme ? "import { useTheme } from '@theme';" : '';
  const themeHook = useTheme ? '  const { theme } = useTheme();' : '';
  const activeTint = useTheme ? 'theme.colors.primary' : "'#3498db'";
  const inactiveTint = useTheme ? 'theme.colors.textSecondary' : "'#95a5a6'";

  return `import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import type { TabParamList } from '@navigation';
${tabImports}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Tab = createBottomTabNavigator<TabParamList>();

const TabIcon = React.memo(
  ({ label, focused }: { label: string; focused: boolean }) => (
    <Text
      style={[styles.icon, focused ? styles.iconFocused : styles.iconInactive]}
    >
      {label}
    </Text>
  ),
);

function TabNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

${tabIconCallbacks}

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: ${activeTint},
        tabBarInactiveTintColor: ${inactiveTint},
        headerShown: ${insideDrawer ? 'false' : 'true'},
        tabBarStyle: styles.tabBar,
      }}
    >
${tabScreenEntries}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
  iconFocused: {
    color: '#3498db',
  },
  iconInactive: {
    color: '#95a5a6',
  },
  tabBar: {
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
});

export default TabNavigator;`;
}

// ─── React Navigation: DrawerNavigator ─────────────────────────────────

function generateDrawerNavigator(screenConfig, useI18n, useTheme = false) {
  const drawerScreens = screenConfig.drawerScreens;

  const drawerImports = drawerScreens
    .map((name) => `import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const drawerScreenEntries = drawerScreens
    .map(
      (name, i) =>
        `      <Drawer.Screen
        name="${name}"
        component={${name}Screen}
        options={{
          title: ${useI18n ? `t('DrawerNavigator.${name.charAt(0).toLowerCase() + name.slice(1)}')` : `'${toDisplayTitle(name)}'`},
          drawerIcon: () => <Text style={{ fontSize: 20 }}>${DEFAULT_ICONS[i] || '📄'}</Text>,
        }}
      />`,
    )
    .join('\n');

  const themeImport = useTheme ? "import { useTheme } from '@theme';" : '';
  const themeHook = useTheme ? '  const { theme } = useTheme();' : '';
  const activeTint = useTheme ? 'theme.colors.primary' : "'#3498db'";
  const inactiveTint = useTheme ? 'theme.colors.textSecondary' : "'#95a5a6'";

  return `import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation';
${drawerImports}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: ${activeTint},
        drawerInactiveTintColor: ${inactiveTint},
      }}
    >
${drawerScreenEntries}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;`;
}

/**
 * Generate DrawerNavigator that wraps a TabNavigator (for tabs+drawer pattern)
 */
function generateTabDrawerDrawerNavigator(
  screenConfig,
  useI18n,
  useTheme = false,
) {
  const extraDrawerScreens = screenConfig.drawerScreens || [];

  const drawerImports = extraDrawerScreens
    .map((name) => `import ${name}Screen from '@screens/${name}Screen';`)
    .join('\n');

  const extraScreenEntries = extraDrawerScreens
    .map(
      (name, i) =>
        `      <Drawer.Screen
        name="${name}"
        component={${name}Screen}
        options={{
          title: ${useI18n ? `t('DrawerNavigator.${name.charAt(0).toLowerCase() + name.slice(1)}')` : `'${toDisplayTitle(name)}'`},
          drawerIcon: () => <Text style={{ fontSize: 20 }}>${DEFAULT_ICONS[i + 1] || '📄'}</Text>,
        }}
      />`,
    )
    .join('\n');

  const themeImport = useTheme ? "import { useTheme } from '@theme';" : '';
  const themeHook = useTheme ? '  const { theme } = useTheme();' : '';
  const activeTint = useTheme ? 'theme.colors.primary' : "'#3498db'";
  const inactiveTint = useTheme ? 'theme.colors.textSecondary' : "'#95a5a6'";

  return `import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerParamList } from '@navigation';
import TabNavigator from './TabNavigator';
${drawerImports}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: ${activeTint},
        drawerInactiveTintColor: ${inactiveTint},
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: ${useI18n ? "t('DrawerNavigator.mainTabs')" : "'Home'"},
          drawerIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
${extraScreenEntries}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;`;
}

// ─── Expo Router Layouts ───────────────────────────────────────────────

/**
 * Generate _layout.tsx for Expo Router with dynamic screens
 */
function generateExpoRouterLayout(screenConfig, useI18n, useTheme = false) {
  const pattern = screenConfig.navigationPattern || NAVIGATION_PATTERNS.STACK;

  if (pattern === NAVIGATION_PATTERNS.STACK) {
    return generateExpoRouterStackLayout(screenConfig, useI18n, useTheme);
  }
  // For tabs, drawer, tabs+drawer: root layout is a Stack wrapping groups + stack screens
  return generateExpoRouterRootLayout(screenConfig, useI18n, useTheme);
}

function generateExpoRouterStackLayout(
  screenConfig,
  useI18n,
  useTheme = false,
) {
  const screens = screenConfig.screens;

  const screenEntries = screens
    .map((name, index) => {
      const routeName = index === 0 ? 'index' : convertToExpoRouterPath(name);
      const titleOption = useI18n ? `t('${name}Screen.title')` : `'${name}'`;
      if (index === 0) {
        return `      <Stack.Screen
        name="${routeName}"
        options={{ title: ${titleOption} }}
      />`;
      }
      const backTitleOption = useI18n ? `t('common.goBack')` : `'Back'`;
      return `      <Stack.Screen
        name="${routeName}"
        options={{ title: ${titleOption}, headerBackTitle: ${backTitleOption} }}
      />`;
    })
    .join('\n');

  const themeImport = useTheme
    ? "import { ThemeProvider, useTheme, toNavigationTheme } from '@theme';\nimport { ThemeProvider as NavThemeProvider } from '@react-navigation/native';"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);'
    : '';

  if (useTheme) {
    return `import { Stack } from 'expo-router';
${useI18n ? "import '@i18n/i18n';" : ''}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

function RootLayoutNav(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <NavThemeProvider value={navigationTheme}>
      <Stack>
${screenEntries}
      </Stack>
    </NavThemeProvider>
  );
}

function Layout(): React.JSX.Element {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

export default Layout;`;
  }

  return `import { Stack } from 'expo-router';
${useI18n ? "import '@i18n/i18n';" : ''}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}

function Layout(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}

  return (
    <Stack>
${screenEntries}
    </Stack>
  );
}

export default Layout;`;
}

function generateExpoRouterRootLayout(screenConfig, useI18n, useTheme = false) {
  const pattern = screenConfig.navigationPattern;
  const stackScreens = screenConfig.stackScreens || [];

  const groupName =
    pattern === NAVIGATION_PATTERNS.TABS ? '(tabs)' : '(drawer)';

  const stackScreenEntries = stackScreens
    .map((name) => {
      const routeName = convertToExpoRouterPath(name);
      const titleOption = useI18n ? `t('${name}Screen.title')` : `'${name}'`;
      const backTitleOption = useI18n ? `t('common.goBack')` : `'Back'`;
      return `      <Stack.Screen
        name="${routeName}"
        options={{ headerShown: true, title: ${titleOption}, headerBackTitle: ${backTitleOption} }}
      />`;
    })
    .join('\n');

  const themeImport = useTheme
    ? "import { ThemeProvider, useTheme, toNavigationTheme } from '@theme';\nimport { ThemeProvider as NavThemeProvider } from '@react-navigation/native';"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);'
    : '';

  if (useTheme) {
    return `import { Stack } from 'expo-router';
${useI18n ? "import '@i18n/i18n';" : ''}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

function RootLayoutNav(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <NavThemeProvider value={navigationTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="${groupName}" options={{ headerShown: false }} />
${stackScreenEntries}
      </Stack>
    </NavThemeProvider>
  );
}

function Layout(): React.JSX.Element {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

export default Layout;`;
  }

  return `import { Stack } from 'expo-router';
${useI18n ? "import '@i18n/i18n';" : ''}
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}

function Layout(): React.JSX.Element {
${useI18n ? '  const { t } = useTranslation();' : ''}

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="${groupName}" options={{ headerShown: false }} />
${stackScreenEntries}
    </Stack>
  );
}

export default Layout;`;
}

/**
 * Generate (tabs)/_layout.tsx for Expo Router
 */
function generateExpoRouterTabsLayout(
  screenConfig,
  useI18n,
  insideDrawer = false,
  useTheme = false,
) {
  const tabScreens = screenConfig.tabScreens;

  const tabScreenEntries = tabScreens
    .map((name, i) => {
      const routeName = i === 0 ? 'index' : convertToExpoRouterPath(name);
      const camelName = name.charAt(0).toLowerCase() + name.slice(1);
      return `      <Tabs.Screen
        name="${routeName}"
        options={{
          title: ${useI18n ? `t('TabNavigator.${camelName}')` : `'${toDisplayTitle(name)}'`},
          tabBarLabel: ${useI18n ? `t('TabNavigator.tabBarLabels.${camelName}')` : `'${toDisplayTitle(name)}'`},
          tabBarIcon: ({ color }) => <TabIcon label="${DEFAULT_ICONS[i] || '📄'}" color={color} />,
        }}
      />`;
    })
    .join('\n');

  const themeImport = useTheme ? "import { useTheme } from '@theme';" : '';
  const themeHook = useTheme ? '  const { theme } = useTheme();' : '';
  const activeTint = useTheme ? 'theme.colors.primary' : "'#3498db'";
  const inactiveTint = useTheme ? 'theme.colors.textSecondary' : "'#95a5a6'";

  return `import { Tabs } from 'expo-router';
import { Text } from 'react-native';
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

function TabsLayout() {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ${activeTint},
        tabBarInactiveTintColor: ${inactiveTint},${insideDrawer ? '\n        headerShown: false,' : ''}
      }}
    >
${tabScreenEntries}
    </Tabs>
  );
}

function TabIcon({ label, color }: { label: string; color: string }) {
  return <Text style={{ fontSize: 20, color }}>{label}</Text>;
}

export default TabsLayout;`;
}

/**
 * Generate (drawer)/_layout.tsx for Expo Router
 */
function generateExpoRouterDrawerLayout(
  screenConfig,
  useI18n,
  useTheme = false,
) {
  const pattern = screenConfig.navigationPattern;
  const drawerScreens = screenConfig.drawerScreens || [];

  // For tabs+drawer: drawer contains (tabs) group + extra drawer screens
  // For drawer-only: drawer contains all drawer screens
  let screenEntries;

  if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
    const tabsEntry = `      <Drawer.Screen
        name="(tabs)"
        options={{
          title: ${useI18n ? "t('DrawerNavigator.mainTabs')" : "'Home'"},
          drawerLabel: ${useI18n ? "t('DrawerNavigator.mainTabs')" : "'Home'"},
          drawerIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />`;

    const extraEntries = drawerScreens
      .map((name, i) => {
        const routeName = convertToExpoRouterPath(name);
        const camelName = name.charAt(0).toLowerCase() + name.slice(1);
        return `      <Drawer.Screen
        name="${routeName}"
        options={{
          title: ${useI18n ? `t('DrawerNavigator.${camelName}')` : `'${toDisplayTitle(name)}'`},
          drawerIcon: () => <Text style={{ fontSize: 20 }}>${DEFAULT_ICONS[i + 1] || '📄'}</Text>,
        }}
      />`;
      })
      .join('\n');

    screenEntries = [tabsEntry, extraEntries].filter(Boolean).join('\n');
  } else {
    screenEntries = drawerScreens
      .map((name, i) => {
        const routeName = i === 0 ? 'index' : convertToExpoRouterPath(name);
        const camelName = name.charAt(0).toLowerCase() + name.slice(1);
        return `      <Drawer.Screen
        name="${routeName}"
        options={{
          title: ${useI18n ? `t('DrawerNavigator.${camelName}')` : `'${toDisplayTitle(name)}'`},
          drawerIcon: () => <Text style={{ fontSize: 20 }}>${DEFAULT_ICONS[i] || '📄'}</Text>,
        }}
      />`;
      })
      .join('\n');
  }

  const themeImport = useTheme ? "import { useTheme } from '@theme';" : '';
  const themeHook = useTheme ? '  const { theme } = useTheme();' : '';
  const activeTint = useTheme ? 'theme.colors.primary' : "'#3498db'";
  const inactiveTint = useTheme ? 'theme.colors.textSecondary' : "'#95a5a6'";

  return `import { Drawer } from 'expo-router/drawer';
import { Text } from 'react-native';
${useI18n ? "import { useTranslation } from 'react-i18next';" : ''}
${themeImport}

function DrawerLayout() {
${useI18n ? '  const { t } = useTranslation();' : ''}
${themeHook}

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: ${activeTint},
        drawerInactiveTintColor: ${inactiveTint},
      }}
    >
${screenEntries}
    </Drawer>
  );
}

export default DrawerLayout;`;
}

// ─── i18n Translations ─────────────────────────────────────────────────

/**
 * Add i18n translations for dynamically created screens
 */
function updateDynamicScreenTranslations(
  projectPath,
  screens,
  screenConfig,
  useTheme = false,
) {
  const localesDir = path.join(projectPath, 'src', 'i18n', 'locales');

  // Write translations for all screens (title + description keys)
  const customScreens = screens;

  const pattern = screenConfig
    ? screenConfig.navigationPattern || NAVIGATION_PATTERNS.STACK
    : NAVIGATION_PATTERNS.STACK;

  // Update en.json
  const enJsonPath = path.join(localesDir, 'en.json');
  if (fs.existsSync(enJsonPath)) {
    const enTranslations = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

    // Ensure common navigation keys exist
    if (!enTranslations.common) enTranslations.common = {};
    enTranslations.common.language =
      enTranslations.common.language || 'Language';
    enTranslations.common.goTo = enTranslations.common.goTo || 'Go to';
    enTranslations.common.goBack = enTranslations.common.goBack || 'Go Back';

    if (useTheme) {
      enTranslations.common.themeAppearance = 'Appearance';
      enTranslations.common.themeLight = 'Light';
      enTranslations.common.themeDark = 'Dark';
      enTranslations.common.themeSystem = 'System';
    }

    // Add screen translations for all screens
    customScreens.forEach((name) => {
      const displayTitle = toDisplayTitle(name);
      enTranslations[`${name}Screen`] = {
        title: displayTitle,
        description: `Welcome to the ${displayTitle} screen.`,
      };
    });

    // Add TabNavigator translations
    if (
      pattern === NAVIGATION_PATTERNS.TABS ||
      pattern === NAVIGATION_PATTERNS.TABS_DRAWER
    ) {
      const tabNav = { tabBarLabels: {} };
      screenConfig.tabScreens.forEach((name) => {
        const camelName = name.charAt(0).toLowerCase() + name.slice(1);
        const displayTitle = toDisplayTitle(name);
        tabNav[camelName] = displayTitle;
        tabNav.tabBarLabels[camelName] = displayTitle;
      });
      enTranslations.TabNavigator = tabNav;
    }

    // Add DrawerNavigator translations
    if (
      pattern === NAVIGATION_PATTERNS.DRAWER ||
      pattern === NAVIGATION_PATTERNS.TABS_DRAWER
    ) {
      const drawerNav = {};
      if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
        drawerNav.mainTabs = 'Home';
      }
      const drawerScreensList =
        pattern === NAVIGATION_PATTERNS.DRAWER
          ? screenConfig.drawerScreens
          : screenConfig.drawerScreens || [];
      drawerScreensList.forEach((name) => {
        const camelName = name.charAt(0).toLowerCase() + name.slice(1);
        drawerNav[camelName] = toDisplayTitle(name);
      });
      enTranslations.DrawerNavigator = drawerNav;
    }

    fs.writeFileSync(enJsonPath, JSON.stringify(enTranslations, null, 2));
  }

  // Update it.json
  const itJsonPath = path.join(localesDir, 'it.json');
  if (fs.existsSync(itJsonPath)) {
    const itTranslations = JSON.parse(fs.readFileSync(itJsonPath, 'utf8'));

    // Ensure common navigation keys exist
    if (!itTranslations.common) itTranslations.common = {};
    itTranslations.common.language = itTranslations.common.language || 'Lingua';
    itTranslations.common.goTo = itTranslations.common.goTo || 'Vai a';
    itTranslations.common.goBack = itTranslations.common.goBack || 'Indietro';

    if (useTheme) {
      itTranslations.common.themeAppearance = 'Aspetto';
      itTranslations.common.themeLight = 'Chiaro';
      itTranslations.common.themeDark = 'Scuro';
      itTranslations.common.themeSystem = 'Sistema';
    }

    customScreens.forEach((name) => {
      const displayTitle = toDisplayTitle(name);
      itTranslations[`${name}Screen`] = {
        title: displayTitle,
        description: `Benvenuto nella schermata ${displayTitle}.`,
      };
    });

    if (
      pattern === NAVIGATION_PATTERNS.TABS ||
      pattern === NAVIGATION_PATTERNS.TABS_DRAWER
    ) {
      const tabNav = { tabBarLabels: {} };
      screenConfig.tabScreens.forEach((name) => {
        const camelName = name.charAt(0).toLowerCase() + name.slice(1);
        const displayTitle = toDisplayTitle(name);
        tabNav[camelName] = displayTitle;
        tabNav.tabBarLabels[camelName] = displayTitle;
      });
      itTranslations.TabNavigator = tabNav;
    }

    if (
      pattern === NAVIGATION_PATTERNS.DRAWER ||
      pattern === NAVIGATION_PATTERNS.TABS_DRAWER
    ) {
      const drawerNav = {};
      if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
        drawerNav.mainTabs = 'Home';
      }
      const drawerScreensList =
        pattern === NAVIGATION_PATTERNS.DRAWER
          ? screenConfig.drawerScreens
          : screenConfig.drawerScreens || [];
      drawerScreensList.forEach((name) => {
        const camelName = name.charAt(0).toLowerCase() + name.slice(1);
        drawerNav[camelName] = toDisplayTitle(name);
      });
      itTranslations.DrawerNavigator = drawerNav;
    }

    fs.writeFileSync(itJsonPath, JSON.stringify(itTranslations, null, 2));
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

module.exports = {
  createDynamicScreens,
  generateNavTypes,
  generateAppNavigator,
  generateExpoRouterLayout,
  generateExpoRouterTabsLayout,
  generateExpoRouterDrawerLayout,
  generateTabNavigator,
  generateDrawerNavigator,
  generateTabDrawerDrawerNavigator,
  updateDynamicScreenTranslations,
};
