# Higher order functions name prefix  (hof-name-prefix)

This rule enforces the use of `make` prefix in higher order function names (functions that return other functions, such as event handlers).

## Rule Details

Examples of **incorrect** code for this rule:

```js
/* eslint hof-name-prefix: "error" */

const clickHandler = () => {
  return (event) => {
    console.log(event.currentTarget);
  }
}

class Button {
  clickHandler() {
    return (event) => {
      console.log(event.currentTarget);
    }
  }
}
```

Examples of **correct** code for this rule:

```js
/* eslint hof-name-prefix: "error" */

const makeClickHandler = () => {
  return (event) => {
    console.log(event.currentTarget);
  }
}

const button = {
  makeClickHandler: () => {
    return (event) => {
      console.log(event.currentTarget);
    }
  }
}
```