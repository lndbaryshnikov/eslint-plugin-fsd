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
  {
    // DOM queries in 2 local scopes
    code: `
      function bar() {
        var $element = $('.js-element');
        $element.show();
      }

      function foo() {
        var $element = $('.js-element');
        $element.find('.js-children').doSomething();
        $element.attr('data-id', 123);
      }
    `,
  },
  {
    // Function inside function
    code: `
      function foo() {
        function bar() {
          var x = $('.js-element');
          x.find('.js-children').doSomething();
          x.attr('data-id', 123);
          x.show();
        }
        
        return bar;
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
    // Not cached DOM node (using jQuery instead of $)
    code: `
      jQuery('.js-element').show();
      jQuery('.js-element').find('.js-children').doSomething();
      jQuery('.js-element').attr('data-id', 123);
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
  {
    // Function inside function
    code: `
      function foo() {
        function bar() {
          $('.js-element').find('.js-children').doSomething();
          $('.js-element').attr('data-id', 123);
          $('.js-element').show();
        }
        
        return bar;
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
