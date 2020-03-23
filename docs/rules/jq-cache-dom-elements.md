# Cache all selected DOM elements (jq-cache-dom-elements)

[№2 in front-end-best-practices/jQuery](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md)

## Rule Details

Examples of **incorrect** code for this rule:

```javascript
/* eslint jq-cache-dom-elements: "error" */

$('.js-element').show();
$('.js-element')
  .find('.js-children')
  .doSomething();
$('.js-element').attr('data-id', 123);
```

Examples of **correct** code for this rule:

```javascript
/* eslint jq-cache-dom-elements: "error" */

var $element = $('.js-element');
$element.show();
$element.find('.js-children').doSomething();
$element.attr('data-id', 123);
```
