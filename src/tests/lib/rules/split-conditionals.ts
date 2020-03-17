import dedent from 'dedent';
import { RuleTester } from 'eslint';

import { name, rule } from '../../../lib/rules/split-conditionals';

//
// ─── ERRORS DESCRIPTION ─────────────────────────────────────────────────────────
//

const errors: RuleTester.InvalidTestCase['errors'] = [
  {
    message:
      'Все проверки содержащие более одного условия должны быть вынесены',
  },
];

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: RuleTester.ValidTestCase[] = [
  {
    code: dedent`
      if (this.isUpdateAllowedForUser(user, item)) {
        this.update(item.data);
      }
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: RuleTester.InvalidTestCase[] = [
  {
    code: dedent`
      if ((user.isAdmin) || (user.role === item.owner)) {
        this.update(item.data);
      }
    `,
    errors,
  },
];

const ruleTester = new RuleTester({ env: { es6: true } });

ruleTester.run(name, rule, {
  valid,
  invalid,
});
