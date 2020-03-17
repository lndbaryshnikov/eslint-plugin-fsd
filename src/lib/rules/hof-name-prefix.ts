/**
 * @fileoverview Higher order functions name prefix
 * @author Leonid Baryshnikov
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

type Function =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.ArrowFunctionExpression;

type AllowedAncestors =
  | TSESTree.VariableDeclarator
  | TSESTree.MethodDefinition
  | TSESTree.AssignmentExpression
  | TSESTree.Property;

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Higher order functions name prefix',
      category: 'Stylistic Issues',
      recommended: false,
      url:
        'https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/hof-name-prefix.md',
    },
    fixable: undefined, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
    messages: {
      requireMake: 'Higher order functions name should start with make',
    },
  },

  create(
    context: TSESLint.RuleContext<string, string[]>,
  ): TSESLint.RuleListener {
    // ERROR: can't pass tests when trying to pass options to rule...
    // const prefixRequired = context.options[0];

    const prefixRequired = 'make';

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const reportIdentifier = (identifier: TSESTree.Identifier): void => {
      context.report({
        node: identifier,
        messageId: 'requireMake',
      });
    };

    const isFunctionHigherOrder = (node: Function): boolean => {
      if (!node.body) return false;

      const functionBody = node.body as TSESTree.BlockStatement;
      const { body: functionContent } = functionBody;

      const functionTypes = ['ArrowFunctionExpression', 'FunctionExpression'];

      const statementThatReturnsFunction = functionContent.find(
        (contentNode: TSESTree.Node) => {
          const nodeReturnsFunction =
            contentNode.type === 'ReturnStatement' &&
            contentNode.argument &&
            functionTypes.includes(contentNode.argument.type);

          if (nodeReturnsFunction) return true;

          return false;
        },
      );

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
          ? (node.left as TSESTree.MemberExpression).property
          : null;

      const mayBeKeyOrLeftProperty = ancestorIsMethodOrProperty
        ? (node as TSESTree.MethodDefinition | TSESTree.MethodDefinition).key
        : mayBeLeftProperty;

      const identifier =
        node.type === 'VariableDeclarator' ? node.id : mayBeKeyOrLeftProperty;

      return identifier as TSESTree.Identifier;
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
