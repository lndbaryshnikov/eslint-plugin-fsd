import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

import { isFunction } from '../utils/ast-utils';

const name = 'no-function-declaration-in-event-listener';

//
// ─── RULE DESCRIPTION ───────────────────────────────────────────────────────────
//

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: 'Выносить обработчики событий в отдельные функции',
      url:
        'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md',
      recommended: false,
    },
    messages: {
      functionForEventListener:
        'Выносить обработчики событий в отдельные функции',
    },
    schema: [],
  },
  create(context) {
    return {
      'CallExpression > MemberExpression > Identifier.property[name="addEventListener"]': function(
        node: TSESTree.Identifier,
      ): void {
        const memberExpression = node.parent as TSESTree.MemberExpression;
        const callExpression = memberExpression.parent as TSESTree.CallExpression;
        const secondArg = callExpression.arguments[1];

        if (isFunction(secondArg)) {
          context.report({
            node: secondArg,
            messageId: 'functionForEventListener',
          });
        }
      },
    };
  },
};

export { name, rule };
