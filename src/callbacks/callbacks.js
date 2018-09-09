import {
  each
} from '../util'

const callbacks = {
  callbacks: function () {
    let opt = {
      // 函数注册表
      callbacks: [],

      /**
       * 向注册表添加回调函数
       * @param {Function}
       */
      add: function (fn) {
        this.callbacks.push(fn)

        return this
      },

      /**
       * 依次执行注册表的函数
       * @param  {All} param
       */
      fire: function (param) {
        each(this.callbacks, function (i, fn) {
          fn(param)
        })

        return this
      },

      /**
       * 从函数注册表中移除响应函数
       * @param  {...[String]}
       */
      remove: function (...fnArr) {
        let self = this
        let target

        each(fnArr, function (i, fn) {
          target = self.callbacks.indexOf(fn)
          self.callbacks.splice(target, 1)
        })

        return this
      },

      /**
       * 删除注册表中所有函数
       */
      empty: function () {
        this.callbacks = []

        return this
      }
    }

    return opt
  }
}

export default callbacks
