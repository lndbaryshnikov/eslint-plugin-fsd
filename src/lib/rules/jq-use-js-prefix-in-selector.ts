import {
  TSESTree,
  AST_NODE_TYPES,
  ESLintUtils,
} from '@typescript-eslint/experimental-utils';

import { RuleMetaData } from '../../types';

//
// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
//

/**
 * Check if provided selector adheres to rule:
 * All classes that are used to select dom elements - should start with "js-" prefix
 * @param selector jquery selector string
 */
function isCorrectSelector(selector = ''): boolean {
  // if selector is not an html element string
  if (selector.startsWith('<')) return false;

  const parts = selector.split(',').flatMap(s => s.split(/\s+/));

  const allSelectorsAreCorrect = parts.every(sel => {
    // if selector is a class - it should be prefixed with 'js-'
    if (sel.startsWith('.') && !sel.startsWith('.js-')) return false;

    return true;
  });

  return allSelectorsAreCorrect;
}

//
// ─── RULE DECLARATIONS ──────────────────────────────────────────────────────────
//

const name = 'jq-use-js-prefix-in-selector';

const createRule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md`,
);

const errorMessages = {
  useJsPrefix:
    'All classes that are used to search the DOM must begin with "js-" prefix',
} as const;

const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: 'suggestion',
  docs: {
    category: 'Best Practices',
    description:
      'All classes that are used to search the DOM must begin with "js-" prefix',
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
    return {
      [jqDOMSelector]: function checkDOMSelector(
        node: TSESTree.Identifier,
      ): void {
        const callExpression = node.parent as TSESTree.CallExpression;
        const firstArg = callExpression.arguments[0];

        if (firstArg.type === AST_NODE_TYPES.Literal) {
          if (!firstArg.value) return;

          const selector = firstArg.value.toString();
          if (!isCorrectSelector(selector)) {
            context.report({
              node: callExpression,
              messageId: 'useJsPrefix',
            });
          }
        }
      },
    };
  },
});

export { name, rule, errorMessages };
