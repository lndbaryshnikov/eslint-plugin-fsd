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
    // Handler definition out of constructor
    'a.onmouseup = () => {};',
    // Trying access another attribute in constructor
    'class a {constructor(c) {c.className = "className";}}',
    // Listeners methods in another method
    'class a {constructor() {} b(c) {c.addEventListener("click", () => {});}}',
    // Listeners methods out of constructor
    'a.addEventListener("click", () => {});',
    'a.removeEventListener("click", () => {});',
    // DOM elements search methods out of constructor
    'const a = document.querySelector(".b");',
    // Access to object collections out of constructor
    'const a = document.forms;',
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
    // DOM elements search methods
    {
      code:
        'class x {constructor(y) {const z = y.getElementsByClassName("class");}}',
      errors,
    },
    {
      code:
        'class x {constructor() {const z = document.getElementsByTagName("p");}}',
      errors,
    },
    // Access to object collections
    {
      code: 'class x {constructor() {const z = document.anchors;}}',
      errors,
    },
    {
      code: 'class x {constructor() {const z = document.forms["f"];}}',
      errors,
    },
  ],
});
