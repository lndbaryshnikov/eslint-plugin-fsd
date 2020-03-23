# Move event handlers to separate functions (no-function-declaration-in-event-listener)

[№11 in fron-end-best-practices/goodPractice](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md)

You should not create anonymous functions right in the same place where there is a binding to the event.

## Rule Details

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
