[lxQuery](https://github.com/lixiaotiancai/lxQuery) — Easy JavaScript
==================================================

After reading the jQuery's origin code, I get a lot, then I create this my own js library.
It's only a library for learning, there's still a lot of bug in it, so it can not be used in production evt.
Thanks for supporting.   --author: 李骁

# Install lxQuery
## download from github
```
https://github.com/lixiaotiancai/lxQuery.git
```
## download from npm
```
npm i lxquery
```
# Getting Start
## Native Way
**Import lxquery library**
```html
<body>
    ...
    ...
    <script src="../dist/lxquery.js"></script>
</body>
```

***
## AMD Way
**use RequireJS to import module**
```javascript
require(['lxquery'], function (lx) {
    ...
    ...
    })
```

***
## CommonJs Way
```javascript
var lx = require('lxquery')
...
...
```
# test lxQuery
## the test lirary for lxQuery use Jest, welcome to add more test example
```
npm test

npm run coverage
```
# More API
**want to know more about lxQuery?click [here](https://github.com/lixiaotiancai/lxQueryDoc) to read lxQuery document**<br>
lxQuery document link: https://github.com/lixiaotiancai/lxQueryDoc

#### 1.0.4 Log
add 3 extra method<br>
<br>
add lx.formatDate()<br>
add lx.delHtmlTag()<br>
add lx.htmlEncode()<br>
<br>
#### 1.0.3 Log (fill)
add npm run coverage<br>
add git hook husky<br>