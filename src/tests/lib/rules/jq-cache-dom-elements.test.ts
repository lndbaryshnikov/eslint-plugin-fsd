import { TSESLint } from '@typescript-eslint/experimental-utils';

import {
  name,
  rule,
  errorMessages,
} from '../../../lib/rules/jq-cache-dom-elements';
import { es6 } from '../../helpers/configs';

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    code: `
      var $element = $('.js-element');
      $element.show();
      $element.find('.js-children').doSomething();
      $element.attr('data-id', 123);
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    code: `
      $('.js-element').show();
      $('.js-element').find('.js-children').doSomething();
      $('.js-element').attr('data-id', 123);
    `,
    errors: [
      {
        messageId: 'cacheDOMNodes',
      },
    ],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
