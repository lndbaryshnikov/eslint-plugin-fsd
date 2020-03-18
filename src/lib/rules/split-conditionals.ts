import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

const name = 'split-conditionals';

//
// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
//

function hasMoreThen1Condition(node: TSESTree.LogicalExpression): boolean {
  const notAllowed = ['LogicalExpression', 'BinaryExpression'];

  return Boolean(
    notAllowed.includes(node.left.type) || notAllowed.includes(node.right.type),
  );
}

//
// ─── RULE DESCRIPTION ───────────────────────────────────────────────────────────
//

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Все проверки содержащие более одного условия должны быть вынесены',
      url:
        'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md',
      recommended: false,
    },
    messages: {
      tooManyConditions:
        'Все проверки содержащие более одного условия должны быть вынесены',
    },
    schema: [],
  },
  create(context) {
    return {
      LogicalExpression(node): void {
        if (hasMoreThen1Condition(node)) {
          context.report({
            node,
            messageId: 'tooManyConditions',
          });
        }
      },
    };
  },
};

export { name, rule };
