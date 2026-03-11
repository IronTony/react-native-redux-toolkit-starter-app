/**
 * Screen Configuration Utility
 * Handles screen name parsing, validation, and config building
 */

const RESERVED_NAMES = [
  'App',
  'Layout',
  'Navigator',
  'Index',
  'View',
  'Text',
  'Image',
  'Stack',
  'Tab',
  'Tabs',
  'Drawer',
];

const KNOWN_AUTH_SCREENS = ['Intro', 'Login'];

const NAVIGATION_PATTERNS = {
  STACK: 'stack',
  TABS: 'tabs',
  DRAWER: 'drawer',
  TABS_DRAWER: 'tabs+drawer',
};

/**
 * Convert a raw input string to PascalCase screen name
 * "my profile" -> "MyProfile", "about" -> "About", "FAQ" -> "FAQ"
 */
function sanitizeScreenName(input) {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // Split by spaces, hyphens, underscores
  const words = trimmed.split(/[\s\-_]+/);

  return words
    .map((word) => {
      if (!word) return '';
      // If word is all caps (like FAQ, API), keep it
      if (word === word.toUpperCase() && word.length > 1) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

/**
 * Parse a comma-separated string into an array of sanitized screen names
 * Returns defaults if input is empty
 */
function parseScreenList(commaString, defaults = []) {
  const trimmed = commaString.trim();
  if (!trimmed) return defaults;

  const names = trimmed
    .split(',')
    .map((s) => sanitizeScreenName(s))
    .filter((s) => s.length > 0);

  // Deduplicate
  return [...new Set(names)];
}

/**
 * Validate an array of screen names
 * Returns { valid, errors, warnings }
 */
function validateScreenNames(names, hasAuth = false) {
  const errors = [];
  const warnings = [];

  names.forEach((name) => {
    if (RESERVED_NAMES.includes(name)) {
      errors.push(`"${name}" is a reserved name and cannot be used`);
    }
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      errors.push(
        `"${name}" is not a valid screen name (must start with uppercase letter, only alphanumeric)`
      );
    }
    if (hasAuth && KNOWN_AUTH_SCREENS.includes(name)) {
      warnings.push(
        `"${name}" is already included as a mandatory auth screen`
      );
    }
  });

  // Check for duplicates
  const seen = new Set();
  names.forEach((name) => {
    if (seen.has(name)) {
      errors.push(`Duplicate screen name: "${name}"`);
    }
    seen.add(name);
  });

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Filter screen names from a full list, returning only those present.
 * Used to validate tab/drawer screen assignments against the full screen list.
 */
function filterValidScreens(selected, allScreens) {
  return selected.filter((name) => allScreens.includes(name));
}

/**
 * Build a structured screen config from user answers
 *
 * Without auth (stack):
 *   { hasAuth: false, navigationPattern: 'stack', screens: ['Home', 'Details'], initialScreen: 'Home' }
 *
 * Without auth (tabs):
 *   { hasAuth: false, navigationPattern: 'tabs', tabScreens: [...], stackScreens: [...], initialScreen: '...' }
 *
 * Without auth (drawer):
 *   { hasAuth: false, navigationPattern: 'drawer', drawerScreens: [...], stackScreens: [...], initialScreen: '...' }
 *
 * Without auth (tabs+drawer):
 *   { hasAuth: false, navigationPattern: 'tabs+drawer', tabScreens: [...], drawerScreens: [...], stackScreens: [...], initialScreen: '...' }
 *
 * With auth:
 *   {
 *     hasAuth: true,
 *     fixedScreens: ['Intro', 'Login'],
 *     publicScreens: ['PublicHome'],
 *     privateTabScreens: ['PrivateHome', 'Profile', 'Settings'],
 *     privateStackScreens: ['Details'],
 *   }
 */
function buildScreenConfig(answers, hasAuth) {
  if (hasAuth) {
    return {
      hasAuth: true,
      fixedScreens: ['Intro', 'Login'],
      publicScreens:
        answers.publicScreens && answers.publicScreens.length > 0
          ? answers.publicScreens
          : ['PublicHome'],
      privateTabScreens:
        answers.privateTabScreens && answers.privateTabScreens.length > 0
          ? answers.privateTabScreens
          : ['PrivateHome', 'Profile', 'Settings'],
      privateStackScreens:
        answers.privateStackScreens && answers.privateStackScreens.length > 0
          ? answers.privateStackScreens
          : ['Details'],
    };
  }

  const screens =
    answers.screens && answers.screens.length > 0
      ? answers.screens
      : ['Home', 'Details'];

  const pattern = answers.navigationPattern || NAVIGATION_PATTERNS.STACK;

  if (pattern === NAVIGATION_PATTERNS.STACK) {
    return {
      hasAuth: false,
      navigationPattern: NAVIGATION_PATTERNS.STACK,
      screens,
      initialScreen: screens[0],
    };
  }

  if (pattern === NAVIGATION_PATTERNS.TABS) {
    const tabScreens =
      answers.tabScreens && answers.tabScreens.length > 0
        ? filterValidScreens(answers.tabScreens, screens)
        : screens;
    const stackScreens = screens.filter((s) => !tabScreens.includes(s));
    return {
      hasAuth: false,
      navigationPattern: NAVIGATION_PATTERNS.TABS,
      tabScreens,
      stackScreens,
      initialScreen: tabScreens[0],
    };
  }

  if (pattern === NAVIGATION_PATTERNS.DRAWER) {
    const drawerScreens =
      answers.drawerScreens && answers.drawerScreens.length > 0
        ? filterValidScreens(answers.drawerScreens, screens)
        : screens;
    const stackScreens = screens.filter((s) => !drawerScreens.includes(s));
    return {
      hasAuth: false,
      navigationPattern: NAVIGATION_PATTERNS.DRAWER,
      drawerScreens,
      stackScreens,
      initialScreen: drawerScreens[0],
    };
  }

  if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
    const tabScreens =
      answers.tabScreens && answers.tabScreens.length > 0
        ? filterValidScreens(answers.tabScreens, screens)
        : screens;
    const drawerScreens =
      answers.drawerScreens && answers.drawerScreens.length > 0
        ? filterValidScreens(answers.drawerScreens, screens).filter(
            (s) => !tabScreens.includes(s)
          )
        : [];
    const assignedScreens = [...tabScreens, ...drawerScreens];
    const stackScreens = screens.filter((s) => !assignedScreens.includes(s));
    return {
      hasAuth: false,
      navigationPattern: NAVIGATION_PATTERNS.TABS_DRAWER,
      tabScreens,
      drawerScreens,
      stackScreens,
      initialScreen: tabScreens[0],
    };
  }

  // Fallback to stack
  return {
    hasAuth: false,
    navigationPattern: NAVIGATION_PATTERNS.STACK,
    screens,
    initialScreen: screens[0],
  };
}

/**
 * Get all screen names from a config (flat list)
 */
function getAllScreenNames(screenConfig) {
  if (screenConfig.hasAuth) {
    return [
      ...screenConfig.fixedScreens,
      ...screenConfig.publicScreens,
      ...screenConfig.privateTabScreens,
      ...screenConfig.privateStackScreens,
    ];
  }

  const pattern = screenConfig.navigationPattern || NAVIGATION_PATTERNS.STACK;

  if (pattern === NAVIGATION_PATTERNS.STACK) {
    return screenConfig.screens;
  }

  if (pattern === NAVIGATION_PATTERNS.TABS) {
    return [...screenConfig.tabScreens, ...(screenConfig.stackScreens || [])];
  }

  if (pattern === NAVIGATION_PATTERNS.DRAWER) {
    return [
      ...screenConfig.drawerScreens,
      ...(screenConfig.stackScreens || []),
    ];
  }

  if (pattern === NAVIGATION_PATTERNS.TABS_DRAWER) {
    return [
      ...screenConfig.tabScreens,
      ...(screenConfig.drawerScreens || []),
      ...(screenConfig.stackScreens || []),
    ];
  }

  return screenConfig.screens || [];
}

module.exports = {
  sanitizeScreenName,
  parseScreenList,
  validateScreenNames,
  buildScreenConfig,
  getAllScreenNames,
  filterValidScreens,
  RESERVED_NAMES,
  KNOWN_AUTH_SCREENS,
  NAVIGATION_PATTERNS,
};
