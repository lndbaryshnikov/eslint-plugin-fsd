import {
  TSESTree,
  AST_NODE_TYPES,
  ESLintUtils,
} from '@typescript-eslint/experimental-utils';

import { RuleMetaData } from '../../types';

//
// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
//

//
// ─── RULE DECLARATIONS ──────────────────────────────────────────────────────────
//

const name = 'jq-var-dollar-sign';

const createRule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md`,
);

const errorMessages = {
  useDollarSignPrefix:
    'Все переменные, которые поддерживают jQuery API, должны начинаться со знака $',
} as const;

const meta: RuleMetaData<keyof typeof errorMessages> = {
  type: 'suggestion',
  docs: {
    category: 'Best Practices',
    description:
      'Все переменные, которые поддерживают jQuery API, должны начинаться со знака $',
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
    return {};
  },
});

export { name, rule, errorMessages };
