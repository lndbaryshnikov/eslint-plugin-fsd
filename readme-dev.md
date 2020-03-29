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