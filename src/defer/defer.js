import {
  each
} from '../util'

/**
 * 仿Promise
 */

function LxPromise (fn) {
  let self = this

  self.value = null
  self.reason = null

  self.resolveList = []
  self.rejectList = []

  self.status = 'PENDING'

  function resolve (value) {
    setTimeout(() => {
      self.status = 'FULFILLED'

      each(self.resolveList, function (i, callback) {
        callback(value)
      })
    }, 0)
  }

  function reject (reason) {
    setTimeout(() => {
      self.status = 'REJECTED'

      each(self.rejectList, function (i, callback) {
        callback(reason)
      })
    }, 0)
  }

  fn(resolve, reject)
}

LxPromise.prototype.done = function (onFulfilled, onRejected) {
  let self = this

  return new LxPromise((resolve, reject) => {
    function handle (value) {
      let ret = typeof onFulfilled === 'function' && onFulfilled(value) || value

      if (ret && ret.done && ret.fail) {
        ret.done(value => {
          resolve(value)
        })
      } else {
        resolve(ret)
      }
    }

    function errhandle (reason) {
      reason = typeof onRejected === 'function' && onRejected(reason) || reason

      reject(reason)
    }

    if (self.status === 'PENDING') {
      self.resolveList.push(handle)
      self.rejectList.push(errhandle)
    } else if (self.status === 'FULFILLED') {
      handle(self.value)
    } else {
      errhandle(self.reason)
    }
  })
}

LxPromise.prototype.fail = function (onRejected) {
  return this.done(undefined, onRejected)
}

const defer = {
  defer: function (fn) {
    return new LxPromise(fn)
  }
}

export default defer
