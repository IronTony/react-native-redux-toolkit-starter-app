const fs = require('fs');
const path = require('path');

/**
 * Reads and parses babel.config.js from the project directory.
 * Handles both CommonJS module.exports format and JSON format.
 *
 * @param {string} projectPath - Path to the project root directory
 * @returns {Object|null} Parsed Babel config object, or null if file doesn't exist
 * @throws {Error} If file exists but cannot be parsed
 */
function readBabelConfig(projectPath) {
  const babelConfigPath = path.join(projectPath, 'babel.config.js');

  if (!fs.existsSync(babelConfigPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(babelConfigPath, 'utf8');

    // Try to extract the config from module.exports = {...}
    // This is a simple approach - we'll look for the object literal
    const moduleExportsMatch = content.match(
      /module\.exports\s*=\s*({[\s\S]*});?\s*$/
    );

    if (moduleExportsMatch) {
      // Evaluate the object literal safely
      // Note: This assumes the config is a plain object literal
      // For more complex configs, we might need a more sophisticated parser
      try {
        // Remove module.exports = and trailing semicolon, then evaluate
        const configString = moduleExportsMatch[1];
        // Use Function constructor to evaluate in a safe context
        const config = new Function(`return ${configString}`)();
        return config;
      } catch (evalError) {
        // If direct evaluation fails, try to parse as JSON-like structure
        // This handles cases with template literals and other JS features
        throw new Error(
          `Cannot parse babel.config.js: ${evalError.message}. ` +
            `The config may contain dynamic values or complex expressions.`
        );
      }
    }

    // If no module.exports found, try parsing as JSON
    try {
      return JSON.parse(content);
    } catch (jsonError) {
      throw new Error(
        `Cannot parse babel.config.js: File does not match expected format. ` +
          `Expected module.exports = {...} or valid JSON.`
      );
    }
  } catch (error) {
    if (error.message.includes('Cannot parse')) {
      throw error;
    }
    throw new Error(`Failed to read babel.config.js: ${error.message}`);
  }
}

/**
 * Updates Babel config aliases by merging new aliases with existing ones.
 * Preserves existing aliases and merges new ones.
 *
 * @param {string} projectPath - Path to the project root directory
 * @param {Object} newAliases - Object with alias keys and path values to add/update
 * @param {string} preset - Babel preset to use (e.g., 'babel-preset-expo' or 'module:@react-native/babel-preset')
 * @returns {Object} Updated Babel config object
 */
function updateBabelAliases(projectPath, newAliases, preset) {
  let config = readBabelConfig(projectPath);

  // If no config exists, create a default one
  if (!config) {
    config = {
      presets: preset ? [preset] : [],
      plugins: [],
    };
  }

  // Ensure presets array exists
  if (!config.presets || !Array.isArray(config.presets)) {
    config.presets = preset ? [preset] : [];
  } else if (preset && !config.presets.includes(preset)) {
    // Add preset if it doesn't exist
    config.presets = [preset, ...config.presets];
  }

  // Ensure plugins array exists
  if (!config.plugins || !Array.isArray(config.plugins)) {
    config.plugins = [];
  }

  // Find or create module-resolver plugin
  let moduleResolverPlugin = config.plugins.find(
    (plugin) =>
      (Array.isArray(plugin) && plugin[0] === 'module-resolver') ||
      plugin === 'module-resolver'
  );

  if (!moduleResolverPlugin) {
    // Create new module-resolver plugin
    moduleResolverPlugin = [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {},
      },
    ];
    config.plugins.push(moduleResolverPlugin);
  } else if (typeof moduleResolverPlugin === 'string') {
    // Convert string plugin to array format
    const index = config.plugins.indexOf(moduleResolverPlugin);
    moduleResolverPlugin = [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {},
      },
    ];
    config.plugins[index] = moduleResolverPlugin;
  } else if (!Array.isArray(moduleResolverPlugin)) {
    // Invalid format, create new one
    const index = config.plugins.indexOf(moduleResolverPlugin);
    moduleResolverPlugin = [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {},
      },
    ];
    config.plugins[index] = moduleResolverPlugin;
  } else if (
    !moduleResolverPlugin[1] ||
    typeof moduleResolverPlugin[1] !== 'object'
  ) {
    // Plugin exists but config is invalid, fix it
    moduleResolverPlugin[1] = {
      root: ['./src'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {},
    };
  }

  // Ensure alias object exists
  if (
    !moduleResolverPlugin[1].alias ||
    typeof moduleResolverPlugin[1].alias !== 'object'
  ) {
    moduleResolverPlugin[1].alias = {};
  }

  // Merge new aliases with existing ones
  Object.assign(moduleResolverPlugin[1].alias, newAliases);

  // Ensure root and extensions are set
  if (!moduleResolverPlugin[1].root) {
    moduleResolverPlugin[1].root = ['./src'];
  }
  if (!moduleResolverPlugin[1].extensions) {
    moduleResolverPlugin[1].extensions = [
      '.ios.js',
      '.android.js',
      '.js',
      '.ts',
      '.tsx',
      '.json',
    ];
  }

  return config;
}

/**
 * Writes Babel config to babel.config.js file.
 * Formats the config as a CommonJS module.exports statement.
 *
 * @param {string} projectPath - Path to the project root directory
 * @param {Object} config - Babel config object to write
 */
function writeBabelConfig(projectPath, config) {
  const babelConfigPath = path.join(projectPath, 'babel.config.js');

  // Format the config as a JavaScript module
  // We need to handle presets and plugins arrays properly
  const formatValue = (value, indent = 0) => {
    const spaces = '  '.repeat(indent);
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;
    if (typeof value === 'number' || typeof value === 'boolean')
      return String(value);
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      const items = value
        .map((item) => `${spaces}  ${formatValue(item, indent + 1)}`)
        .join(',\n');
      return `[\n${items}\n${spaces}]`;
    }
    if (typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) return '{}';
      const items = keys
        .map((key) => {
          const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
            ? key
            : `'${key}'`;
          return `${spaces}  ${formattedKey}: ${formatValue(
            value[key],
            indent + 1
          )}`;
        })
        .join(',\n');
      return `{\n${items}\n${spaces}}`;
    }
    return JSON.stringify(value);
  };

  // Format plugins array with special handling for module-resolver
  const formatPlugins = (plugins) => {
    if (!plugins || plugins.length === 0) return '[]';
    const formatted = plugins.map((plugin) => {
      if (typeof plugin === 'string') {
        return `'${plugin}'`;
      }
      if (Array.isArray(plugin)) {
        const [name, options] = plugin;
        if (options && typeof options === 'object') {
          return `[\n      '${name}',\n      ${formatValue(options, 2)}\n    ]`;
        }
        return `['${name}']`;
      }
      return formatValue(plugin, 1);
    });
    return `[\n    ${formatted.join(',\n    ')}\n  ]`;
  };

  const presetsStr =
    config.presets && config.presets.length > 0
      ? `['${config.presets.join("', '")}']`
      : '[]';

  const pluginsStr = formatPlugins(config.plugins);

  const babelConfig = `module.exports = {
  presets: ${presetsStr},
  plugins: ${pluginsStr},
};
`;

  fs.writeFileSync(babelConfigPath, babelConfig);
}

module.exports = {
  readBabelConfig,
  updateBabelAliases,
  writeBabelConfig,
};
