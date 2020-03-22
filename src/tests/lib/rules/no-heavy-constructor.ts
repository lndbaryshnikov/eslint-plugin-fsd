/**
 * @fileoverview Higher order functions name prefix
 * @author Leonid Baryshnikov
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule, RuleTester } from 'eslint';
import NoHeavyConstructor from '../../../lib/rules/no-heavy-constructor';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ env: { es6: true } });
ruleTester.run('no-heavy-constructor', NoHeavyConstructor as Rule.RuleModule, {
  valid: [],

  invalid: [],
});
