# All classes that are used to search the DOM must begin with 'js-' prefix (jq-use-js-prefix-in-selector)

[№1 in front-end-best-practices/jQuery](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md)

This will help to avoid unexpected breakdowns of scripts when changing class names in layout.

## Rule Details

Examples of **incorrect** code for this rule:

```javascript
/* eslint jq-use-js-prefix-in-selector: "error" */

$('.open-popup-button').click(...);
```

Examples of **correct** code for this rule:

```javascript
/* eslint jq-use-js-prefix-in-selector: "error" */

$('.js-open-popup-button').click();
```
