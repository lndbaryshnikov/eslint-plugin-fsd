import { TSESLint } from '@typescript-eslint/experimental-utils';

import {
  name,
  rule,
  errorMessages,
} from '../../../lib/rules/split-conditionals';
import { es6 } from '../../helpers/configs';

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    // function invocation
    code: `
      if (isUpdateAllowedForUser(user, item)) { }
    `,
  },
  {
    // method invocation
    code: `
      if (this.isUpdateAllowedForUser(user, item)) { }
    `,
  },
  {
    // binary conditional
    code: `
      if (a === b) { }
    `,
  },
  {
    // unary conditional
    code: `
      if (!a) { }
    `,
  },
  {
    // skip assignment expressions
    code: `
      var isUserDefined = user && user.id !== null;
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    // if clause with 2 conditions
    code: `
      if ((user.isAdmin) && (user.role === item.owner)) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
  {
    // if clause with 3 conditions
    code: `
      if ((user.isAdmin) && (user.role === item.owner) || !user.id) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
  {
    // while clause with 2 conditions
    code: `
      while ((user.isAdmin) || (user.role === item.owner)) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
  {
    // for loop with 2 conditions
    code: `
      for (let i = 0; i < list.length || i <= 100; i += 1) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
  {
    // use 'in' operator
    code: `
      if (a === b || c in d) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
