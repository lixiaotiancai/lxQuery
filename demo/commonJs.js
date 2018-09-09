const jsdom = require('jsdom')

const {
  JSDOM
} = jsdom
const {
  document
} = (new JSDOM('<!doctype html><html><body><div>1</div><div>2</div></body></html>')).window
global.document = document
global.window = document.defaultView

// lxQuery兼容CommonJs规范

const lx = require('../dist/lxquery')

// 使用内置函数

let param = lx.query('name', '?name=lixiao&age=24')
console.log(param)

// 演示作用 实际会被同源策略限制
let postUrl = 'http://api.douban.com/v2/movie/top250'

lx.fetch(postUrl, {
  method: 'POST',
  data: 'name=lixiao'
}).then(res => console.log(res)).catch(err => console.log(err.message))

// 模拟操作dom需引入额外依赖模块 jsdom

lx('div').eq(0).css('color', 'red')
console.log(document.querySelector('div').style.color)

lx('div').eq(0).removeNode()
console.log(document.querySelectorAll('div').length)
