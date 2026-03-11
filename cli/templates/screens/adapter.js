/**
 * Template Adapter System
 * Handles differences between React Navigation and Expo Router frameworks
 */

const FRAMEWORKS = {
  REACT_NAVIGATION: 'react-navigation',
  EXPO_ROUTER: 'expo-router',
};

/**
 * Get navigation import based on framework
 */
function getNavigationImport(framework) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    return "import { useRouter } from 'expo-router';";
  }
  return "import { useNavigation } from '@react-navigation/native';";
}

/**
 * Get navigation hook based on framework
 */
function getNavigationHook(framework, screenName) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    return 'const router = useRouter();';
  }
  return 'const navigation = useNavigation();';
}

/**
 * Get navigation type definition for React Navigation
 * Note: No longer needed since we use useNavigation() hook instead of props
 */
function getNavigationType(framework, screenName) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    return '';
  }
  return '';
}

/**
 * Get function signature based on framework
 */
function getFunctionSignature(framework, componentName, screenName) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    return `function ${componentName}(): React.JSX.Element {`;
  }
  return `function ${componentName}(): React.JSX.Element {`;
}

/**
 * Convert route name to Expo Router path format
 * Examples: PublicHome -> public-home, Login -> login, Intro -> intro
 */
function convertToExpoRouterPath(route) {
  return route
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

/**
 * Get navigation method for navigating to a route
 */
function getNavigateMethod(framework, route) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    const path = convertToExpoRouterPath(route);
    return `router.push('/${path}')`;
  }
  return `navigation.navigate('${route}')`;
}

/**
 * Get navigation method for going back
 */
function getBackMethod(framework) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    return 'router.back()';
  }
  return 'navigation.goBack()';
}

/**
 * Get navigation method for replacing route
 */
function getReplaceMethod(framework, route) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    const path = convertToExpoRouterPath(route);
    return `router.replace('/${path}')`;
  }
  return `navigation.replace('${route}')`;
}

/**
 * Get file name for a screen based on framework
 */
function getScreenFileName(framework, screenName) {
  if (framework === FRAMEWORKS.EXPO_ROUTER) {
    // Convert ScreenName to screen-name.tsx format
    // Special cases: IntroScreen -> intro.tsx, LoginScreen -> login.tsx
    const baseName = screenName.replace(/Screen$/, '');
    const path = convertToExpoRouterPath(baseName);
    return `${path}.tsx`;
  }
  return `${screenName}.tsx`;
}

/**
 * Render a template with framework-specific adaptations
 */
function renderTemplate(template, framework, options = {}) {
  const {
    screenName,
    componentName,
    navigationType,
    navigationHook,
    navigateMethod,
    backMethod,
    replaceMethod,
    fileName,
  } = options;

  // Get framework-specific values
  const navImport = getNavigationImport(framework);
  const navType = navigationType || getNavigationType(framework, screenName);
  const navHook = navigationHook || getNavigationHook(framework, screenName);
  const funcSig = getFunctionSignature(framework, componentName, screenName);
  const navMethod = navigateMethod || getNavigateMethod(framework, screenName);
  const backNav = backMethod || getBackMethod(framework);
  const replaceNav = replaceMethod || getReplaceMethod(framework, screenName);
  const file = fileName || getScreenFileName(framework, screenName);

  // Get theme-related values
  const themeImport = options.useTheme
    ? "import { useTheme } from '@theme';"
    : '';
  const themeHook = options.useTheme
    ? 'const { theme } = useTheme();'
    : '';

  // Replace placeholders in template
  let rendered = template
    .replace(/\{\{NAVIGATION_IMPORT\}\}/g, navImport)
    .replace(/\{\{NAVIGATION_TYPE\}\}/g, navType)
    .replace(/\{\{NAVIGATION_HOOK\}\}/g, navHook)
    .replace(/\{\{FUNCTION_SIGNATURE\}\}/g, funcSig)
    .replace(/\{\{NAVIGATE_METHOD\}\}/g, navMethod)
    .replace(/\{\{BACK_METHOD\}\}/g, backNav)
    .replace(/\{\{REPLACE_METHOD\}\}/g, replaceNav)
    .replace(/\{\{FILE_NAME\}\}/g, file)
    .replace(/\{\{THEME_IMPORT\}\}/g, themeImport)
    .replace(/\{\{THEME_HOOK\}\}/g, themeHook);

  // Handle custom route replacements
  if (options.routes) {
    Object.entries(options.routes).forEach(([key, value]) => {
      const routeMethod = getNavigateMethod(framework, value);
      rendered = rendered.replace(
        new RegExp(`\\{\\{${key}\\}\\}`, 'g'),
        routeMethod
      );
    });
  }

  return rendered;
}

/**
 * Apply theme-aware transformations to a rendered screen template.
 * Replaces hardcoded colors with theme.colors.X references and
 * injects the theme import + hook.
 */
function applyTheme(rendered) {
  // 1. Add theme import (guard against duplicates)
  if (!rendered.includes("import { useTheme") && !rendered.includes("import { type Theme")) {
    const lastImportIndex = rendered.lastIndexOf('import ');
    const lastImportEnd = rendered.indexOf('\n', lastImportIndex);
    rendered =
      rendered.slice(0, lastImportEnd + 1) +
      "import { useTheme, type Theme } from '@theme';\n" +
      rendered.slice(lastImportEnd + 1);
  } else if (rendered.includes("import { useTheme } from '@theme'")) {
    // Upgrade existing import to include Theme type
    rendered = rendered.replace(
      "import { useTheme } from '@theme';",
      "import { useTheme, type Theme } from '@theme';"
    );
  }

  // 2. Add theme hook inside component function
  if (rendered.includes('const { t } = useTranslation();')) {
    rendered = rendered.replace(
      'const { t } = useTranslation();',
      'const { t } = useTranslation();\n  const { theme } = useTheme();'
    );
  } else {
    const funcMatch = rendered.match(/function \w+\([^)]*\)[^{]*\{/);
    if (funcMatch) {
      const funcEnd = rendered.indexOf(funcMatch[0]) + funcMatch[0].length;
      rendered =
        rendered.slice(0, funcEnd) +
        '\n  const { theme } = useTheme();\n' +
        rendered.slice(funcEnd);
    }
  }

  // 3. Replace hardcoded colors with theme references
  // Background colors
  rendered = rendered.replace(
    /backgroundColor: '#f8f9fa'/g,
    'backgroundColor: theme.colors.background'
  );
  rendered = rendered.replace(
    /backgroundColor: '#fff'/g,
    'backgroundColor: theme.colors.surface'
  );
  rendered = rendered.replace(
    /backgroundColor: '#ffffff'/g,
    'backgroundColor: theme.colors.surface'
  );
  rendered = rendered.replace(
    /backgroundColor: '#3498db'/g,
    'backgroundColor: theme.colors.primary'
  );
  rendered = rendered.replace(
    /backgroundColor: '#007AFF'/g,
    'backgroundColor: theme.colors.primary'
  );
  rendered = rendered.replace(
    /backgroundColor: '#95a5a6'/g,
    'backgroundColor: theme.colors.secondary'
  );
  rendered = rendered.replace(
    /backgroundColor: '#27ae60'/g,
    'backgroundColor: theme.colors.success'
  );
  rendered = rendered.replace(
    /backgroundColor: '#2ecc71'/g,
    'backgroundColor: theme.colors.success'
  );
  rendered = rendered.replace(
    /backgroundColor: '#e67e22'/g,
    'backgroundColor: theme.colors.warning'
  );
  rendered = rendered.replace(
    /backgroundColor: '#e74c3c'/g,
    'backgroundColor: theme.colors.danger'
  );

  // Text colors
  rendered = rendered.replace(
    /color: '#2c3e50'/g,
    'color: theme.colors.text'
  );
  rendered = rendered.replace(
    /color: '#333'/g,
    'color: theme.colors.text'
  );
  rendered = rendered.replace(
    /color: '#7f8c8d'/g,
    'color: theme.colors.textSecondary'
  );
  rendered = rendered.replace(
    /color: '#666'/g,
    'color: theme.colors.textSecondary'
  );
  rendered = rendered.replace(
    /color: '#fff'/g,
    'color: theme.colors.buttonText'
  );
  rendered = rendered.replace(
    /color: '#ffffff'/g,
    'color: theme.colors.buttonText'
  );
  rendered = rendered.replace(
    /color: '#3498db'/g,
    'color: theme.colors.primary'
  );
  rendered = rendered.replace(
    /color: '#e74c3c'/g,
    'color: theme.colors.danger'
  );

  // Border colors
  rendered = rendered.replace(
    /borderBottomColor: '#ecf0f1'/g,
    'borderBottomColor: theme.colors.border'
  );
  rendered = rendered.replace(
    /borderColor: 'grey'/g,
    'borderColor: theme.colors.inputBorder'
  );
  rendered = rendered.replace(
    /borderColor: '#3498db'/g,
    'borderColor: theme.colors.primary'
  );

  // ActivityIndicator color
  rendered = rendered.replace(
    /color="#3498db"/g,
    'color={theme.colors.primary}'
  );

  // 4. Convert StyleSheet.create to a factory function so theme is in scope
  // StyleSheet.create() runs at module scope where theme doesn't exist.
  // Transform: const styles = StyleSheet.create({...})
  // Into:      const createStyles = (theme: Theme) => StyleSheet.create({...})
  // And add:   const styles = createStyles(theme);  inside the component
  rendered = rendered.replace(
    'const styles = StyleSheet.create({',
    'const createStyles = (theme: Theme) => StyleSheet.create({'
  );

  // 5. Add styles = createStyles(theme) after the theme hook
  rendered = rendered.replace(
    'const { theme } = useTheme();',
    'const { theme } = useTheme();\n  const styles = createStyles(theme);'
  );

  return rendered;
}

module.exports = {
  FRAMEWORKS,
  convertToExpoRouterPath,
  getNavigationImport,
  getNavigationHook,
  getNavigationType,
  getFunctionSignature,
  getNavigateMethod,
  getBackMethod,
  getReplaceMethod,
  getScreenFileName,
  renderTemplate,
  applyTheme,
};
