import { TSESLint } from '@typescript-eslint/experimental-utils';

import {
  name,
  rule,
  errorMessages,
} from '../../../lib/rules/no-function-declaration-in-event-listener';
import { es6 } from '../../helpers/configs';

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    code: `
      class Component {
        bindEventListeners() {
          stopButton.addEventListener('click', this.handleStopButtonClick);
        }

        handleStopButtonClick() {
          return 1;
        }
      }
    `,
  },
  {
    code: `
      myDOMElement.addEventListener('click', handleMyElClick);
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    code: `
      elem.addEventListener( "click" , function() {alert('Спасибо!')});
    `,
    errors: [
      {
        messageId: 'functionForEventListener',
      },
    ],
  },
  {
    code: `
      elem.addEventListener( "click" , function mySuperHandler() {alert('super')});
    `,
    errors: [
      {
        messageId: 'functionForEventListener',
      },
    ],
  },
  {
    code: `
      elem.addEventListener( "click" , e => someHandler(e));
    `,
    errors: [
      {
        messageId: 'functionForEventListener',
      },
    ],
  },
  {
    code: `
      elem.addEventListener( "click" , () => null);
    `,
    errors: [
      {
        messageId: 'functionForEventListener',
      },
    ],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
