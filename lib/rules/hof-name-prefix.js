/**
 * @fileoverview Higher order functions name prefix 
 * @author Leonid Baryshnikov
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",
        docs: {
            description: "Higher order functions name prefix",
            category: "Stylistic Issues",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        const prefixRequired = context.options[0];
        // const prefixRequired = 'make';

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        const reportIdentifier = (identifier) => {
            context.report({
                node: identifier,
                message: `Higher order functions name should start with ${prefixRequired}`
            });
        }

        const isFunctionHigherOrder = (node) => {
            const functionContent = node.body.body;
            const functionTypes = [
                "ArrowFunctionExpression", 
                "FunctionExpression"
            ];

            const statementThatReturnsFunction = functionContent.find((node) => {
                const nodeReturnsFunction = node.type === "ReturnStatement" 
                    && functionTypes.includes(node.argument.type);
                
                if (nodeReturnsFunction) return true;
                
                return false;
            });

            return !!statementThatReturnsFunction;
        }

        const getLastAncestor = (node) => {
            const ancestors = context.getAncestors(node);
            
            return ancestors[ancestors.length - 1];
        }

        const checkIdentifier = (identifier) => {
            if (!identifier.name.startsWith(prefixRequired)) {
                reportIdentifier(identifier);
            }
        }

        const getIdentifier = (node) => {
            const ancestorIsMethodOrProperty = node.type === "MethodDefinition" 
            || node.type === "Property";
        
            const mayBeKeyOrLeftProperty = ancestorIsMethodOrProperty ? node.key
                : node.left.property;
            
            const identifier = node.type === "VariableDeclarator"
                ?  node.id : mayBeKeyOrLeftProperty;

            return identifier;
        }

        const checkFunctionDeclaration = (node) => {
            const functionIsHigherOrder = isFunctionHigherOrder(node);

            if(functionIsHigherOrder) {
                const identifier = node.id;
                
                checkIdentifier(identifier);
            }
        }

        
        const checkFunctionExpression = (node) => {
            const allowedAncestors = [
                "VariableDeclarator",
                "MethodDefinition",
                "AssignmentExpression",
                "Property",
            ];

            const lastAncestor = getLastAncestor(node);
            const functionIsHigherOrder = isFunctionHigherOrder(node);

            if (allowedAncestors.includes(lastAncestor.type) && functionIsHigherOrder) {               
                const identifier = getIdentifier(lastAncestor);

                checkIdentifier(identifier);
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            FunctionDeclaration: checkFunctionDeclaration,
            FunctionExpression: checkFunctionExpression,
            ArrowFunctionExpression: checkFunctionExpression
        };
    }
};
