import util from '../src/util'

const {
  domSelector,
  each,
  merge,
  eq,
  first,
  last,
  spaceSplit2Arr,
  removeItemByIndex,
  serialize
} = util

// test domSelector

describe('domSelector', () => {
  test('normal test', () => {
    document.body.innerHTML = '<div id="id"><div class="class"></div></div>'
    expect(domSelector('#id', document)).toEqual(document.querySelectorAll('#id'))
    expect(domSelector('nothingfind', document).length).toBe(0)
  })

  test('no context test', () => {
    expect(domSelector('#id')).toEqual([])
  })

  test('not support querySelectorAll test', () => {
    let context = {}

    expect(domSelector('#id', context)).toEqual([])
  })
})

// test each

describe('each', () => {
  test('normal test', () => {
    let indexArr = []
    let itemArr = []
    let res

    res = each(['a', 'b', 'c'], function (i, item) {
      indexArr.push(i)
      itemArr.push(item)
    })

    expect(res).toEqual(['a', 'b', 'c'])
    expect(indexArr).toEqual([0, 1, 2])
    expect(itemArr).toEqual(['a', 'b', 'c'])

    indexArr = []
    itemArr = []

    res = each({
      a: 1,
      b: 2,
      c: 3
    }, function (key, value) {
      indexArr.push(key)
      itemArr.push(value)
    })

    expect(res).toEqual({
      a: 1,
      b: 2,
      c: 3
    })
    expect(indexArr).toEqual(['a', 'b', 'c'])
    expect(itemArr).toEqual([1, 2, 3])
  })

  test('break loop test', () => {
    let indexArr = []
    let itemArr = []
    let res

    res = each(['a', 'b', 'c'], function (i, item) {
      indexArr.push(i)
      itemArr.push(item)

      return false
    })

    expect(res).toEqual(['a', 'b', 'c'])
    expect(indexArr).toEqual([0])
    expect(itemArr).toEqual(['a'])

    indexArr = []
    itemArr = []

    res = each({
      a: 1,
      b: 2,
      c: 3
    }, function (key, value) {
      indexArr.push(key)
      itemArr.push(value)

      return false
    })

    expect(res).toEqual({
      a: 1,
      b: 2,
      c: 3
    })
    expect(indexArr).toEqual(['a'])
    expect(itemArr).toEqual([1])
  })

  test('wrong input type', () => {
    expect(each(123, function () {})).toBe(123)
  })
})

// test merge

describe('merge', () => {
  test('normal test', () => {
    expect(merge([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6])

    let obj = {}
    obj.length = 0
    expect(merge(obj, [1, 2, 3])).toEqual({
      0: 1,
      1: 2,
      2: 3,
      length: 3
    })
  })
})

// test eq

describe('eq', () => {
  test('normal test', () => {
    expect(eq([1, 2, 3], 0)).toEqual([1])
    expect(eq([1, 2, 3], -1)).toEqual([3])
  })

  test('wrong index', () => {
    expect(eq([1, 2, 3], 3)).toEqual([])
    expect(eq([1, 2, 3], -4)).toEqual([])
  })
})

// test first

describe('first', () => {
  test('normal test', () => {
    expect(first([1, 2, 3])).toEqual([1])
    expect(first([])).toEqual([])
  })
})

// test last

describe('last', () => {
  test('normal test', () => {
    expect(last([1, 2, 3])).toEqual([3])
    expect(last([])).toEqual([])
  })
})

// test spaceSplit2Arr

describe('spaceSplit2Arr', () => {
  test('normal test', () => {
    expect(spaceSplit2Arr('a b c')).toEqual(['a', 'b', 'c'])
  })

  test('wrong input type', () => {
    expect(spaceSplit2Arr(123123123)).toEqual([])
  })
})

// test removeItemByIndex

describe('removeItemByIndex', () => {
  test('normal test', () => {
    expect(removeItemByIndex(0, [1, 2, 3])).toEqual([2, 3])
    expect(removeItemByIndex(-1, [1, 2, 3])).toEqual([1, 2])
  })

  test('wrong index', () => {
    expect(removeItemByIndex(3, [1, 2, 3])).toEqual([1, 2, 3])
    expect(removeItemByIndex(-4, [1, 2, 3])).toEqual([1, 2, 3])
  })
})

// test serialize

describe('serialize', () => {
  test('normal test', () => {
    expect(serialize({
      name: ' lixiao',
      age: 24
    })).toBe('name=%20lixiao&age=24')
  })

  test('wrong input type', () => {
    expect(serialize(1234569)).toBe('')
  })
})
