import {
  domSelector,
  each,
  merge,
  eq,
  first,
  last,
  removeItemByIndex,
  serialize
} from '../util'
import dom from '../dom'
import callbacks from '../callbacks'
import style from '../style'
import event from '../event'
import defer from '../defer'
import ajax from '../ajax'
import extra from '../extra'

const lxQuery = (selector, context) => {
  return new lxQuery.fn.init(selector, context)
}

lxQuery.fn = lxQuery.prototype

lxQuery.fn.constructor = lxQuery

lxQuery.fn.version = '1.0.4'

lxQuery.fn.length = 0

lxQuery.fn.init = function (selector, context) {
  let self = this

  context = context || window.document

  if (!selector) {
    return this
  }

  this.nodeList = domSelector(selector, context)

  this.prevObject = document

  each([...this.nodeList], function (i, el) {
    self[i] = el
  })

  return this
}

lxQuery.extend = lxQuery.fn.extend = function (options) {
  let self = this

  each(options, function (name, opt) {
    self[name] = opt
  })

  return this
}

lxQuery.extend({
  each,
  merge,
  eq,
  first,
  last,
  removeItemByIndex,
  serialize,
  ...callbacks,
  ...defer,
  ...ajax,
  ...extra
})

lxQuery.fn.extend({

  each: function (callback) {
    return lxQuery.each([...this.nodeList], callback)
  },

  pushStack: function (arr) {
    let ret = lxQuery.merge(this.constructor(), arr)

    ret.nodeList = lxQuery.merge(this.constructor(), arr)

    ret.prevObject = this

    return ret
  },

  eq: function (i) {
    return this.pushStack(lxQuery.eq([...this.nodeList], i))
  },

  first: function () {
    return this.eq(0)
  },

  last: function () {
    return this.eq(-1)
  },

  end: function () {
    return this.prevObject
  },

  // this is a api for develope test

  // red: function () {
  //   this.each(function (i, el) {
  //     el.style.color = 'red'
  //   })

  //   return this
  // },

  removeItemByIndex: function (index) {
    return this.pushStack(lxQuery.removeItemByIndex(index, [...this.nodeList]))
  },

  serialize: function () {
    if (this.nodeList.length !== 1) {
      return ''
    }

    let form = this.nodeList[0]

    if (!form || form.tagName.toUpperCase() !== 'FORM') {
      return ''
    }

    let serializeObj = {}

    let inputList = lxQuery('input', form)

    lxQuery.each([...inputList.nodeList], function (i, el) {
      serializeObj[encodeURIComponent(el.name)] = encodeURIComponent(el.value)
    })

    return lxQuery.serialize(serializeObj)
  },
  ...dom,
  ...style,
  ...event
})

lxQuery.fn.init.prototype = lxQuery.fn

// 如果global指向window则说明是浏览器环境, 则对外暴露接口
if (!noGlobal) {
  window.lx = window.lxQuery = lxQuery
}

export default lxQuery
