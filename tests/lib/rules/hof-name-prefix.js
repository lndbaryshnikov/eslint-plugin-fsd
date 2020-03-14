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

var ruleTester = new RuleTester({ env: { es6: true } });
ruleTester.run("hof-name-prefix", rule, {
    valid: [
        {
            code: "function makeClickHandler() {return function() {}};",
            options: ["make"]
        }  
    ],

    invalid: [
        {
            code: "function clickHandler() {return function() {}};",
            options: ["make"],
            errors: [{
                message: "Higher order functions name should start with make",
                type: "Identifier"
            }]
        }
    ]
});
