import { TSESLint } from '@typescript-eslint/experimental-utils';

import { name, rule } from '../../../lib/rules/jq-use-js-prefix-in-selector';
import { es6 } from '../../helpers/configs';

//
// ─── ERROR DESCRIPTIONS ─────────────────────────────────────────────────────────
//

const useJsPrefix: TSESLint.TestCaseError<string> = {
  messageId: 'useJsPrefix',
};

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    code: `
      $('.js-open-popup-button').click();
    `,
  },
  {
    code: `
      jQuery('.js-open-popup-button').click();
    `,
  },
  {
    code: `
      $('.js-wrapper .js-open-popup-button').click();
    `,
  },
  {
    code: `
      $('#container .js-wrapper, #container2 .js-wrapper > .js-popup').click();
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<string, []>[] = [
  {
    code: `
      $('.open-popup-button').click();
    `,
    errors: [useJsPrefix],
  },
  {
    code: `
      jQuery('.open-popup-button').click();
    `,
    errors: [useJsPrefix],
  },
  {
    code: `
      $('.js-wrapper .open-popup-button').click();
    `,
    errors: [useJsPrefix],
  },
  {
    code: `
      $('.js-wrapper .js-open-popup-button, #container > .wrapper').click();
    `,
    errors: [useJsPrefix],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
