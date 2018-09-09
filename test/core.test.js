import lxQuery from '../src/core'

const lx = lxQuery
// test core

// 初始化测试HTML
function initTestHtml () {
  document.body.innerHTML = `
      <main id='main' style='color:blue'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <form>
          <input type="text" name='name' value='lixiao' />
          <input type="password" name="password" value="123456789" />
        </form>
      </main>`
}

function qSA (selector) {
  return document.querySelectorAll(selector)
}

describe('dom elements selector test', () => {
  test('normal test', () => {
    initTestHtml()
    expect(lx('main')[0]).toEqual(qSA('main')[0])
    expect(lx('main').nodeList).toEqual(qSA('main'))
    expect(lx('main').prevObject).toEqual(window.document)
  })

  test('no selector', () => {
    initTestHtml()
    expect(lx()).toEqual({})
  })
})

describe('lxQuery.fn.extend test', () => {
  test('each', () => {
    initTestHtml()
    lx('div').each((i, el) => {
      el.style.color = 'red'
    })
    for (let el of [...qSA('div')]) {
      expect(el.style.color).toBe('red')
    }
  })

  test('pushStack', () => {
    initTestHtml()
    let stack = lx('main').pushStack(lx('div').nodeList)
    for (let i in [...qSA('div')]) {
      expect([...qSA('div')][i]).toEqual(stack[i])
      expect([...qSA('div')][i]).toEqual(stack.nodeList[i])
    }
    expect(stack.prevObject).toEqual(lx('main'))
  })

  test('eq', () => {
    initTestHtml()
    let firstDiv = lx('div').eq(0)
    let lastDiv = lx('div').eq(-1)

    expect(firstDiv[0]).toEqual(qSA('div')[0])
    expect(firstDiv.nodeList[0]).toEqual(qSA('div')[0])
    expect(firstDiv.length).toBe(1)
    expect(firstDiv.prevObject).toEqual(lx('div'))
    expect(lastDiv[0]).toEqual(qSA('div')[2])
    expect(lastDiv.nodeList[0]).toEqual(qSA('div')[2])
    expect(lastDiv.length).toBe(1)
    expect(lastDiv.prevObject).toEqual(lx('div'))
  })

  test('first', () => {
    initTestHtml()
    expect(lx('div').first()).toEqual(lx('div').eq(0))
  })

  test('last', () => {
    initTestHtml()
    expect(lx('div').last()).toEqual(lx('div').eq(-1))
  })

  test('end', () => {
    initTestHtml()
    expect(lx('div').eq(1).end()).toEqual(lx('div'))
  })

  test('removeItemByIndex', () => {
    initTestHtml()
    let removeFirst = lx('div').removeItemByIndex(0)
    let removeLast = lx('div').removeItemByIndex(-1)

    expect(removeFirst.length).toBe(2)
    expect(removeFirst[0]).toEqual(qSA('div')[1])
    expect(removeFirst.prevObject).toEqual(lx('div'))
    expect(removeLast.length).toBe(2)
    expect(removeLast[1]).toEqual(qSA('div')[1])
    expect(removeLast.prevObject).toEqual(lx('div'))
  })

  test('serialize', () => {
    initTestHtml()
    expect(lx('form').serialize()).toBe('name=lixiao&password=123456789')
    expect(lx('div').serialize()).toBe('')
    expect(lx('main').serialize()).toBe('')
  })
})
