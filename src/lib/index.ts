/**
 * @fileoverview Eslint plugin for FSD best practices
 * @author timon-and-pumbaa
 */

import HOFNamePrefixRule from './rules/hof-name-prefix';

module.exports = {
  rules: {
    'hof-name-prefix': HOFNamePrefixRule,
  },
};
