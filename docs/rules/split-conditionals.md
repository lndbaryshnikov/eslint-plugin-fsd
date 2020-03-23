# All checks containing more than one condition must be separated (split-conditionals)

[№7 in front-end-best-practices/goodPractice](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md)

Divide complex conditions into more manageable parts

## Rule Details

Examples of **incorrect** code for this rule:

```javascript
/* eslint split-conditionals: "error" */

if ((this.allowUpdate) && ((user.isAdmin) || (user.role === item.owner)) {
   this.update(item.data);
 }
```

Examples of **correct** code for this rule:

```javascript
/* eslint split-conditionals: "error" */

function isUpdateAllowedForUser(user, item) {
  return (this.allowUpdate) && ((user.isAdmin) || (user.role === item.owner);
}

if (this.isUpdateAllowedForUser(user, item)) {
  this.update(item.data);
}
```
