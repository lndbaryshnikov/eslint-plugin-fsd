/**
 * @fileoverview Eslint plugin for FSD best practices
 * @author timon-and-pumbaa
 */

import 'core-js/stable';

import HofNamePrefix from './rules/hof-name-prefix';
import NoHeavyConstructor from './rules/no-heavy-constructor';
import { rule as JQCacheDOMElements } from './rules/jq-cache-dom-elements';
import { rule as JQUseJSPrefixInSelector } from './rules/jq-use-js-prefix-in-selector';
import { rule as NoFunctionDeclarationInEventListener } from './rules/no-function-declaration-in-event-listener';
import { rule as SplitConditionals } from './rules/split-conditionals';

module.exports = {
  rules: {
    'hof-name-prefix': HofNamePrefix,
    'no-heavy-constructor': NoHeavyConstructor,
    'jq-cache-dom-elements': JQCacheDOMElements,
    'jq-use-js-prefix-in-selector': JQUseJSPrefixInSelector,
    'no-function-declaration-in-event-listener': NoFunctionDeclarationInEventListener,
    'split-conditionals': SplitConditionals,
  },
  configs: {
    all: {
      plugins: ['fsd'],
      rules: {
        'fsd/hof-name-prefix': 'error',
        'fsd/no-heavy-constructor': 'error',
        'fsd/jq-cache-dom-elements': 'error',
        'fsd/jq-use-js-prefix-in-selector': 'error',
        'fsd/no-function-declaration-in-event-listener': 'error',
        'fsd/split-conditionals': 'error',
      },
    },
  },
};
