# No heavy constructor (no-heavy-constructor)

This rule prohibits searching the DOM tree and defining handlers in the constructor. If you need to have such functionality, you should put it in a separate method.

## Rule Details

Rule number **10** from the FSD [front-end-best-practices/JS/goodPractice](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md):

> For example, if you want to search the DOM tree to set values for the fields of the class, you need to put this functionality in a separate method. Also in case you need to set handlers for events - in a separate method.

Examples of **incorrect** code for this rule:

```js
/* eslint no-heavy-constructor: "error" */

class Button {
  constructor(button) {
    button.addEventListener('click', this.handleStopButtonClick);
  }
}

class Button {
  constructor() {
    const buttons = document.querySelectorAll('.button');
  }
}

class Button {
  constructor() {
    const forms = document.forms;
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
