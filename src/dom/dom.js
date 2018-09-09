import {
  each,
  last
} from '../util'

const dom = {
  /** 移除节点 **/
  removeNode: function () {
    each([...this.nodeList], function (i, el) {
      if (!el.parentNode) {
        return false
      }

      el.parentNode.removeChild(el)

      el = null
    })

    return this
  },

  /** 在目标节点前插入新节点 **/
  insertBefore: function (node) {
    each([...this.nodeList], function (i, el) {
      el.parentNode.insertBefore(node.cloneNode(true), el)
    })

    return this
  },

  /** 在目标节点后插入新节点 **/
  insertAfter: function (node) {
    each([...this.nodeList], function (i, el) {
      if (last([...el.parentNode.children])[0] === el) {
        el.parentNode.appendChild(node.cloneNode(true))
      } else {
        el.parentNode.insertBefore(node.cloneNode(true), el.nextSibling)
      }
    })

    return this
  },

  /** 在最后插入 **/
  appendChild: function (node) {
    each([...this.nodeList], function (i, el) {
      el.appendChild(node.cloneNode(true))
    })

    return this
  },

  /** 在最开始插入 **/
  prependChild: function (node) {
    each([...this.nodeList], function (i, el) {
      if (!el.children.length) {
        el.appendChild(node.cloneNode(true))
      } else {
        el.insertBefore(node.cloneNode(true), el.firstChild)
      }

      return this
    })
  }
}

export default dom
