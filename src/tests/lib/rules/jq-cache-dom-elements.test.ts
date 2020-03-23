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
    // Cache dom node
    code: `
      var $element = $('.js-element');
      $element.show();
      $element.find('.js-children').doSomething();
      $element.attr('data-id', 123);
    `,
  },
  {
    // DOM queries in global & local scopes
    code: `
      var $element = $('.js-element');
      $element.show();

      function foo() {
        var $element = $('.js-element');
        $element.find('.js-children').doSomething();
        $element.attr('data-id', 123);
      }
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    // Not cached DOM node
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
  {
    // Not cached DOM node in local scope
    code: `
      var x = $('.js-element').show();

      function foo() {
        $('.js-element').find('.js-children').doSomething();
        $('.js-element').attr('data-id', 123);
      }
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
