# Development

### Cloning

```bash
$ git clone https://github.com/timon-and-pumbaa/eslint-plugin-fsd.git
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

### Compile rules

```bash
$ npm run compile
```

### Compile for production (includes all checks)

```bash
npm run compile-tests
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