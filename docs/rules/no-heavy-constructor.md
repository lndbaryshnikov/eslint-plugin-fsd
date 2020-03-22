# No heavy constructor (no-heavy-constructor)

This rule prohibits searching the DOM tree and defining handlers in the constructor. If you implement such functionality, you should put it in a separate method.

## Rule Details

Examples of **incorrect** code for this rule:

```js
/* eslint no-heavy-constructor: "error" */

class Button {
  constructor(button) {
    button.addEventListener('click', this.handleStopButtonClick);
  }
}
```

Examples of **correct** code for this rule:

```js
/* eslint no-heavy-constructor: "error" */

class Button {
  constructor(button) {
    this.button = button;
  }

  bindEventListeners() {
     this.button.addEventListener('click', this.handleStopButtonClick);
   }
}
```