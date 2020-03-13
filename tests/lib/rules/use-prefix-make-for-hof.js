/**
 * @fileoverview Функции высшего порядка, возвращающие функции, следует именовать по шаблону make + .* + отглагольное существительное, где .* — опциональный, синтаксически корректный набор слов уточняющий предназначение функции.
 * @author timon-and-pumbaa
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/use-prefix-make-for-hof"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("use-prefix-make-for-hof", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "function getButton() {return function() {}}",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
