import { TSESLint } from '@typescript-eslint/experimental-utils';

import {
  name,
  rule,
  errorMessages,
} from '../../../lib/rules/jq-var-dollar-sign';
import { es6 } from '../../helpers/configs';

//
// ─── VALID TEST SCENARIOS ──────────────────────────────────────────────────────
//

const valid: TSESLint.ValidTestCase<[]>[] = [
  {
    // basic jquery operator with dollar
    code: 'var $x = $();',
  },
  {
    // basic jquery operator with leading underscore and dollar
    code: 'var _$x = $();',
  },
  {
    // basic assignment
    code: 'var x = 2;',
  },
  {
    // function assignment
    code: 'var x = function() {};',
  },
  {
    // function call
    code: 'var x = fn("foo")',
  },
  {
    // logical assignment
    code: 'var a = 1 || 2;',
  },
  {
    // assignment against dollar prefixed function
    code: 'var a = $func("foo")',
  },
  {
    // jquery root functions
    code: 'var x = $.extends();',
  },
  {
    // jquery operator with html with dollar
    code: 'var $x = $("<p>foo</p>");',
  },
  {
    // jquery operator with selector with dollar
    code: 'var $x = $(".foo");',
  },
  {
    // jquery operator using val
    code: 'var x = $(".foo").val();',
  },
  {
    // chained jquery operator with variable
    code: 'var x = $(evt.target).val();',
  },
  {
    // jquery operator using val over multiple lines
    code: 'var x = $(".foo")\n.val();',
  },
  {
    // jquery operator using chained methods
    code: 'var x = $(".foo").val().toString();',
  },
  {
    // jquery operator with dollar and line not beginning with var
    code: '$x = $(".foo");',
  },
  {
    // jquery operator with dollar and line not ending in semicolon
    code: 'var $x = $(".foo")',
  },
  {
    // jquery operator with dollar and single quotes around selector
    code: "var $x = $('.foo');",
  },
  {
    // object destructuring
    code: `
      var {beep, boop} = meep;
      var $s = $("#id");
      var {beep, boop} = $("#id")
    `,
  },
  {
    // object destructuring without var
    code: '({beep, boop} = $("#id"))',
  },
  {
    // array destructuring
    code: `
      var [beep, boop] = meep;
      var $s = $("#id")';
      var [beep, boop] = $("#id")
    `,
  },
  {
    // array destructuring without var
    code: '([beep, boop] = $("#id"))',
  },
  // in object definition
  {
    // basic jquery operator with dollar
    code: 'var x = { $foo: $() }',
  },
  {
    // jquery operator with html
    code: 'var x = { $foo: $("<p>foo</p>") }',
  },
  {
    // jquery operator with html with dollar
    code: 'var $x = { $foo: $("<p>foo</p>") }',
  },
  {
    // jquery operator with selector with dollar
    code: 'var $x = { $foo: $(".foo") }',
  },
  {
    // jquery operator using val
    code: 'var x = { foo: $(".foo").val() }',
  },
  {
    // jquery operator using val over multiple lines
    code: 'var x = { foo: $(".foo")\n.val() }',
  },
  {
    // jquery operator using chained methods
    code: 'var x = { foo: $(".foo").val().toString() }',
  },
  // in object props
  {
    // basic jquery operator with dollar
    code: 'this.$x = $();',
  },
  {
    // jquery operator with html with dollar
    code: 'this.$x = $("<p>foo</p>");',
  },
  {
    // jquery operator with selector with dollar
    code: 'this.$x = $(".foo");',
  },
  {
    // jquery operator using val
    code: 'this.x = $(".foo").val();',
  },
  {
    // jquery operator using val over multiple lines
    code: 'this.x = $(".foo")\n.val();',
  },
  {
    // jquery operator using chained methods
    code: 'this.x = $(".foo").val().toString();',
  },
  {
    // jquery operator with dollar and line not ending in semicolon
    code: 'this.$x = $(".foo")',
  },
  {
    // jquery operator with dollar and single quotes around selector
    code: "this.$x = $('.foo');",
  },
  {
    // direct assignment
    code: 'this.$video = $video;',
  },
  {
    // basic assignment
    code: 'w.x = 2;',
  },
  {
    // function assignment
    code: 'w.x = function() {};',
  },
  {
    // logical assignment
    code: 'w.a = 1 || 2;',
  },
  {
    // object logical assignment
    code: 'w.a = w.a || {};',
  },
  {
    // binary assignment
    code: 'w.a = 1 + 2;',
  },
  {
    // multi level object assignment
    code: 'a.b.$c = $()',
  },
];

//
// ─── INVALID TEST SCENARIOS ─────────────────────────────────────────────────────
//

const invalid: TSESLint.InvalidTestCase<keyof typeof errorMessages, []>[] = [
  {
    // basic jquery operator
    code: `var x = $();`,
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // assignment on next line without semicolon
    code: `
      var a = $(".foo")
      var b = $()
    `,
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // jquery operator with html
    code: 'var x = $("<p>foo</p>");',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // jquery operator with selector
    code: 'var x = $(".foo");',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // assignment on right hand side of object destructuring
    code: 'var {foo} = {foo: $(".foo")}',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  // in object definition
  {
    // basic jquery operator
    code: 'var x = { foo: $() }',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // jquery operator with selector
    code: 'var x = { foo: $(".foo") }',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // jquery operator with dollar and single quotes around selector
    code: "var $x = { foo: $('.foo') }",
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // keys besides the first
    code: 'var x = { bar: 1, foo: $(".foo") }',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  // in object properties
  {
    // basic jquery operator
    code: 'this.x = $();',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // jquery operator with html
    code: 'this.x = $("<p>foo</p>");',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // jquery operator with selector
    code: 'this.x = $(".foo");',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
  {
    // multi level object assignment without dollar
    code: 'a.b.c = $()',
    errors: [
      {
        messageId: 'useDollarSignPrefix',
      },
    ],
  },
];

const es6RuleTester = new TSESLint.RuleTester(es6);

es6RuleTester.run(name, rule, {
  valid,
  invalid,
});
