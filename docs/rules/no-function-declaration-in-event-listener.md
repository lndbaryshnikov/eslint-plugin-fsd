# Move event handlers to separate functions (no-function-declaration-in-event-listener)

This rule prohibits the creation of anonymous functions right in the same place where there is a binding to the event.

## Rule Details

Rule number **1.13** from the FSD [front-end-best-practices/JS](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/README.md#1.13)

Examples of **incorrect** code for this rule:

```javascript
/* eslint no-function-declaration-in-event-listener: "error" */

elem.addEventListener('click', function() {
  alert('Спасибо!');
});
```

Examples of **correct** code for this rule:

```javascript
/* eslint no-function-declaration-in-event-listener: "error" */

class Component {

   bindEventListeners() {
     stopButton.addEventListener('click', this.handleStopButtonClick);
   }

   handleStopButtonClick() {
     ...
   }
 }
```
