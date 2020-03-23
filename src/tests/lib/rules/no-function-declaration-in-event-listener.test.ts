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
    // event handler as class method
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
    // event handler as simple function
    code: `
      myDOMElement.addEventListener('click', handleMyElClick);
    `,
  },
  {
    // using 'on' method to add event listener
    code: `
      myDOMElement.on('click', handleMyElClick);
    `,
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    // anonymous function as event handler
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
    // named function as event handler
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
    // arrow function as event handler
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
    // using 'on' method to add event listener
    code: `
      myDOMElement.on('click', function(e) {
        alert(e.target.value);
      });
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
