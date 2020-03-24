/**
 * @fileoverview Eslint plugin for FSD best practices
 * @author timon-and-pumbaa
 */

import 'core-js/stable';
import requireIndex from 'requireindex';

// import all rules in lib/rules
module.exports.rules = requireIndex(`${__dirname}/rules`);
