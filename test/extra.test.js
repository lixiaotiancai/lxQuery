import extra from '../src/extra'

// test cookie

const {
  setCookie,
  getCookie,
  removeCookie
} = extra

describe('cookie', () => {
  test('setCookie test', () => {
    setCookie('name', 'li xiao')
    expect(document.cookie).toBe('name=li%20xiao')
    setCookie('age', 24)
    expect(document.cookie).toBe('name=li%20xiao; age=24')
  })

  test('getCookie test', () => {
    expect(getCookie('name')).toBe('li xiao')
    expect(getCookie('age')).toBe('24')
    expect(getCookie('none')).toBe(undefined)
  })

  test('removeCookie test', () => {
    removeCookie('name')
    expect(getCookie('name')).toBe(undefined)
    expect(document.cookie).toBe('age=24')
    removeCookie('age')
    expect(getCookie('age')).toBe(undefined)
    expect(document.cookie).toBe('')
  })
})

// test debounce

const {
  createDebounce
} = extra

// 测试说明
// 根据防抖函数的特性, 在requestAnimationFrame执行过程中count都不会执行+1
// requestAnimationFrame执行完毕后, count才会执行+1

describe('debounce', () => {
  test('createDebounce test', (done) => {
    let timer = 0
    let count = 0

    let debounce = createDebounce(() => {
      count++
    })

    let p = new Promise((resolve, reject) => {
      addCount()
      setTimeout(() => {
        resolve(count)
      }, 1300)
    })

    p.then(count => {
      expect(count).toBe(1)
      done()
    })

    function addCount () {
      if (timer === 20) {
        expect(count).toBe(0)
      }

      if (timer === 40) {
        expect(count).toBe(0)
      }

      if (timer === 60) {
        expect(count).toBe(0)
        return
      }
      debounce()
      timer++
      window.requestAnimationFrame(addCount)
    }
  })
})

// test getAbsoluteUrl

const {
  getAbsoluteUrl
} = extra

describe('getAbsoluteUrl', () => {
  test('normal test', () => {
    expect(getAbsoluteUrl('url')).toBe('http://localhost/url')
    expect(getAbsoluteUrl(' ')).toBe('http://localhost/%20')
  })
})

// test localStorage

const {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} = extra

describe('localStorage', () => {
  test('setLocalStorage test', () => {
    setLocalStorage('name', 'lixiao')
    expect(window.localStorage.length).toBe(1)
    expect(window.localStorage.name).toBe('lixiao')
    setLocalStorage('age', 24)
    expect(window.localStorage.length).toBe(2)
    expect(window.localStorage.age).toBe('24')
  })

  test('getLocalStorage test', () => {
    expect(getLocalStorage('name')).toBe('lixiao')
    expect(getLocalStorage('age')).toBe('24')
    expect(getLocalStorage('none')).toBe(undefined)
  })

  test('removeLocalStorage test', () => {
    removeLocalStorage('name')
    expect(getLocalStorage('name')).toBe(undefined)
    expect(getLocalStorage('age')).toBe('24')
    removeLocalStorage('age')
    expect(getLocalStorage('age')).toBe(undefined)
    setLocalStorage('name', 'lixiao')
    setLocalStorage('age', 24)
    removeLocalStorage()
    expect(window.localStorage.length).toBe(0)
  })
})

// test SessionStorage

const {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
} = extra

describe('SessionStorage', () => {
  test('setSessionStorage test', () => {
    setSessionStorage('name', 'lixiao')
    expect(window.sessionStorage.length).toBe(1)
    expect(window.sessionStorage.name).toBe('lixiao')
    setSessionStorage('age', 24)
    expect(window.sessionStorage.length).toBe(2)
    expect(window.sessionStorage.age).toBe('24')
  })

  test('getSessionStorage test', () => {
    expect(getSessionStorage('name')).toBe('lixiao')
    expect(getSessionStorage('age')).toBe('24')
    expect(getSessionStorage('none')).toBe(undefined)
  })

  test('removeSessionStorage test', () => {
    removeSessionStorage('name')
    expect(getSessionStorage('name')).toBe(undefined)
    expect(getSessionStorage('age')).toBe('24')
    removeSessionStorage('age')
    expect(getSessionStorage('age')).toBe(undefined)
    setSessionStorage('name', 'lixiao')
    setSessionStorage('age', 24)
    removeSessionStorage()
    expect(window.sessionStorage.length).toBe(0)
  })
})

// test query

const {
  query
} = extra

describe('query', () => {
  test('normal test', () => {
    let url = 'https://ke.qq.com/classroom/index.html#course_id=233919&term_id=100275850&ch_id=376058&vch_id=49&task_id=1554610657661375'

    expect(query('course_id', url)).toBe('233919')
    expect(query('term_id', url)).toBe('100275850')
    expect(query('task_id', url)).toBe('1554610657661375')
    expect(query('none', url)).toBe(undefined)
    expect(query('name', '?name=lixiao')).toBe('lixiao')
  })
})

// test throttle
// 测试原理同debounce
const {
  createThrottle
} = extra

describe('throttle', () => {
  test('createThrottle test', done => {
    let timer = 0
    let count = 0

    let throttle = createThrottle(() => {
      count++
    })

    addCount()

    function addCount () {
      if (timer === 20) {
        expect(count).toBe(0)
      }

      if (timer === 30) {
        expect(count).toBe(1)
      }

      if (timer === 40) {
        expect(count).toBe(1)
      }

      if (timer === 60) {
        expect(count).toBe(2)
        done()
        return
      }

      timer++
      throttle()
      window.requestAnimationFrame(addCount)
    }
  })
})

// test sleep

const {
  sleep
} = extra

describe('sleep', () => {
  test('normal test', done => {
    let status = ''

    zzz()

    expect(status).toBe('sleep')

    setTimeout(() => {
      expect(status).toBe('sleep')
    }, 1000)

    setTimeout(() => {
      expect(status).toBe('wake')
      done()
    }, 2001)

    async function zzz () {
      status = 'sleep'
      await sleep(2000)
      status = 'wake'
    }
  })
})
