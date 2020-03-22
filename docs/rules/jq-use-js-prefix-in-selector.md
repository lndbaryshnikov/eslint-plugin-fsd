# All classes that are used to search the DOM must begin with 'js-' prefix (jq-use-js-prefix-in-selector)

[№1 in jQuery](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/jQuery.md)

## Rule Details

This will help to avoid unexpected breakdowns of scripts when changing class names in layout.

**Bad**

```javascript
$('.open-popup-button').click(...);
```

**Good**

```javascript
$('.js-open-popup-button').click();
```
