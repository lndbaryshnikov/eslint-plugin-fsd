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

- [hof-name-prefix](docs/rules/hof-name-prefix.md) - *enforce `make` prefix in higher order function names*
- [jq-use-js-prefix-in-selector](docs/rules/jq-use-js-prefix-in-selector.md) - *enforce `js-` prefix in classes that are used to search the DOM*
- [jq-cache-dom-elements](docs/rules/jq-cache-dom-elements.md) - *enforce caching of all found DOM elements*
- [split-conditionals](docs/rules/split-conditionals.md) - *disallow complex conditions*
- [no-heavy-constructor](docs/rules/no-heavy-constructor.md) - *disallow searching the DOM tree and defining handlers in the constructor*
- [no-function-declaration-in-event-listener](docs/rules/no-function-declaration-in-event-listener.md) - *enforce moving event handlers to separate functions*

If you want to contribute, check out [README.dev](./README.dev.md).
