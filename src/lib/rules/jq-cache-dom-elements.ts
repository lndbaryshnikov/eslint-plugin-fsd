import {
  TSESTree,
  ESLintUtils,
  AST_NODE_TYPES,
} from '@typescript-eslint/experimental-utils';

import { RuleMetaData } from '../../types';

//
// ─── RULE DECLARATIONS ──────────────────────────────────────────────────────────
//

const name = 'jq-cache-dom-elements';

const createRule = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md',
);

const errorMessages = {
  cacheDOMNodes:
    'Cache selected DOM nodes. This DOM node was selected {{ times }} times',
} as const;

const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: 'suggestion',
  docs: {
    category: 'Best Practices',
    description: 'Cache all selected DOM elements',
    recommended: false,
  },
  messages: errorMessages,
  schema: [],
};

const jqDOMSelector =
  'MemberExpression > CallExpression > Identifier.callee[name=/\\$|(jQuery)/]';

const rule = createRule({
  name,
  meta,
  defaultOptions: [],
  create(context) {
    const foundSelectors: Map<string, TSESTree.Node[]> = new Map();

    return {
      [jqDOMSelector]: function checkDOMSelector(
        node: TSESTree.Identifier,
      ): void {
        const callExpression = node.parent as TSESTree.CallExpression;
        const firstArg = callExpression.arguments[0];

        if (firstArg.type === AST_NODE_TYPES.Literal) {
          if (!firstArg.value) return;

          const selector = firstArg.value.toString();
          const sameSelectorNodes = foundSelectors.get(selector) || [];

          if (foundSelectors.has(selector)) {
            sameSelectorNodes.push(callExpression);
          }

          foundSelectors.set(selector, sameSelectorNodes);
        }
      },
      'Program:exit': function reportIfRepeatedSelectionsFound(): void {
        foundSelectors.forEach(selectors => {
          if (selectors.length > 1) {
            context.report({
              messageId: 'cacheDOMNodes',
              node: selectors[0],
              data: { times: selectors.length },
            });
          }
        });
      },
    };
  },
});

export { name, rule, errorMessages };
