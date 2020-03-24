module.exports = {
  roots: ['<rootDir>/src/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testRegex: '\\.test\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/tests/setup/polyfills.js'],
};
