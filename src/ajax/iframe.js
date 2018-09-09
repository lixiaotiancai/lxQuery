import {
  serialize
} from '../util'

const iframe = {
  /**
   * iframe跨域函数
   * @param  {Object}   opts
   * @param  {Function} callback
   *
   * 只提供当前页面的相关函数, 提供数据页和跳转页需另行处理
   */
  iframe: (opts, callback) => {
    // callbackName
    // funcName
    // targetUrl
    // skipUrl
    // data
    let options = {
      callbackName: 'callback',
      funcName: getFuncName(),
      targetUrl: '',
      skipUrl: '',
      data: {},
      ...opts
    }

    let {
      callbackName,
      funcName,
      targetUrl,
      skipUrl,
      data
    } = options

    data[callbackName] = funcName

    targetUrl = parseUrl(targetUrl, serialize(data))

    global[funcName] = function (res) {
      callback(res)
    }

    createIframe(targetUrl)

    function getFuncName () {
      return (`iframe_${Date.now()}${Math.random()}`).replace('.', '')
    }

    function parseUrl (url, param) {
      return url + (url.indexOf('?') === -1 ? '?' : '&') + param
    }

    function createIframe (url) {
      let iframe = global.document.createElement('iframe')

      iframe.src = url
      iframe.frameborder = '0'
      iframe.style.display = 'none'

      global.document.body.appendChild(iframe)
    }
  }
}

export default iframe
