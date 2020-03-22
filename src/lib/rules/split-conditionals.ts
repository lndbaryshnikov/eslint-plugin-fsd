import { TSESTree, ESLintUtils } from '@typescript-eslint/experimental-utils';

import { RuleMetaData } from '../../types';

import { isVariableDeclaration, getAncestorOfType } from '../utils/ast-utils';

//
// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
//

function hasMoreThen1Condition(node: TSESTree.LogicalExpression): boolean {
  const notAllowed = ['LogicalExpression', 'BinaryExpression'];

  return Boolean(
    notAllowed.includes(node.left.type) || notAllowed.includes(node.right.type),
  );
}

function isInsideVariableDeclaration(
  node: TSESTree.LogicalExpression,
): boolean {
  const variableDeclaration = getAncestorOfType<TSESTree.VariableDeclaration>(
    isVariableDeclaration,
    node,
  );

  return !!variableDeclaration;
}

//
// ─── RULE DECLARATIONS ──────────────────────────────────────────────────────────
//

const name = 'split-conditionals';

const createRule = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md',
);

const errorMessages = {
  tooManyConditions:
    'All checks containing more than one condition must be separated',
} as const;

const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: 'suggestion',
  docs: {
    category: 'Best Practices',
    description:
      'All checks containing more than one condition must be separated',
    recommended: false,
  },
  messages: errorMessages,
  schema: [],
};

const rule = createRule({
  name,
  meta,
  defaultOptions: [],
  create(context) {
    return {
      LogicalExpression: function checkLogicalExpression(node): void {
        if (isInsideVariableDeclaration(node)) {
          return;
        }

        if (hasMoreThen1Condition(node)) {
          context.report({
            node,
            messageId: 'tooManyConditions',
          });
        }
      },
    };
  },
});

export { name, rule, errorMessages };
