import {
  TSESTree,
  TSESLint,
  AST_NODE_TYPES,
} from '@typescript-eslint/experimental-utils';

const name = 'jq-cache-dom-elements';

//
// ─── RULE DESCRIPTION ───────────────────────────────────────────────────────────
//

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description: 'Кэшировать все найденные элементы',
      url:
        'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md',
      recommended: false,
    },
    messages: {
      cacheDOMNodes:
        'Cache selected DOM nodes. This DOM node was selected {{ times }} times',
    },
    schema: [],
  },
  create(context) {
    const foundSelectors: Map<string, TSESTree.Node[]> = new Map();

    return {
      'MemberExpression > CallExpression > Identifier.callee[name=/\\$|(jQuery)/]': function findRepeatedDOMSelections(
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
};

export { name, rule };
