import { TSESLint } from '@typescript-eslint/experimental-utils';

import {
  name,
  rule,
  errorMessages,
} from '../../../lib/rules/jq-use-js-prefix-in-selector';
import { es6 } from '../../helpers/configs';

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    // 1 class name with 'js' prefix
    code: `
      $('.js-open-popup-button').click();
    `,
  },
  {
    // 1 class name with 'js' prefix & jQuery instead of $
    code: `
      jQuery('.js-open-popup-button').click();
    `,
  },
  {
    // 2 class names with 'js' prefix
    code: `
      $('.js-wrapper .js-open-popup-button').click();
    `,
  },
  {
    // multiple selectors
    code: `
      $('#container .js-wrapper, #container2 .js-wrapper > .js-popup').click();
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    // 1 class without 'js' prefix
    code: `
      $('.open-popup-button').click();
    `,
    errors: [
      {
        messageId: 'useJsPrefix',
      },
    ],
  },
  {
    // 1 class name without 'js' prefix & jQuery instead of $
    code: `
      jQuery('.open-popup-button').click();
    `,
    errors: [
      {
        messageId: 'useJsPrefix',
      },
    ],
  },
  {
    // 2 classes where 1 doesn't have 'js' prefix
    code: `
      $('.js-wrapper .open-popup-button').click();
    `,
    errors: [
      {
        messageId: 'useJsPrefix',
      },
    ],
  },
  {
    // multiple selector
    code: `
      $('.js-wrapper .js-open-popup-button, #container > .wrapper').click();
    `,
    errors: [
      {
        messageId: 'useJsPrefix',
      },
    ],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
