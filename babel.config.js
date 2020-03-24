module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10.19.0',
        },
        modules: 'commonjs',
      },
    ],
  ],
  sourceMaps: 'inline',
};
