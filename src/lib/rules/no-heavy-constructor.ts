/**
 * @fileoverview Higher order functions name prefix
 * @author Leonid Baryshnikov
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import { TSESTree, TSESLint } from '@typescript-eslint/experimental-utils';

const rule: TSESLint.RuleModule<string, string[]> = {
  meta: {
    type: 'layout',
    docs: {
      description: 'No heavy constructor',
      category: 'Stylistic Issues',
      recommended: false,
      url:
        'https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/no-heavy-constructor.md',
    },
    fixable: undefined,
    schema: [],
    messages: {},
  },

  create(
    context: TSESLint.RuleContext<string, string[]>,
  ): TSESLint.RuleListener {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {};
  },
};

export default rule;
