import { Rule } from 'eslint';
import { Node } from 'estree'; // eslint-disable-line import/no-unresolved

const name = 'split-conditionals';

function hasMoreThen2Conditions(node: Node): boolean {
  return Boolean(node.range && node.range.length >= 2);
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Все проверки содержащие более одного условия должны быть вынесены',
      url:
        'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md',
    },
  },
  create(context) {
    return {
      LogicalExpression(node): void {
        if (hasMoreThen2Conditions(node)) {
          context.report({
            node,
            message:
              'Все проверки содержащие более одного условия должны быть вынесены',
          });
        }
      },
    };
  },
};

export { name, rule };
