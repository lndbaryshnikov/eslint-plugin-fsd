/**
 * @fileoverview Higher order functions name prefix
 * @author Leonid Baryshnikov
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

import {
  isHtmlEventIdentifier,
  isListenerMethodIdentifier,
} from '../utils/ast-utils';

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'layout',
    docs: {
      description: 'No heavy constructor',
      category: 'Stylistic Issues',
      recommended: false,
      url:
        'https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/no-heavy-constructor.md',
    },
    fixable: undefined,
    schema: [],
    messages: {
      heavyConstructor:
        "Constructor shouldn't search the DOM and define handlers",
    },
  },

  create(
    context: TSESLint.RuleContext<string, string[]>,
  ): TSESLint.RuleListener {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const reportIdentifier = (identifier: TSESTree.Identifier): void => {
      context.report({
        node: identifier,
        messageId: 'heavyConstructor',
      });
    };

    const checkForEventAttributes = (identifier: TSESTree.Identifier): void => {
      if (isHtmlEventIdentifier(identifier)) {
        reportIdentifier(identifier);
      }
    };

    const checkForListenersMethods = (
      identifier: TSESTree.Identifier,
    ): void => {
      if (isListenerMethodIdentifier(identifier)) {
        reportIdentifier(identifier);
      }
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      'ClassDeclaration MethodDefinition[key.name="constructor"] MemberExpression.left Identifier.property[name]': checkForEventAttributes,
      'ClassDeclaration MethodDefinition[key.name="constructor"] MemberExpression.callee Identifier.property[name]': checkForListenersMethods,
    };
  },
};

export default rule;
