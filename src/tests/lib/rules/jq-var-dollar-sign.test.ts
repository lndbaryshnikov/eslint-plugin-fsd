import { TSESLint } from '@typescript-eslint/experimental-utils';

import {
  name,
  rule,
  errorMessages,
} from '../../../lib/rules/jq-var-dollar-sign';
import { es6 } from '../../helpers/configs';

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    code: `
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    code: `
    `,
    errors: [],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
