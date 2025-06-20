module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
    ['module:react-native-dotenv'],
    '@babel/plugin-transform-export-namespace-from',
  ],
};
