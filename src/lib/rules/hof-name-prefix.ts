/**
 * @fileoverview Higher order functions name prefix
 * @author Leonid Baryshnikov
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import { TSESTree } from '@typescript-eslint/experimental-utils';
import { Rule } from 'eslint';

type Functions =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.ArrowFunctionExpression;

type AllowedAncestors =
  | TSESTree.VariableDeclarator
  | TSESTree.MethodDefinition
  | TSESTree.AssignmentExpression
  | TSESTree.Property;

const rule: Rule.RuleModule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Higher order functions name prefix',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: undefined, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    // ERROR: can't pass tests when trying to pass options to rule...
    // const prefixRequired = context.options[0];

    const prefixRequired = 'make';

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const reportIdentifier = (identifier: TSESTree.Identifier): void => {
      context.report({
        node: identifier,
        message: `Higher order functions name should start with '${prefixRequired}'`,
      });
    };

    const isFunctionHigherOrder = (node: Functions): boolean => {
      if (!node.body) return false;

      const functionBody = node.body as TSESTree.BlockStatement;
      const { body: functionContent } = functionBody;

      const functionTypes = ['ArrowFunctionExpression', 'FunctionExpression'];

      const statementThatReturnsFunction = functionContent.find((contentNode: TSESTree.Node) => {
          const nodeReturnsFunction =
            contentNode.type === 'ReturnStatement' &&
            contentNode.argument &&
            functionTypes.includes(contentNode.argument.type);

          if (nodeReturnsFunction) return true;

          return false;
      });

      return !!statementThatReturnsFunction;
    };

    const getLastAncestor = (): TSESTree.Node => {
      const ancestors = context.getAncestors();
      const lastAncestor = ancestors[ancestors.length - 1];

      return lastAncestor as TSESTree.Node;
    };

    const checkIdentifier = (identifier: TSESTree.Identifier): void => {
      if (!identifier.name.startsWith(prefixRequired)) {
        reportIdentifier(identifier);
      }
    };

    const getIdentifier = (node: AllowedAncestors): TSESTree.Identifier => {
      const ancestorIsMethodOrProperty =
        node.type === 'MethodDefinition' || node.type === 'Property';

      const mayBeLeftProperty =
        node.type === 'AssignmentExpression'
          ? (node as TSESTree.AssignmentExpression).left.property
          : null;

      const mayBeKeyOrLeftProperty = ancestorIsMethodOrProperty
        ? (node as TSESTree.MethodDefinition | TSESTree.MethodDefinition).key
        : mayBeLeftProperty;

      const identifier =
        node.type === 'VariableDeclarator' ? node.id : mayBeKeyOrLeftProperty;

      return identifier;
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

      const lastAncestor = getLastAncestor() as AllowedAncestors;
      const functionIsHigherOrder = isFunctionHigherOrder(node);

      if (
        allowedAncestors.includes(lastAncestor.type) &&
        functionIsHigherOrder
      ) {
        const identifier = getIdentifier(lastAncestor);

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
