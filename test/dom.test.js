import dom from '../src/dom'

const {
  attr,
  removeAttr,
  removeNode,
  insertBefore,
  insertAfter,
  appendChild,
  prependChild
} = dom

// 初始化测试HTML
function initTestHtml () {
  document.body.innerHTML = `
      <main id='main' style='color:blue'>
        <div>
          <div>1</div>
        </div>
        <div>2</div>
        <div>3</div>
      </main>`
}

function qSA (selector) {
  return document.querySelectorAll(selector)
}

// 模拟lxQuery对象
const mockLxQueryObj = {
  nodeList: []
}

// 插入测试节点
const insertNode = document.createElement('div')
let textNode = document.createTextNode('insert')
insertNode.appendChild(textNode)

// test attr

describe('attr', () => {
  mockLxQueryObj.attr = attr

  test('one param (type: string)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    expect(mockLxQueryObj.attr('id')).toEqual(['main'])
  })

  test('one param (type: object)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    mockLxQueryObj.attr({
      class: 'className',
      'data-x': 'data'
    })

    for (let el of [...qSA('div')]) {
      expect(el.getAttribute('class')).toBe('className')
      expect(el.getAttribute('data-x')).toBe('data')
    }
  })

  test('two param (type: string string)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.attr('style', 'color:red')
    expect(qSA('main')[0].getAttribute('style')).toBe('color:red')
  })

  test('two param (type: string function)', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.attr('id', (index, attributeValue) => {
      return attributeValue + 'lalala'
    })
    expect(qSA('main')[0].getAttribute('id')).toBe('mainlalala')
  })

  test('no param', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    expect(mockLxQueryObj.attr()).toBe(mockLxQueryObj)
  })

  test('wrong one param', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    expect(mockLxQueryObj.attr(false)).toBe(mockLxQueryObj)
  })

  test('wrong two param', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    expect(mockLxQueryObj.attr(123, 'asda')).toBe(mockLxQueryObj)
    expect(mockLxQueryObj.attr('id', 123123)).toBe(mockLxQueryObj)
  })

  test('more than two param', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.attr('style', 'color:red', 'other')
    expect(qSA('main')[0].getAttribute('style')).toBe('color:red')
  })
})

// test removeAttr

describe('removeAttr', () => {
  mockLxQueryObj.removeAttr = removeAttr

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.removeAttr('id style')
    expect(qSA('main[id=main]').length).toBe(0)
    expect(qSA('main[style="color:blue"]').length).toBe(0)
  })
})

// test removeNode

describe('removeNode', () => {
  mockLxQueryObj.removeNode = removeNode

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    mockLxQueryObj.removeNode()
    expect(qSA('main')[0].children.length).toBe(0)
  })

  test('no node found', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = [document]
    expect(mockLxQueryObj.removeNode()).toEqual(mockLxQueryObj)
  })
})

// test insertBefore

describe('insertBefore', () => {
  mockLxQueryObj.insertBefore = insertBefore

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div div')
    mockLxQueryObj.insertBefore(insertNode)
    expect(qSA('div div')[0].innerHTML).toBe('insert')
  })
})

// test insertAfter

describe('insertAfter', () => {
  mockLxQueryObj.insertAfter = insertAfter

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div')
    mockLxQueryObj.insertAfter(insertNode)
    expect(qSA('div div')[1].innerHTML).toBe('insert')
  })
})

// test appendChild

describe('appendChild', () => {
  mockLxQueryObj.appendChild = appendChild

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.appendChild(insertNode)
    expect(qSA('div')[4].innerHTML).toBe('insert')
  })
})

// test prependChild

describe('prependChild', () => {
  mockLxQueryObj.prependChild = prependChild

  test('normal test', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('div div')
    mockLxQueryObj.prependChild(insertNode)
    expect(qSA('div div')[0].children.length).toBe(1)
    expect(qSA('div div div')[0].innerHTML).toBe('insert')
  })

  test('normal test2', () => {
    initTestHtml()
    mockLxQueryObj.nodeList = qSA('main')
    mockLxQueryObj.prependChild(insertNode)
    expect(qSA('main')[0].children[0].innerHTML).toBe('insert')
  })
})
