# Higher order functions name prefix  (hof-name-prefix)

This rule enforces the use of prefix in higher order function names.


## Rule Details

This rule requires that higher order functions and methods(functions that return other functions, such as event handlers) begin with a specific word, such as `make`, `create`, `get`, or any other.

Examples of **incorrect** code for this rule:

```js
/* eslint hof-name-prefix: ["error", "make"] */

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
/* eslint hof-name-prefix: ["error", "make"] */

const makeClickHandler = () => {
  return (event) => {
    console.log(event.currentTarget);
  }
}

class Button {
  makeClickHandler() {
    return (event) => {
      console.log(event.currentTarget);
    }
  }
}
```

### Options

A string with the name of the prefix to be used, like `make`, `create`, `get`, or any other.

