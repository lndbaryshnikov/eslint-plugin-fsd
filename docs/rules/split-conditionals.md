# All checks containing more than one condition must be separated (split-conditionals)

[№7 in goodPractice](https://github.com/fullstack-development/front-end-best-practices/blob/master/JS/goodPractice.md)

## Rule Details

Divide complex conditions into more manageable parts

**Bad**

```javascript
if ((this.allowUpdate) && ((user.isAdmin) || (user.role === item.owner)) {
   this.update(item.data);
 }
```

**Good**

```javascript
function isUpdateAllowedForUser(user, item) {
  return (this.allowUpdate) && ((user.isAdmin) || (user.role === item.owner);
}

if (this.isUpdateAllowedForUser(user, item)) {
  this.update(item.data);
}
```
