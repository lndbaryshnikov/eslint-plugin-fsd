## Folder Structure

```
docs/             <- rule docs
  rules/

lib/              <- compiled rules
  rules/
  index.js

tests/            <- compiled tests
  lib/
    rules/

src/
  lib/            <- source files for rules
    rules/
      index.ts

  tests/          <- source files for tests
    lib/
      rules/
```

## Scripts

### Type checking

```bash
npm run check-types
```

### Testing rules

```bash
npm test
```

### Linting source files

```bash
npm run lint
```

### Compile rules sources

```bash
npm run compile-rules
```

### Compile tests sources

```bash
npm run compile-tests
```

### Compile both rules & sources

```bash
npm run compile
```

### Compile for production (with type checking)

```bash
npm run compile-prod
```

## Git Workflow

All work regarding new rules development should be done in separate branches.

1. Create new branch

```bash
git checkout -b new-super-eslint-rule
```

2. Make pull request after you finish this rule

```bash
git push -u origin new-super-eslint-rule
```

3. Make code review & merge with master branch
4. (optional) Delete this branch from remote

```bash
git push origin --delete new-super-eslint-rule
```

## VSCode setup

To configure prettier - add this to **settings.json**

```javascript
{
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": ["javascript", "typescript"],
  "prettier-eslint.eslintIntegration": true,
```
