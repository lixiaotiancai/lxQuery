import {
  each,
  spaceSplit2Arr
} from '../util'

const Class = {
  /** 添加class **/
  addClass: function (cls) {
    let styleList = spaceSplit2Arr(cls)

    each([...this.nodeList], function (i, el) {
      each(styleList, function (i, value) {
        el.classList.add(value)
      })
    })

    return this
  },

  /** 移除class **/
  removeClass: function (cls) {
    let styleList = spaceSplit2Arr(cls)

    each([...this.nodeList], function (i, el) {
      each(styleList, function (i, value) {
        el.classList.remove(value)
      })
    })

    return this
  },

  /** 切换样式 **/
  toggleClass: function (cls) {
    let styleList = spaceSplit2Arr(cls)

    each([...this.nodeList], function (i, el) {
      each(styleList, function (i, value) {
        if (el.classList.contains(value)) {
          el.classList.remove(value)
        } else {
          el.classList.add(value)
        }
      })
    })

    return this
  }
}

export default Class
