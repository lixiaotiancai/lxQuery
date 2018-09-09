import {
  serialize
} from '../util'

const fetchJsonp = {
  /**
   * fetchJsonp (jsonp + Promise)
   * @param  {String} url
   * @param  {Object} opts
   *
   * 仿fetchJsonp
   */
  fetchJsonp: function (url, opts) {
    function jsonp (url, callback) {
      let options = {
        callbackName: 'callback',
        functionName: getJsonpFunctionName(),
        data: {},
        ...opts
      }

      let {
        callbackName,
        functionName,
        data
      } = options

      data[callbackName] = functionName

      url = parseUrl(url, serialize(data))

      global[functionName] = function (res) {
        // 获取数据后就销毁该函数与script标签
        let p = new Promise((resolve, reject) => {
          callback(res)
          resolve()
        })

        p.then(() => {
          delete global[functionName]

          let script = global.document.querySelector(`script[src='${url}']`)

          script.parentNode.removeChild(script)
        })
      }

      createScript(url)

      function getJsonpFunctionName () {
        return ('jsonp' + Date.now() + Math.random()).replace('.', '')
      }

      function parseUrl (url, param) {
        return url + (url.indexOf('?') === -1 ? '?' : '&') + param
      }

      function createScript (url) {
        let script = global.document.createElement('script')

        script.src = url

        global.document.body.appendChild(script)
      }
    }

    return new Promise((resolve, reject) => {
      jsonp(url, res => resolve(res))
    })
  }
}

export default fetchJsonp
