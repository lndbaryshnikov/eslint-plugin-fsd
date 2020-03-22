/**
 * @fileoverview Eslint plugin for FSD best practices
 * @author timon-and-pumbaa
 */

import HOFNamePrefixRule from './rules/hof-name-prefix';
import { rule as SplitConditionals } from './rules/split-conditionals';
import { rule as JqCacheDOMElements } from './rules/jq-cache-dom-elements';
import { rule as JqUseJSPrefixInSelector } from './rules/jq-use-js-prefix-in-selector';
import { rule as NoFunctionDeclarationInEventListener } from './rules/no-function-declaration-in-event-listener';

module.exports = {
  rules: {
    'hof-name-prefix': HOFNamePrefixRule,
    'split-conditionals': SplitConditionals,
    'jq-cache-dome-elements': JqCacheDOMElements,
    'jq-use-js-prefix-in-selector': JqUseJSPrefixInSelector,
    'no-function-declaration-in-event-listener': NoFunctionDeclarationInEventListener,
  },
};
