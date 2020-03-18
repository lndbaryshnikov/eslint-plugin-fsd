import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

type Function =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.ArrowFunctionExpression;

const isFunction = (node: TSESTree.Node): boolean => {
  const anyFunctionPattern = /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/u;

  return !!(node && anyFunctionPattern.test(node.type));
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

const getLastAncestor = <MessageIds extends string, TOptions extends unknown[]>(
  context: TSESLint.RuleContext<MessageIds, TOptions>,
): TSESTree.Node => {
  const ancestors = context.getAncestors();
  const lastAncestor = ancestors[ancestors.length - 1];

  return lastAncestor;
};

export { isFunction, isFunctionHigherOrder, getLastAncestor };
