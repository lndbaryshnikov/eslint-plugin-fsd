import {
  TSESTree,
  TSESLint,
  AST_NODE_TYPES,
} from '@typescript-eslint/experimental-utils';

const isFunction = (node: TSESTree.Node): boolean => {
  const anyFunctionPattern = /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/u;

  return !!(node && anyFunctionPattern.test(node.type));
};

const getLastAncestor = <MessageIds extends string, TOptions extends unknown[]>(
  context: TSESLint.RuleContext<MessageIds, TOptions>,
): TSESTree.Node => {
  const ancestors = context.getAncestors();
  const lastAncestor = ancestors[ancestors.length - 1];

  return lastAncestor;
};

/**
 * Check if provided node is a VariableDeclaration
 * @param node any ast node
 */
function isVariableDeclaration(
  node: TSESTree.Node,
): node is TSESTree.VariableDeclaration {
  return node.type === AST_NODE_TYPES.VariableDeclaration;
}

/**
 * Return the first ancestor that meets the given check criteria.
 */
function getAncestorOfType<T extends TSESTree.Node>(
  checker: (node: TSESTree.Node) => node is T,
  node: TSESTree.Node,
): T | null {
  if (checker(node)) return node;

  if (!node.parent) return null;

  return getAncestorOfType(checker, node.parent);
}

export {
  isFunction,
  getLastAncestor,
  isVariableDeclaration,
  getAncestorOfType,
};
