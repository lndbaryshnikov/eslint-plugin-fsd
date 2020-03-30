# Development

### Cloning

```bash
$ git clone https://github.com/lndbaryshnikov/eslint-plugin-fsd.git
```

### Type checking

```bash
$ npm run check-types
```

### Testing rules

```bash
$ npm run test

Watch mode:
$ npm run test-watch
```

### Linting source files

```bash
$ npm run lint
```

### Compiling rules

```bash
$ npm run compile
```

### Compiling for production (includes all checks)

```bash
npm run compile-prod
```

### Installing globally

This will create a symlink in the global folder `{prefix}/lib/node_modules/eslint-plugin-fsd` that links to the package so you can test the plugin on another projects.

```bash
$ npm run local-deploy
```

## Folder Structure

```
docs/             <- rule docs
  rules/

lib/              <- compiled rules
  rules/
  index.js

src/
  lib/            <- source files for rules
    rules/
    utils/
    index.ts

  tests/          <- test files
    lib/
      rules/
```

## Sources

- ESLint [Working with Rules](https://eslint.org/docs/developer-guide/working-with-rules)
- An [example](https://medium.com/@bjrnt/creating-an-eslint-plugin-87f1cb42767f) of creating a plugin
- An [example](https://slonoed.net/ru/custom-eslint-rule/) of writing a rule.
- ESLint [Selectors](https://eslint.org/docs/developer-guide/selectors)
- [Some more](https://github.com/Quramy/eslint-plugin-tutorial/blob/master/guide/20_dive_into_ast/README.md) about rules and selectors
- [Here](https://github.com/estools/esquery) you can test your selectors
- [AST Explorer](https://astexplorer.net/) - use this to generate an abstract syntax tree (AST) from JavaScript code (ESLint uses Espree parser)
