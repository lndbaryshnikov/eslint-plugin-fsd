import {
  TSESTree,
  ESLintUtils,
  AST_NODE_TYPES,
} from '@typescript-eslint/experimental-utils';

import { isFunction } from 'eslint/lib/rules/utils/ast-utils';

import { RuleMetaData, Function } from '../../types';
import { getAncestorOfType } from '../utils/ast-utils';

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

type SelectorToNodes = { [selector: string]: TSESTree.Node[] };
type ScopeToSelectors = { [scope: string]: SelectorToNodes };

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
    'Selector {{ selector }} was used {{ times }} times. Try caching this DOM node instead',
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
    const scopeToSelectors: ScopeToSelectors = {};

    return {
      [jqDOMSelector]: function checkDOMSelector(
        node: TSESTree.Identifier,
      ): void {
        const functionAncestor = getAncestorOfType<Function>(isFunction, node);
        const scopeId = functionAncestor
          ? `${functionAncestor.range.join(',')}` // no 2 functions can have same range
          : 'global';

        const callExpression = node.parent as TSESTree.CallExpression;
        const firstArg = callExpression.arguments[0];

        if (firstArg.type === AST_NODE_TYPES.Literal) {
          if (!firstArg.value) return;

          const selector = firstArg.value.toString();

          const scope = scopeToSelectors[scopeId];
          const isSelectorInScope = scope && scope[selector];

          if (isSelectorInScope) {
            scopeToSelectors[scopeId][selector].push(callExpression);
          } else if (scope) {
            scope[selector] = [callExpression];
            scopeToSelectors[scopeId] = scope;
          } else {
            scopeToSelectors[scopeId] = { [selector]: [callExpression] };
          }
        }
      },
      'Program:exit': function reportIfRepeatedSelectionsFound(): void {
        Object.entries(scopeToSelectors).forEach(([_, selectorToNodes]) => {
          Object.entries(selectorToNodes).forEach(([selector, nodes]) => {
            if (nodes.length > 1) {
              context.report({
                messageId: 'cacheDOMNodes',
                node: nodes[0],
                data: { selector, times: nodes.length },
              });
            }
          });
        });
      },
    };
  },
});

export { name, rule, errorMessages };
