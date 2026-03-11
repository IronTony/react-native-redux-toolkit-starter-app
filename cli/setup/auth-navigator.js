const fs = require('fs');
const path = require('path');
const { log } = require('../utils/logger');
const { convertToExpoRouterPath } = require('../templates/screens/adapter');

function createAuthNavigator(projectPath, useExpoRouter = false, screenConfig = null, options = {}) {
  // Default screen config if none provided
  const config = screenConfig || {
    hasAuth: true,
    fixedScreens: ['Intro', 'Login'],
    publicScreens: ['PublicHome'],
    privateTabScreens: ['PrivateHome', 'Profile', 'Settings'],
    privateStackScreens: ['Details'],
  };

  const useTheme = options.useTheme || false;

  if (useExpoRouter) {
    createExpoRouterAuthLayouts(projectPath, config, useTheme);
  } else {
    createReactNavigationAuthNavigator(projectPath, config, useTheme);
  }
}

function createReactNavigationAuthNavigator(projectPath, config, useTheme) {
  const srcDir = path.join(projectPath, 'src');

  // Build dynamic imports for public screens (fixed + custom public)
  const publicScreens = [...config.fixedScreens, ...config.publicScreens];
  const publicImports = publicScreens
    .map(
      (name) =>
        `import ${name}Screen from '@screens/${name}Screen';`
    )
    .join('\n');

  // Build dynamic imports for private stack screens
  const privateStackImports = config.privateStackScreens
    .map(
      (name) =>
        `import ${name}Screen from '@screens/${name}Screen';`
    )
    .join('\n');

  // Build public Stack.Screen entries
  const publicScreenEntries = publicScreens
    .map((name, i) => {
      // First two (Intro, Login) have no header; rest show header
      if (i < config.fixedScreens.length) {
        return `            <Stack.Screen name="${name}" component={${name}Screen} />`;
      }
      const camelName = name.charAt(0).toLowerCase() + name.slice(1);
      return `            <Stack.Screen
              name="${name}"
              component={${name}Screen}
              options={{
                headerShown: true,
                title: t('AppNavigator.${camelName}'),
              }}
            />`;
    })
    .join('\n');

  // Build private stack screen entries
  const privateStackEntries = config.privateStackScreens
    .map((name) => {
      const camelName = name.charAt(0).toLowerCase() + name.slice(1);
      return `            <Stack.Screen
              name="${name}"
              component={${name}Screen}
              options={{ headerShown: true, title: t('AppNavigator.${camelName}') }}
            />`;
    })
    .join('\n');

  // Theme-aware imports and NavigationContainer props
  const themeImport = useTheme
    ? "import { useTheme, toNavigationTheme } from '@theme';\n"
    : '';
  const themeHook = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);\n'
    : '';
  const navigationContainerTheme = useTheme
    ? '<NavigationContainer theme={navigationTheme}>'
    : '<NavigationContainer>';

  const appNavigator = `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useAuthClient } from '@auth';
import type { RootStackParamList } from '@navigation';
${themeImport}
// Screens
${publicImports}
${privateStackImports}

// Navigators
import TabNavigator from './navigators/TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator(): React.JSX.Element {
  const { isAuthenticated } = useAuthClient();
  const { t } = useTranslation();
${themeHook}
  return (
    ${navigationContainerTheme}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          // Public Stack
          <>
${publicScreenEntries}
          </>
        ) : (
          // Private Stack
          <>
            <Stack.Screen
              name="MainTabs"
              component={TabNavigator}
              options={{
                headerShown: false,
                title: t('AppNavigator.mainTabs'),
              }}
            />
${privateStackEntries}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
`;

  fs.writeFileSync(path.join(srcDir, 'AppNavigator.tsx'), appNavigator);

  // Update App.tsx to wrap with AuthProvider (and ThemeProvider if enabled)
  let appTsx;
  if (useTheme) {
    appTsx = `import React from 'react';
import AppNavigator from './src/AppNavigator';
import { AuthProvider } from '@auth';
import { ThemeProvider } from '@theme';
import '@i18n/i18n';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
`;
  } else {
    appTsx = `import React from 'react';
import AppNavigator from './src/AppNavigator';
import { AuthProvider } from '@auth';
import '@i18n/i18n';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
`;
  }

  fs.writeFileSync(path.join(projectPath, 'App.tsx'), appTsx);

  log.success('AppNavigator updated with authentication logic');
  log.success('App.tsx wrapped with AuthProvider');
}

function createExpoRouterAuthLayouts(projectPath, config, useTheme) {
  const appDir = path.join(projectPath, 'app');
  const DEFAULT_ICONS = { 0: '🏠', 1: '👤', 2: '⚙️', 3: '📋', 4: '🔔', 5: '💬' };

  // Build dynamic private stack screen entries for root layout
  const privateStackScreenEntries = config.privateStackScreens
    .map((name) => {
      const routeName = convertToExpoRouterPath(name);
      return `        <Stack.Screen
          name="${routeName}"
          options={{
            headerShown: true,
            title: t('AppNavigator.${name.charAt(0).toLowerCase() + name.slice(1)}'),
          }}
        />`;
    })
    .join('\n');

  // Theme-aware imports and wrapping
  const themeImport = useTheme
    ? "import { ThemeProvider, useTheme, toNavigationTheme } from '@theme';\nimport { ThemeProvider as NavThemeProvider } from '@react-navigation/native';\n"
    : '';
  const themeHookInNav = useTheme
    ? '  const { theme } = useTheme();\n  const navigationTheme = toNavigationTheme(theme);\n'
    : '';

  // Wrap RootLayoutNav content with NavigationTheme if theming is enabled
  const navContentOpen = useTheme ? '    <NavThemeProvider value={navigationTheme}>\n' : '';
  const navContentClose = useTheme ? '    </NavThemeProvider>\n' : '';

  // Create root _layout.tsx
  const rootLayout = `import { Stack, SplashScreen } from 'expo-router';
import { AuthProvider, useAuthClient } from '@auth';
import '@i18n/i18n';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
${themeImport}
// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function SplashScreenController() {
  const { isAuthenticated, tokens } = useAuthClient();

  useEffect(() => {
    if (isAuthenticated !== undefined && tokens !== undefined) {
      SplashScreen.hideAsync();
    }
  }, [isAuthenticated, tokens]);

  return null;
}

function RootLayoutNav() {
  const { isAuthenticated } = useAuthClient();
  const { t } = useTranslation();
${themeHookInNav}
  return (
${navContentOpen}    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      {/* Protected routes - only accessible when authenticated */}
      <Stack.Protected guard={!!isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
${privateStackScreenEntries}
      </Stack.Protected>

      {/* Public routes - only accessible when NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
${navContentClose}  );
}

function RootLayout() {
  return (
${useTheme ? '    <ThemeProvider>\n' : ''}    <AuthProvider>
      <SplashScreenController />
      <RootLayoutNav />
    </AuthProvider>
${useTheme ? '    </ThemeProvider>\n' : ''}  );
}

export default RootLayout;
`;

  fs.writeFileSync(path.join(appDir, '_layout.tsx'), rootLayout);

  // Create (auth) group layout with dynamic public screens
  const authGroupDir = path.join(appDir, '(auth)');
  const publicScreens = config.publicScreens;

  const authScreenEntries = [
    '      <Stack.Screen name="intro" />',
    '      <Stack.Screen name="login" />',
    ...publicScreens.map((name) => {
      const routeName = convertToExpoRouterPath(name);
      const camelName = name.charAt(0).toLowerCase() + name.slice(1);
      return `      <Stack.Screen
        name="${routeName}"
        options={{
          headerShown: true,
          title: t('AppNavigator.${camelName}'),
        }}
      />`;
    }),
  ].join('\n');

  const authLayout = `import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export const unstable_settings = {
  initialRouteName: 'intro',
};

function AuthLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
${authScreenEntries}
    </Stack>
  );
}

export default AuthLayout;
`;

  fs.writeFileSync(path.join(authGroupDir, '_layout.tsx'), authLayout);

  // Create (tabs) group layout with dynamic tab screens
  const tabsGroupDir = path.join(appDir, '(tabs)');
  const tabScreens = config.privateTabScreens;

  const tabScreenEntries = tabScreens
    .map((name, i) => {
      const routeName = i === 0 ? 'index' : convertToExpoRouterPath(name);
      const camelName = name.charAt(0).toLowerCase() + name.slice(1);
      return `      <Tabs.Screen
        name="${routeName}"
        options={{
          title: t('TabNavigator.${camelName}'),
          tabBarLabel: t('TabNavigator.tabBarLabels.${camelName}'),
          tabBarIcon: ({ color }) => <TabIcon label="${DEFAULT_ICONS[i] || '📄'}" color={color} />,
        }}
      />`;
    })
    .join('\n');

  // Theme-aware tab colors
  const tabActiveColor = useTheme ? 'theme.colors.primary' : "'#3498db'";
  const tabInactiveColor = useTheme ? 'theme.colors.secondary' : "'#95a5a6'";
  const tabThemeImport = useTheme ? "import { useTheme } from '@theme';\n" : '';
  const tabThemeHook = useTheme ? '  const { theme } = useTheme();\n' : '';

  const tabsLayout = `import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
${tabThemeImport}
function TabsLayout() {
  const { t } = useTranslation();
${tabThemeHook}
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ${tabActiveColor},
        tabBarInactiveTintColor: ${tabInactiveColor},
      }}
    >
${tabScreenEntries}
    </Tabs>
  );
}

// Simple icon component
function TabIcon({ label, color }: { label: string; color: string }) {
  return <Text style={{ fontSize: 20, color }}>{label}</Text>;
}

export default TabsLayout;
`;

  fs.writeFileSync(path.join(tabsGroupDir, '_layout.tsx'), tabsLayout);

  log.success('Expo Router layouts created with auth-aware navigation');
}

module.exports = {
  createAuthNavigator,
};
