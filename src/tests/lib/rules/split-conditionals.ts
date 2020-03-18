import { TSESLint } from '@typescript-eslint/experimental-utils';

import { name, rule } from '../../../lib/rules/split-conditionals';
import { es6 } from '../../helpers/configs';

//
// ─── ERROR DESCRIPTIONS ─────────────────────────────────────────────────────────
//

const tooManyConditions: TSESLint.TestCaseError<string> = {
  messageId: 'tooManyConditions',
};

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    code: `
      if (this.isUpdateAllowedForUser(user, item)) { }
    `,
  },
  {
    code: `
      if (a === b) { }
    `,
  },
  {
    code: `
      if (a && b) { }
    `,
  },
  {
    code: `
      if (a || b) { }
    `,
  },
  {
    code: `
      if (!a) { }
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<string, []>[] = [
  {
    code: `
      if ((user.isAdmin) && (user.role === item.owner)) { }
    `,
    errors: [tooManyConditions],
  },
  {
    code: `
      if ((user.isAdmin) || (user.role === item.owner)) { }
    `,
    errors: [tooManyConditions],
  },
  {
    code: `
      if (a === b || c !== d) { }
    `,
    errors: [tooManyConditions],
  },
  {
    code: `
      if (a === b || c in d) { }
    `,
    errors: [tooManyConditions],
  },
  {
    code: `
      if (myList.includes(a) && b > c) { }
    `,
    errors: [tooManyConditions],
  },
  {
    code: `
      if (a < b && b > d && d != 0) { }
    `,
    errors: [tooManyConditions, tooManyConditions],
  },
  {
    code: `
      if ({}.prototype.hasOwnProperty('x', a) && a.length > 0) { }
    `,
    errors: [tooManyConditions],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
