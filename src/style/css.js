import {
  each
} from '../util'

const css = {
  /**
   * css 控制
   *
   * 1个参数 {String or Object}
   * 参数类型为String时, 该参数为css样式, 获取节点列表中所有节点的该css样式, 并push进数组中返回
   * 参数类型为Object时, 该参数为key为css value为值的对象, 按对象键值对设置节点列表的css样式
   *
   * 2个参数 {String} [css] {String} [value] or {String} [css] {Function} {callback}
   * 第一个参数为css样式
   * 当第二个参数为String时, 该参数为value, 设置该节点的css
   * 当第二个参数为Function时, 该参数为回调, 根据此节点的该css样式进行操作
   *
   */
  css: function (...arg) {
    let self = this

    if (!arg.length) {
      return this
    }

    if (arg.length === 1) {
      let param = arg[0]

      if (typeof param === 'string') {
        let styleList = []

        each([...this.nodeList], function (i, el) {
          styleList.push(global.getComputedStyle(el)[param])
        })

        return styleList
      } else if (typeof param === 'object') {
        each(param, function (name, value) {
          each([...self.nodeList], function (i, el) {
            el.style[name] = value
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
          el.style[name] = value
        })

        return this
      }

      if (typeof value === 'function') {
        each([...this.nodeList], function (i, el) {
          el.style[name] = value(i, global.getComputedStyle(el)[name])
        })

        return this
      }

      return this
    }
  }
}

export default css
