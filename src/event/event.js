import {
  each,
  spaceSplit2Arr
} from '../util'

function evtBindEle () {
  let opts = {
    /** 节点对应事件注册表 **/
    // e.g. evtDic: [{element1: 'elmentName', event: {click: [fn1, fn2], mouseup:[fn]} }, {element2:....}]
    evtDic: [],

    // 在注册表上注册节点与事件
    add: function (el, type, evt) {
      let evtDic = this.evtDic

      if (!evtDic.some((item, index) => {
        return item.element === el
      })) {
        evtDic.push({
          element: el,
          event: {}
        })
      }

      each(evtDic, function (i, item) {
        if (item.element === el) {
          if (!item.event[type]) {
            item.event[type] = []
          }

          item.event[type].push(evt)

          return false
        }
      })

      // console.log(evtDic)
    },

    // 在注册表上删除节点与事件
    remove: function (el, type, evt) {
      let evtDic = this.evtDic

      if (el && type && evt) {
        each(evtDic, function (i, item) {
          if (item.element === el) {
            item.event[type].splice(item.event[type].indexOf(evt), 1)

            if (!item.event[type].length) {
              delete item.event[type]
            }

            return false
          }
        })
      }

      if (el && type && !evt) {
        each(evtDic, function (i, item) {
          if (item.element === el) {
            item.event[type] = []

            return false
          }
        })
      }

      if (el && !type && !evt) {
        each(evtDic, function (i, item) {
          if (item.element === el) {
            item.event = {}

            return false
          }
        })
      }

      // console.log(evtDic)
    },

    // 在注册表中查找节点上的事件并返回
    find: function (el) {
      let evtDic = this.evtDic
      let result

      each(evtDic, function (i, item) {
        if (item.element === el) {
          result = evtDic[i].event
          return false
        }
      })

      return result
    }
  }

  return opts
}

let eBE = evtBindEle()

const event = {
  /**
   * 添加事件
   * @param {String} type
   * @param {Function} callback
   *
   * 给节点添加事件
   */
  on: function (type, callback) {
    if (!global.addEventListener) {
      return this
    }

    if (!type || !callback) {
      return this
    }

    if (typeof type !== 'string' || typeof callback !== 'function') {
      return this
    }

    let typeList = spaceSplit2Arr(type)

    each([...this.nodeList], function (i, el) {
      each(typeList, function (i, evtType) {
        eBE.add(el, evtType, callback)

        el.addEventListener(evtType, callback, false)
      })
    })

    return this
  },

  /**
   * 删除事件
   * @param {String} type
   * @param {Function} callback
   *
   * 输入参数为type callback时, 卸载节点对应的type事件类型上的对应事件
   *
   * 输入参数为type时, 卸载节点对应的type上的所有事件
   *
   * 无参数时, 卸载节点上绑定的所有event
   */
  off: function (type, callback) {
    if (!global.removeEventListener) {
      return this
    }

    let typeList = spaceSplit2Arr(type)

    if (type && callback) {
      each([...this.nodeList], function (i, el) {
        each(typeList, function (i, evtType) {
          eBE.remove(el, evtType, callback)

          el.removeEventListener(evtType, callback)
        })
      })
    }

    if (type && !callback) {
      each([...this.nodeList], function (i, el) {
        each(typeList, function (i, evtType) {
          each(eBE.find(el)[evtType], function (i, evt) {
            el.removeEventListener(evtType, evt)
          })

          eBE.remove(el, evtType)
        })
      })
    }

    if (!type && !callback) {
      each([...this.nodeList], function (i, el) {
        each(eBE.find(el), function (evtType, event) {
          each(event, function (i, evt) {
            el.removeEventListener(evtType, evt)
          })
        })

        eBE.remove(el)
      })
    }

    return this
  }
}

export default event
