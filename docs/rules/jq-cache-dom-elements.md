# Cache all selected DOM elements (jq-cache-dom-elements)

[№2 in jQuery](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md)

## Rule Details

**Bad**

```javascript
$('.js-element').show();
$('.js-element')
  .find('.js-children')
  .doSomething();
$('.js-element').attr('data-id', 123);
```

**Good**

```javascript
var $element = $('.js-element');
$element.show();
$element.find('.js-children').doSomething();
$element.attr('data-id', 123);
```
