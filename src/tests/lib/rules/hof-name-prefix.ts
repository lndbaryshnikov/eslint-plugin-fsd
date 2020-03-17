/**
 * @fileoverview Higher order functions name prefix
 * @author Leonid Baryshnikov
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule, RuleTester } from 'eslint';
import rule from '../../../lib/rules/hof-name-prefix';

const errors = [
  {
    messageId: 'requireMake',
    type: 'Identifier',
  },
];

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ env: { es6: true } });
ruleTester.run('hof-name-prefix', rule as Rule.RuleModule, {
  valid: [
    // FunctionDeclaration
    'function makeA() {const a = 1; return function() {}};',
    // FunctionExpression in VariableDeclarator
    'const makeA = function() {return function() {}};',
    // ArrowFunctionExpression in VariableDeclarator
    'const makeA = () => {return function() {}};',
    // FunctionExpression in class MethodDefinition
    'class B {makeA() {return function() {}}}',
    // FunctionExpression in AssignmentExpression
    'this.makeA = function() {return function() {}}',
    // ArrowFunctionExpression in AssignmentExpression
    'this.makeA = () => {return function() {}}',
    // FunctionExpression in Property
    'const b = {makeA() {return function() {}}};',
    // FunctionExpression in Property
    'const b = {makeA: function() {return function() {}}};',
    // ArrowFunctionExpression in Property
    'const b = {makeA: () => {return function() {}}};',

    // When returning function is ArrowFunctionExpression
    'const makeA = function() {return () => {}};',
    // When there are another nodes in returning function BlockStatement
    'const makeA = () => {const b = 1; if (b === 1) {b += 1} return function() {}};',
  ],

  invalid: [
    // FunctionDeclaration
    { code: 'function x() {return function() {}};', errors },
    // FunctionExpression
    { code: 'const x = function() {return function() {}};', errors },
    // ArrowFunctionExpression
    { code: 'const x = () => {return function() {}};', errors },
    // FunctionExpression in class MethodDefinition
    { code: 'class B {x() {return function() {}}}', errors },
    // FunctionExpression in AssignmentExpression
    { code: 'this.x = function() {return function() {}}', errors },
    // ArrowFunctionExpression in AssignmentExpression
    { code: 'this.x = () => {return function() {}}', errors },
    // FunctionExpression in Property
    { code: 'const x = {x() {return function() {}}};', errors },
    // FunctionExpression in Property
    { code: 'const x = {x: function() {return function() {}}};', errors },
    // ArrowFunctionExpression in Property
    { code: 'const x = {x: () => {return function() {}}};', errors },

    // When returning function is ArrowFunctionExpression
    { code: 'const x = function() {return () => {}};', errors },
    // When there are another nodes in returning function BlockStatement
    {
      code:
        'const x = () => {const b = 1; if (b === 1) {b += 1} return function() {}};',
      errors,
    },
  ],
});
