import {
  TSESTree,
  ESLintUtils,
  AST_NODE_TYPES,
} from '@typescript-eslint/experimental-utils';

import { RuleMetaData } from '../../types';

//
// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
//

function hasMoreThen1Condition(node: TSESTree.LogicalExpression): boolean {
  return (
    node.left.type === AST_NODE_TYPES.LogicalExpression ||
    node.right.type === AST_NODE_TYPES.LogicalExpression
  );
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
    function checkLogicalExpression(node: TSESTree.LogicalExpression): void {
      if (hasMoreThen1Condition(node)) {
        context.report({
          node,
          messageId: 'tooManyConditions',
        });
      }
    }

    function checkRule(
      node:
        | TSESTree.IfStatement
        | TSESTree.WhileStatement
        | TSESTree.DoWhileStatement
        | TSESTree.ForStatement,
    ): void {
      const testCondition = node.test;

      if (!testCondition) return;
      if (testCondition.type !== AST_NODE_TYPES.LogicalExpression) return;

      checkLogicalExpression(testCondition);
    }

    return {
      IfStatement: checkRule,
      WhileStatement: checkRule,
      DoWhileStatement: checkRule,
      ForStatement: checkRule,
    };
  },
});

export { name, rule, errorMessages };
