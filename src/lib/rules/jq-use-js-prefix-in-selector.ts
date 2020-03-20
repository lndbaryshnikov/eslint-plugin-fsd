import {
  TSESTree,
  TSESLint,
  AST_NODE_TYPES,
} from '@typescript-eslint/experimental-utils';

const name = 'jq-use-js-prefix-in-selector';

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
// ─── RULE DESCRIPTION ───────────────────────────────────────────────────────────
//

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      description:
        'Все классы, которые используем для поиска по DOM-у должны начинаться с префикса js-',
      url:
        'https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md',
      recommended: false,
    },
    messages: {
      useJsPrefix:
        'Все классы, которые используем для поиска по DOM-у должны начинаться с префикса js-',
    },
    schema: [],
  },
  create(context) {
    return {
      'MemberExpression > CallExpression > Identifier.callee[name=/\\$|(jQuery)/]': function(
        node: TSESTree.Identifier,
      ) {
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
};

export { name, rule };
