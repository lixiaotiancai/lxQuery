// 一些常用的工具函数

/**
 * 元素选择器 暂只支持querySelectorAll
 * @param  {String}   selector
 * @param  {Obj}      context   required
 * @return {Arr or LikeArr}
 *
 * domSelector('.className', document) 等价于 document.querySelectorAll('.className')
 * 无context, context不支持querySelectorAll, 无相关元素均返回一个空数组 []
 */
export const domSelector = (selector, context) => {
  if (!context) {
    return []
  }

  if (!context.querySelectorAll) {
    return []
  }

  return context.querySelectorAll(selector)
}

/**
 * 循环
 * @param  {Array or Obj}   obj
 * @param  {Function}       callback
 * @return {Array or Obj}
 *
 * 接收一个对象或数组, 并循环执行回调函数
 * 若回调函数返回false, 则终止循环
 */
export const each = (obj, callback) => {
  let i = 0
  let len

  if (Array.isArray(obj)) {
    len = obj.length
    for (; i < len; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  } else if (typeof obj === 'object') {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  }

  return obj
}

/**
 * 合并
 * @param  {Array or like Array} first
 * @param  {Array} second
 * @return {Array or like Array}
 *
 * 将第二个数组合并至第一个数组或类数组中, 并返回第一个数组或类数组
 */
export const merge = (first, second) => {
  let i = first.length
  let len = second.length
  let j = 0

  for (; j < len; j++) {
    first[i++] = second[j]
  }

  first.length = i

  return first
}

/**
 * index 数组选择器
 * @param  {Array}  arr
 * @param  {Number} i
 * @return {Array}
 *
 * 根据index返回数组的其中一项
 */
export const eq = (arr, i) => {
  let len = arr.length
  let j

  j = i + (i < 0 ? len : 0)

  return j >= 0 && j < len ? [arr[j]] : []
}

/** 选择数组的第一项并返回 **/
export const first = (arr) => {
  return eq(arr, 0)
}

/** 选择数组的最后一项并返回 **/
export const last = (arr) => {
  return eq(arr, -1)
}

/**
 * 处理被空格分隔的字符串并转为数组
 * @param  {String} str
 * @return {Sting}
 *
 * spaceSplit2Arr('a b c') 返回 ['a', 'b', 'c']
 */
export const spaceSplit2Arr = (str) => {
  if (typeof str !== 'string') {
    return []
  }

  return str.split(' ')
}

/**
 * 根据索引移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(-1, [1,2,3]) => [1, 2]
 */
export const removeItemByIndex = (index, arr) => {
  let len = arr.length

  index += index < 0 ? len : 0

  if (index >= 0 && index < len) {
    arr.splice(index, 1)
  }

  return arr
}

/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
export const serialize = (data) => {
  if (typeof data !== 'object') {
    return ''
  }

  let serializeStr = ''
  let serializeArr = []

  each(data, (key, value) => {
    key = encodeURIComponent(key)
    value = encodeURIComponent(value)

    serializeArr.push(`${key}=${value}`)
  })

  serializeStr = serializeArr.join('&')

  return serializeStr
}

export default {
  domSelector,
  each,
  merge,
  eq,
  first,
  last,
  spaceSplit2Arr,
  removeItemByIndex,
  serialize
}
