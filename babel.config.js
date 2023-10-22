module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['.'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@mmkv': './src/mmkv',
          '@redux': './src/redux',
          '@routes': './src/routes',
          '@scenes': './src/scenes',
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@env': './src/env.js',
        },
      },
    ],
  ],
};
