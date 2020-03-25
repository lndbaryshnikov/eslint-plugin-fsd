/**
 * @fileoverview Higher order function name prefix
 * @author Leonid Baryshnikov
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';
import { isFunction } from 'eslint/lib/rules/utils/ast-utils';

import { Function } from '../../types';
import { getParent } from '../utils/ast-utils';

type AllowedAncestors =
  | TSESTree.VariableDeclarator
  | TSESTree.MethodDefinition
  | TSESTree.AssignmentExpression
  | TSESTree.Property;

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Higher order function name prefix',
      category: 'Stylistic Issues',
      recommended: false,
      url:
        'https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/hof-name-prefix.md',
    },
    fixable: undefined,
    schema: [],
    messages: {
      requireMake: 'Higher order function name should be prefixed with "make"',
    },
  },

  create(
    context: TSESLint.RuleContext<string, string[]>,
  ): TSESLint.RuleListener {
    const prefix = 'make';

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const reportIdentifier = (identifier: TSESTree.Identifier): void => {
      context.report({
        node: identifier,
        messageId: 'requireMake',
      });
    };

    const checkIdentifier = (identifier: TSESTree.Identifier): void => {
      if (!identifier.name.startsWith(prefix)) {
        reportIdentifier(identifier);
      }
    };

    const getIdentifier = (node: AllowedAncestors): TSESTree.Identifier => {
      const ancestorIsMethodOrProperty =
        node.type === 'MethodDefinition' || node.type === 'Property';

      const mayBeLeftProperty =
        node.type === 'AssignmentExpression'
          ? (node.left as TSESTree.MemberExpression).property
          : null;

      const mayBeKeyOrLeftProperty = ancestorIsMethodOrProperty
        ? (node as TSESTree.MethodDefinition | TSESTree.MethodDefinition).key
        : mayBeLeftProperty;

      const identifier =
        node.type === 'VariableDeclarator' ? node.id : mayBeKeyOrLeftProperty;

      return identifier as TSESTree.Identifier;
    };

    const isFunctionHigherOrder = (node: Function): boolean => {
      if (!node.body) return false;

      const functionBody = node.body as TSESTree.BlockStatement | Function;

      // When function body has no braces
      if (isFunction(functionBody)) return true;
      if (functionBody.type !== 'BlockStatement') return false;

      const { body: functionContent } = functionBody as TSESTree.BlockStatement;

      const statementThatReturnsFunction = functionContent.find(
        (contentNode: TSESTree.Node) => {
          const nodeReturnsFunction =
            contentNode.type === 'ReturnStatement' &&
            contentNode.argument &&
            isFunction(contentNode.argument);

          if (nodeReturnsFunction) return true;

          return false;
        },
      );

      return !!statementThatReturnsFunction;
    };

    const checkFunctionDeclaration = (
      node: TSESTree.FunctionDeclaration,
    ): void => {
      const functionIsHigherOrder = isFunctionHigherOrder(node);

      if (functionIsHigherOrder) {
        const identifier = node.id;

        checkIdentifier(identifier as TSESTree.Identifier);
      }
    };

    const checkFunctionExpression = (
      node: TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
    ): void => {
      const allowedAncestors = [
        'VariableDeclarator',
        'MethodDefinition',
        'AssignmentExpression',
        'Property',
      ];

      const parent = getParent(context);

      if (!parent) return;

      const functionIsHigherOrder = isFunctionHigherOrder(node);

      if (allowedAncestors.includes(parent.type) && functionIsHigherOrder) {
        const identifier = getIdentifier(parent as AllowedAncestors);

        checkIdentifier(identifier);
      }
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      FunctionDeclaration: checkFunctionDeclaration,
      FunctionExpression: checkFunctionExpression,
      ArrowFunctionExpression: checkFunctionExpression,
    };
  },
};

export default rule;
