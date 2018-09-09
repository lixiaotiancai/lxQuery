import {
  each,
  spaceSplit2Arr
} from '../util'

const attr = {
  /**
   * 设置dom节点的attribute
   *
   * 1个参数 {String or Object}
   * 参数类型为String时, 该参数为attribute, 获取节点列表中所有节点的该attribute, 并push进数组中返回
   * 参数类型为Object时, 该参数为key为attribute value为值的对象, 按对象键值对设置节点列表的attribute
   *
   * 2个参数 {String} [attribute] {String} [value] or {String} [attribute] {Function} {callback}
   * 第一个参数为attribute
   * 当第二个参数为String时, 该参数为value, 设置该节点的attribute
   * 当第二个参数为Function时, 该参数为回调, 根据此节点的该attribute进行操作
   *
   */
  attr: function (...arg) {
    let self = this

    if (!arg.length) {
      return this
    }

    if (arg.length === 1) {
      let param = arg[0]

      if (typeof param === 'string') {
        let attrList = []

        each([...this.nodeList], function (i, el) {
          attrList.push(el.getAttribute(param))
        })

        return attrList
      } else if (typeof param === 'object') {
        each(param, function (name, value) {
          each([...self.nodeList], function (i, el) {
            el.setAttribute(name, value)
          })
        })

        return this
      }

      return this
    }

    if (arg.length >= 2) {
      let name = arg[0]
      let value = arg[1]

      if (typeof name !== 'string') {
        return this
      }

      if (typeof value === 'string') {
        each([...this.nodeList], function (i, el) {
          el.setAttribute(name, value)
        })

        return this
      }

      if (typeof value === 'function') {
        each([...this.nodeList], function (i, el) {
          el.setAttribute(name, value(i, el.getAttribute(name)))
        })

        return this
      }

      return this
    }
  },

  /**
   * removeAttribute
   * @param  {String} attrs
   */
  removeAttr: function (attrs) {
    let attrList = spaceSplit2Arr(attrs)

    each([...this.nodeList], function (i, el) {
      each(attrList, function (i, name) {
        el.removeAttribute(name)
      })
    })

    return this
  }
}

export default attr
