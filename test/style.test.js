import style from '../src/style'

const {
  addClass,
  removeClass,
  toggleClass,
  css
} = style

// 初始化测试HTML
function initTestHtml () {
  document.body.innerHTML = `
      <main class="main1 main2" style="color: green;font-size: 20px">
        <div class="div1" style="font-size: 10px">1</div>
        <div class="div2" style="font-size: 10px">2</div>
      </main>`
}

function qSA (selector) {
  return document.querySelectorAll(selector)
}

// 模拟lxQuery对象
const mockLxQueryObj = {
  nodeList: []
}

// test addClass

describe('addClass', () => {
  mockLxQueryObj.addClass = addClass

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    mockLxQueryObj.addClass('className1 className2')
    for (let el of [...qSA('div')]) {
      expect(el.classList.contains('className1')).toBe(true)
      expect(el.classList.contains('className2')).toBe(true)
    }
  })
})

// test removeClass

describe('removeClass', () => {
  mockLxQueryObj.removeClass = removeClass

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.removeClass('main1 main2')
    expect(qSA('main')[0].classList.contains('main1')).toBe(false)
    expect(qSA('main')[0].classList.contains('main2')).toBe(false)
  })
})

// test toggleClass

describe('toggleClass', () => {
  mockLxQueryObj.toggleClass = toggleClass

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    mockLxQueryObj.toggleClass('div1 div2')
    expect(qSA('div')[0].classList.contains('div1')).toBe(false)
    expect(qSA('div')[0].classList.contains('div2')).toBe(true)
    expect(qSA('div')[1].classList.contains('div1')).toBe(true)
    expect(qSA('div')[1].classList.contains('div2')).toBe(false)
  })
})

// test css

describe('css', () => {
  mockLxQueryObj.css = css

  test('one param (type: string)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    expect(mockLxQueryObj.css('color')).toEqual(['green'])
    expect(mockLxQueryObj.css('font-size')).toEqual(['20px'])
    expect(mockLxQueryObj.css('nonecss')).toEqual([undefined])
  })

  test('one param (type: object)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    mockLxQueryObj.css({
      color: 'blue',
      'font-size': '14px'
    })
    for (let el of [...qSA('div')]) {
      expect(el.style.color).toBe('blue')
      expect(el.style['font-size']).toBe('14px')
    }
  })

  test('two param (type: string string)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.css('color', 'red')
    expect(qSA('main')[0].style.color).toBe('red')
  })

  test('two param (type: string function)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    mockLxQueryObj.css('font-size', function (i, value) {
      return parseInt(value) + i * 10 + 'px'
    })
    expect(qSA('div')[0].style['font-size']).toBe('10px')
    expect(qSA('div')[1].style['font-size']).toBe('20px')
  })

  test('no param', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    expect(mockLxQueryObj.css()).toEqual(mockLxQueryObj)
  })

  test('one param (type: wrong type)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    expect(mockLxQueryObj.css(1123)).toEqual(mockLxQueryObj)
  })

  test('two param (type: wrong type)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    expect(mockLxQueryObj.css(123, 'value')).toEqual(mockLxQueryObj)
    expect(mockLxQueryObj.css('css', 123)).toEqual(mockLxQueryObj)
  })
})
