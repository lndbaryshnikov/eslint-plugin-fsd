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

const errors = [
  {
    messageId: 'heavyConstructor',
    type: 'Identifier',
  },
];

const ruleTester = new RuleTester({ env: { es6: true } });
ruleTester.run('no-heavy-constructor', NoHeavyConstructor as Rule.RuleModule, {
  valid: [
    // Empty constructor
    'class a {constructor() {}}',
    // Handler definition in another method
    'class a {constructor() {} b(c) {c.onclick = () => {}}}',
    // Trying access another attribute in constructor
    'class a {constructor(c) {c.className = "className";}}',
    // Listeners methods in another method
    'class a {constructor() {} b(c) {c.addEventListener("click", () => {});}}',
  ],

  invalid: [
    // Handler definition in constructor
    {
      code: 'class x {constructor(y) {y.onclick = () => {}}}',
      errors,
    },
    // Handler definition with 'this' keyword
    {
      code:
        'class x {constructor(y) {this.y = y; this.y.onchange = () => {};}}',
      errors,
    },
    // Handler definition in function within constructor
    {
      code:
        'class x {constructor(y) {const z = () => {y.onmouseup = () => {};}; z();}}',
      errors,
    },
    // 'addEventListener' method
    {
      code: 'class x {constructor(y) {y.addEventListener("click", () => {});}}',
      errors,
    },
    // 'removeEventListener' method
    {
      code:
        'class x {constructor(y) {y.removeEventListener("click", () => {});}}',
      errors,
    },
  ],
});
