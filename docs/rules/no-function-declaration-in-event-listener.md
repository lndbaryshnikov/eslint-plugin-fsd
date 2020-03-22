# Move event handlers to separate functions (no-function-declaration-in-event-listener)

[№11 in goodPractice](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md)

## Rule Details

You should not create anonymous functions right in the same place where there is a binding to the event.

**Bad**

```javascript
elem.addEventListener('click', function() {
  alert('Спасибо!');
});
```

**Good**

```javascript
class Component {

   bindEventListeners() {
     stopButton.addEventListener('click', this.handleStopButtonClick);
   }

   handleStopButtonClick() {
     ...
   }
 }
```
