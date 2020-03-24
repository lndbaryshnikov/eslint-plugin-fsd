# Eslint plugin for FSD [best practices](https://github.com/fullstack-development/front-end-best-practices)

[![Continuous Integration](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/workflows/CI/badge.svg)](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/actions)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd`:

```
$ npm install eslint-plugin-fsd --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-fsd` globally.

## Usage

Add `fsd` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["fsd"]
}
```

You can configure rules in 2 ways:

1. Configure each rule you want to use under the rules section.

```json
{
  "rules": {
    "fsd/hof-name-prefix": "error",
    "fsd/no-heavy-constructor": "error",
    "fsd/jq-cache-dom-elements": "error",
    "fsd/jq-use-js-prefix-in-selector": "error",
    "fsd/no-function-declaration-in-event-listener": "error",
    "fsd/split-conditionals": "error"
  }
}
```

2. Use shared config from this plugin.

```json
{
  "extends": ["plugin:fsd/all"]
}
```

## Supported Rules

- [hof-name-prefix](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/hof-name-prefix.md) 2 in functionsNaming
- [jq-use-js-prefix-in-selector](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/jq-use-js-prefix-in-selector.md) 1 in jQuery
- [jq-cache-dom-elements](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/jq-cache-dom-elements.md) 2 in jQuery
- [split-conditionals](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/split-conditionals.md) 7 in goodPractice
- [no-heavy-constructor](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/no-heavy-constructor.md) 10 in goodPractice
- [no-function-declaration-in-event-listener](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/no-function-declaration-in-event-listener.md) 11 in goodPractice
