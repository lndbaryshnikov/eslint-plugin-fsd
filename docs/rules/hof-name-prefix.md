# Use prefix 'make' for higher order functions (hof-name-prefix)

This rule enforces the use of `make` prefix in higher order function names (functions that return other functions).

## Rule Details

Rule number **2** from the FSD [front-end-best-practices/JS/functionsNaming](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/functionsNaming.md):

> Higher-order functions should be named using this template: make + '.\*' + verbal noun, where '.\*' is an optional, syntactically correct set of words specifying the purpose of the function.

Example: makeButtonClickHandler.

Examples of **incorrect** code for this rule:

```js
/* eslint hof-name-prefix: "error" */

const clickHandler = () => {
  return event => {
    console.log(event.currentTarget);
  };
};

class Button {
  clickHandler() {
    return event => {
      console.log(event.currentTarget);
    };
  }
}
```

Examples of **correct** code for this rule:

```js
/* eslint hof-name-prefix: "error" */

const makeClickHandler = () => {
  return event => {
    console.log(event.currentTarget);
  };
};

const button = {
  makeClickHandler: () => {
    return event => {
      console.log(event.currentTarget);
    };
  },
};
```
