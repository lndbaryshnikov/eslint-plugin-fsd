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
  isHtmlElementSearchMethodIdentifier,
  isHtmlElementsObjectCollectionIdentifier,
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

    const checkForSearchMethodsAndCollections = (
      identifier: TSESTree.Identifier,
    ): void => {
      if (
        isHtmlElementSearchMethodIdentifier(identifier) ||
        isHtmlElementsObjectCollectionIdentifier(identifier)
      ) {
        reportIdentifier(identifier);
      }
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    const constructor =
      'ClassDeclaration MethodDefinition[key.name="constructor"]';
    const identifier = 'Identifier.property[name]';

    return {
      [`${constructor} MemberExpression.left ${identifier}`]: checkForEventAttributes,
      [`${constructor} MemberExpression.callee ${identifier}`]: checkForListenersMethods,
      [`${constructor} MemberExpression ${identifier}`]: checkForSearchMethodsAndCollections,
    };
  },
};

export default rule;
