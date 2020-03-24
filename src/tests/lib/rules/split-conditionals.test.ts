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
    // 1 binary condition
    code: `
      if (a === b) { }
    `,
  },
  {
    // 2 binary conditions
    code: `
      if (a === b && b < c) { }
    `,
  },
  {
    // 1 unary condition
    code: `
      if (!a) { }
    `,
  },
  {
    // 2 unary conditions
    code: `
      if (!a && !b) { }
    `,
  },
  {
    // if elseif
    code: `
      if (!a && !b) { 
        console.log('ok');
      } else if (c !== d) {
        console.log('bad');
      } 
    `,
  },
  {
    // skip if inside assignment expressions
    code: `
      var isUserDefined = user && user.id !== null;
    `,
  },
  {
    // skip if inside return statement
    code: `
      function foo(x) {
        return (x >= 100 && x < window.width) || (x >= 200 && x < window.width);
      }
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
      if ((this.allowUpdate) && ((user.isAdmin) || (user.role === item.owner))) {
        this.update(item.data);
      }
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
      if (a > 10 && b > 50 || (a + b > 60) || (a - b) < 0) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
  {
    // if elseif
    code: `
      if (a < b && b > c || c < 100) { 
        console.log('ok');
      } else if (a > b && b < c || c > 100) {
        console.log('bad');
      } 
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
      while (x > 100 || y !== 200 && (x + y !== z)) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
  {
    // while clause with 3 conditions
    code: `
      while (x > 100 || y !== 200 && (x + y !== z) || (x - y < 0)) { }
    `,
    errors: [
      {
        messageId: 'tooManyConditions',
      },
    ],
  },
  {
    // do while clause with 2 conditions
    code: `
      do {}
      while (x > 100 || y !== 200 && (x + y !== z));
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
      for (let i = 0; i < list.length || i <= 100 && i < j; i += 1) { }
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
