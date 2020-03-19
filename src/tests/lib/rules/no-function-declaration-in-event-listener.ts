import { TSESLint } from '@typescript-eslint/experimental-utils';

import {
  name,
  rule,
} from '../../../lib/rules/no-function-declaration-in-event-listener';
import { es6 } from '../../helpers/configs';

//
// ─── ERROR DESCRIPTIONS ─────────────────────────────────────────────────────────
//

const functionForEventListener: TSESLint.TestCaseError<string> = {
  messageId: 'functionForEventListener',
};

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

const invalid: TSESLint.InvalidTestCase<string, []>[] = [
  {
    code: `
      elem.addEventListener( "click" , function() {alert('Спасибо!')});
    `,
    errors: [functionForEventListener],
  },
  {
    code: `
      elem.addEventListener( "click" , function mySuperHandler() {alert('super')});
    `,
    errors: [functionForEventListener],
  },
  {
    code: `
      elem.addEventListener( "click" , e => someHandler(e));
    `,
    errors: [functionForEventListener],
  },
  {
    code: `
      elem.addEventListener( "click" , () => null);
    `,
    errors: [functionForEventListener],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
