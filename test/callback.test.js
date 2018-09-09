import callback from '../src/callbacks'

const {
  callbacks
} = callback

// 测试用变量及函数

let count = 0
let func1 = function () {
  count += 1
}
let func2 = function () {
  count += 2
}
let func3 = function () {
  count = 0
}

// 测试callbacks().add

describe('callbacks.add', () => {
  test('normal test', () => {
    let c = callbacks()
    c.add(func1)
    c.add(func2)
    c.add(func3)
    expect(c.callbacks.length).toBe(3)
    expect(c.callbacks[0].name).toBe('func1')
    expect(c.callbacks[1].name).toBe('func2')
    expect(c.callbacks[2].name).toBe('func3')
  })
})

// 测试callbacks().fire

describe('callbacks.fire', () => {
  test('normal test', () => {
    let c = callbacks()
    count = 0
    c.add(func1)
    c.fire()
    expect(count).toBe(1)
    count = 0
    c.add(func2)
    c.fire()
    expect(count).toBe(3)
    count = 0
    c.add(func2)
    c.fire()
    expect(count).toBe(5)
    count = 0
    c.add(func3)
    c.fire()
    expect(count).toBe(0)
  })
})

// 测试callbacks().remove

describe('callbacks.remove', () => {
  test('normal test', () => {
    let c = callbacks()
    count = 0
    c.add(func1)
    c.add(func1)
    c.add(func2)
    c.add(func3)
    c.fire()
    expect(count).toBe(0)
    c.remove(func3)
    c.fire()
    expect(c.callbacks.length).toBe(3)
    expect(count).toBe(4)
    count = 0
    c.remove(func1, func2)
    c.fire()
    expect(c.callbacks.length).toBe(1)
    expect(count).toBe(1)
  })
})

// 测试callbacks().empty

describe('callbacks.empty', () => {
  test('normal test', () => {
    let c = callbacks()
    c.add(func1)
    c.add(func1)
    c.add(func2)
    c.add(func3)
    expect(c.callbacks.length).toBe(4)
    c.empty()
    expect(c.callbacks.length).toBe(0)
  })
})
