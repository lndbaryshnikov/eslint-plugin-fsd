import { TSESTree, ESLintUtils } from '@typescript-eslint/experimental-utils';

import { RuleMetaData } from '../../types';

import { isFunction } from '../utils/ast-utils';

//
// ─── RULE DECLARATIONS ──────────────────────────────────────────────────────────
//

const name = 'no-function-declaration-in-event-listener';

const createRule = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md',
);

const errorMessages = {
  functionForEventListener: 'Move event handlers to separate functions',
} as const;

const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: 'suggestion',
  docs: {
    category: 'Best Practices',
    description: 'Move event handlers to separate functions',
    recommended: false,
  },
  messages: errorMessages,
  schema: [],
};

const addEventListenerSelector =
  'CallExpression > MemberExpression > Identifier.property[name=/addEventListener|on/]';

const rule = createRule({
  name,
  meta,
  defaultOptions: [],
  create(context) {
    return {
      [addEventListenerSelector]: function checkEventListener(
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
});

export { name, rule, errorMessages };
