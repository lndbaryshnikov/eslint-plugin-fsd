import { TSESLint } from '@typescript-eslint/experimental-utils';

const es6: TSESLint.RuleTesterConfig = {
  parser: require.resolve('espree'),
  parserOptions: {
    ecmaVersion: 6,
  },
};

// eslint-disable-next-line
export { es6 };
