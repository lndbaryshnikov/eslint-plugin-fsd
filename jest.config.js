module.exports = {
  roots: ['<rootDir>/src/tests'],
  transform: {
    '.ts$': 'ts-jest',
    '.js$': 'babel-jest',
  },
  testRegex: '.test.[jt]s$',
};
