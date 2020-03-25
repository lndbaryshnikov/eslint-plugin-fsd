# Move event handlers to separate functions (no-function-declaration-in-event-listener)

This rule prohibits the creation of anonymous functions right in the same place where there is a binding to the event.

## Rule Details

Rule number **11** from the FSD [front-end-best-practices/goodPractice](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md)

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
