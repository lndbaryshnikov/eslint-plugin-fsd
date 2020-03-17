/**
 * @fileoverview Eslint plugin for FSD best practices
 * @author timon-and-pumbaa
 */

import HOFNamePrefixRule from './rules/hof-name-prefix';

export default {
  rules: {
    'hof-name-prefix': HOFNamePrefixRule,
  },
};
