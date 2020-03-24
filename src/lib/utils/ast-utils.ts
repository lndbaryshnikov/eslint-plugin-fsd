import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

const getParent = <MessageIds extends string, TOptions extends unknown[]>(
  context: TSESLint.RuleContext<MessageIds, TOptions>,
): TSESTree.Node | undefined => {
  const ancestors = context.getAncestors();
  return ancestors.length > 0 ? ancestors[ancestors.length - 1] : undefined;
};

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

export { getParent, getAncestorOfType };
