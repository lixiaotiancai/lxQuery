import defered from '../src/defer'

const {
  defer
} = defered

// resolve or reject
let flag = false

// 测试用变量
let name = ''

// test defer

describe('defer', () => {
  test('normal resolve test', done => {
    defer((resolve, reject) => {
      setTimeout(() => {
        name = 'lixiao'
        resolve(name)
      }, 1000)
    }).done(value => {
      expect(value).toBe('lixiao')
      done()
    })
  })

  test('normal reject test', done => {
    name = ''
    defer((resolve, reject) => {
      if (flag) {
        setTimeout(() => {
          name = 'lixiao'
          resolve(name)
        }, 1000)
      } else {
        reject(new Error('error'))
      }
    }).done(value => {
      expect(value).toBe(undefined)
    }).fail(err => {
      expect(err.message).toBe('error')
      done()
    })
  })

  test('resolve new promise test', done => {
    name = ''
    defer((resolve, reject) => {
      setTimeout(() => {
        name = 'lixiao'
        resolve(name)
      }, 1000)
    }).done(value => {
      expect(value).toBe('lixiao')
      return defer((resolve, reject) => {
        setTimeout(() => {
          name = 'lixiao2'
          resolve(name)
        }, 2000)
      })
    }).done(value => {
      expect(value).toBe('lixiao2')
      done()
    })
  })

  test('resolve in resolve test', done => {
    name = ''
    flag = true
    let d = defer((resolve, reject) => {
      if (flag) {
        name = 'lixiao'
        resolve(name)
      } else {
        reject('error')
      }
    })

    d.done(value => {
      expect(value).toBe('lixiao')
      d.done(value => {
        expect(value).toBe(null)
        done()
      })
    })
  })

  test('reject in reject test', done => {
    name = ''
    flag = false
    let d = defer((resolve, reject) => {
      if (flag) {
        name = 'lixiao'
        resolve(name)
      } else {
        reject('error')
      }
    })

    d.done(value => {
      expect(value).toBe(undefined)
    }).fail(err => {
      expect(err).toBe('error')
      flag = true
      d.done(value => {
        expect(value).toBe(undefined)
      }).fail(err => {
        expect(err).toBe(null)
        done()
      })
    })
  })
})
