import event from '../src/event'

const {
  on,
  off
} = event

// 初始化测试HTML
function initTestHtml () {
  document.body.innerHTML = `
      <main id='main'>
        <div id='div1'>1</div>
        <div>2</div>
        <div>3</div>
        <input type="text" />
      </main>`
}

function qSA (selector) {
  return document.querySelectorAll(selector)
}

// 模拟lxQuery对象
const mockLxQueryObj = {
  nodeList: []
}

// test on

describe('on', () => {
  mockLxQueryObj.on = on

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.on('click', function () {
      this.style.color = 'red'
    })
    mockLxQueryObj.on('click', function () {
      this.style['font-size'] = '20px'
    })
    qSA('main')[0].click()
    expect(qSA('main')[0].style.color).toBe('red')
    expect(qSA('main')[0].style['font-size']).toBe('20px')

    mockLxQueryObj.nodeList = qSA('#div1')
    mockLxQueryObj.on('click', function () {
      this.style.color = 'green'
    })
    qSA('#div1')[0].click()
    expect(qSA('#div1')[0].style.color).toBe('green')
  })

  test('lost param', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    expect(mockLxQueryObj.on('click')).toEqual(mockLxQueryObj)
  })

  test('wrong param type', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    expect(mockLxQueryObj.on(123, true)).toEqual(mockLxQueryObj)
  })

  test('not support eventListener', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')

    let addEventListenerCopy = global.addEventListener // 备份addEventListener副本
    global.addEventListener = undefined // 模拟不支持addEventListener的情况

    expect(mockLxQueryObj.on('click', function () {
      this.style.color = 'red'
    })).toBe(mockLxQueryObj)
    qSA('main')[0].click()
    expect(qSA('main')[0].style.color).not.toBe('red')

    global.addEventListener = addEventListenerCopy // 恢复addEventListener
    expect(typeof global.addEventListener).toBe('function') // 并确认一下是否恢复成功
  })
})

// test off

describe('off', () => {
  mockLxQueryObj.on = on // off的测试依赖on
  mockLxQueryObj.off = off

  // 几个测试用的事件
  let red = function () {
    this.style.color = 'red'
  }

  let border = function () {
    this.style.border = '1px solid'
  }

  let font20 = function () {
    this.style['font-size'] = '20px'
  }

  let fontWeight = function () {
    this.style['font-weight'] = '600px'
  }

  test('param type: type, callback', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('input')
    mockLxQueryObj.on('click', red)
    mockLxQueryObj.on('focus', red)
    mockLxQueryObj.on('click', border)

    let el = qSA('input')[0]

    el.click()
    expect(el.style.color).toBe('red')
    mockLxQueryObj.off('click focus', red)
    el.style.color = '#000'
    el.style.border = '2px solid'
    el.click()
    el.focus()
    expect(el.style.color).toBe('rgb(0, 0, 0)')
    expect(el.style.border).toBe('1px solid')
  })

  test('param type: type', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('input')
    mockLxQueryObj.on('click', red)
    mockLxQueryObj.on('click', border)
    mockLxQueryObj.on('focus', font20)
    mockLxQueryObj.on('focus', fontWeight)

    let el = qSA('input')[0]

    el.click()
    el.focus()
    expect(el.style.color).toBe('red')
    expect(el.style.border).toBe('1px solid')
    expect(el.style['font-size']).toBe('20px')
    expect(el.style['font-weight']).toBe('600px')
    mockLxQueryObj.off('click focus')
    el.style.color = 'black'
    el.style.border = '2px solid'
    el.style['font-size'] = '30px'
    el.style['font-weight'] = '800px'
    el.click()
    el.focus()
    expect(el.style.color).toBe('black')
    expect(el.style.border).toBe('2px solid')
    expect(el.style['font-size']).toBe('30px')
    expect(el.style['font-weight']).toBe('800px')
  })

  test('no param', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('input')
    mockLxQueryObj.on('click focus', red)
    mockLxQueryObj.on('click focus', border)
    mockLxQueryObj.on('click focus', font20)
    mockLxQueryObj.on('click focus', fontWeight)

    let el = qSA('input')[0]

    el.click()
    el.focus()
    expect(el.style.color).toBe('red')
    expect(el.style.border).toBe('1px solid')
    expect(el.style['font-size']).toBe('20px')
    expect(el.style['font-weight']).toBe('600px')
    mockLxQueryObj.off()
    el.style.color = 'black'
    el.style.border = '2px solid'
    el.style['font-size'] = '30px'
    el.style['font-weight'] = '800px'
    el.click()
    el.focus()
    expect(el.style.color).toBe('black')
    expect(el.style.border).toBe('2px solid')
    expect(el.style['font-size']).toBe('30px')
    expect(el.style['font-weight']).toBe('800px')
  })

  test('not support eventListener', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')

    let el = qSA('main')[0]
    let removeEventListenerCopy = global.removeEventListener // 备份removeEventListener副本
    global.removeEventListener = undefined // 模拟不支持removeEventListener的情况

    mockLxQueryObj.on('click', red)
    el.click()
    expect(el.style.color).toBe('red')
    expect(mockLxQueryObj.off('click', red)).toBe(mockLxQueryObj)
    el.style.color = 'green'
    el.click()
    expect(el.style.color).toBe('red')
    global.removeEventListener = removeEventListenerCopy // 恢复removeEventListener
    expect(typeof global.removeEventListener).toBe('function') // 并确认一下是否恢复成功
  })
})
