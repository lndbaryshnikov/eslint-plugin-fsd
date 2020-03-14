/**
 * @fileoverview Higher order functions name prefix 
 * @author Leonid Baryshnikov
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/hof-name-prefix"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("hof-name-prefix", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "function clickHandler() {return function() {}}",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
