import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

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

export { isFunction, getLastAncestor };
