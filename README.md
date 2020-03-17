# Eslint plugin for FSD [best practices](https://github.com/fullstack-development/front-end-best-practices)

Eslint plugin for FSD best practices

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

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "fsd/rule-name": 2
  }
}
```

## Supported Rules

- [hof-name-prefix](https://github.com/timon-and-pumbaa/eslint-plugin-fsd/blob/master/docs/rules/hof-name-prefix.md)
