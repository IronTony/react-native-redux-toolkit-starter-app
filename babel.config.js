module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
        ],
        root: ['.'],
        alias: {
          '@env': './src/env.js',
          '@api': './src/api',
          '@components': './src/components',
          '@i18n': './src/i18n',
          '@redux': './src/redux',
          '@routes': './src/routes',
          '@scenes': './src/scenes',
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
