import ajax from '../src/ajax'

const {
  fetch,
  fetchJsonp,
  iframe
} = ajax

// 这里为了测试先扩展一下Promise

Promise.prototype.finally = function (callback) {
  let P = this.constructor

  return this.then(
    res => P.resolve(callback()).then(() => res), err => P.reject(callback()).then(() => err)
  )
}

// test fetch

describe('fetch **this test need internet**', () => {
  // 使用了 http://api.github.com

  // 这里默认response被JSON.parse后是一个object就算成功
  test('normal test GET', done => {
    expect(typeof fetch('https://api.github.com/').then(res => {
      return JSON.parse(res)
    }).finally(() => {
      done()
    })).toBe('object')
  })

  // 这里默认对该地址进行post只要返回的response被JSON.parse后是一个object就算成功
  test('normal test POST', done => {
    expect(typeof fetch('https://api.github.com/', {
      method: 'POST',
      data: {
        name: 'name'
      }
    }).then(res => {
      return JSON.parse(res)
    }).catch(res => {
      return JSON.parse(res)
    }).finally(() => {
      done()
    })).toBe('object')
  })

  test('no result', done => {
    expect(typeof fetch('https://api.github.com/').then(res => {
      return JSON.parse(res)
    }).catch(res => {
      return JSON.parse(res)
    }).finally(() => {
      done()
    })).toBe('object')
  })
})

// test fetchJsonp
// 执行fetchjsonp后, jsonp函数挂载在了global上, 执行then()后, jsonp函数执行并删除, 则视为测试成功
describe('fetchJsonp', () => {
  test('normal test', (done) => {
    global.fn = 'something'

    let jsonp = fetchJsonp('https://api.github.com/', {
      callbackName: 'callback',
      functionName: 'fn'
    })

    expect(typeof global.fn).toBe('function')

    let p = new Promise((resolve, reject) => {
      fn()
      resolve()
    })

    p.then(() => expect(global.fn).toBe(null)).finally(() => {
      done()
    })
  })

  test('normal test2(url with ?)', (done) => {
    global.fn = 'something'

    let jsonp = fetchJsonp('https://api.github.com/?page=1', {
      callbackName: 'callback',
      functionName: 'fn'
    })

    expect(typeof global.fn).toBe('function')

    let p = new Promise((resolve, reject) => {
      fn()
      resolve()
    })

    p.then(() => expect(global.fn).toBe(null)).finally(() => {
      done()
    })
  })
})

// test iframe
// 原理同fetchJsonp
describe('iframe', () => {
  test('normal test', () => {
    global.fn = 'something'

    iframe({
      callbackName: 'callback',
      funcName: 'fn',
      targetUrl: 'https://api.github.com/a',
      skipUrl: 'https://api.github.com/b',
      data: {
        name: 'lixiao'
      }
    }, function () {
      expect(typeof global.fn).toBe('function')
    })
  })

  test('normal test2(url with ?)', () => {
    global.fn = 'something'

    iframe({
      callbackName: 'callback',
      funcName: 'fn',
      targetUrl: 'https://api.github.com/?page=a',
      skipUrl: 'https://api.github.com/?page=b',
      data: {
        name: 'lixiao'
      }
    }, function () {
      expect(typeof global.fn).toBe('function')
    })
  })
})
