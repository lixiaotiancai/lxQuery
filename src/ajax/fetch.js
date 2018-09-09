const lxFetch = {
  /**
   * fetch (XMLHttpRequest + Promise)
   * @param  {String} url
   * @param  {Object} opts
   *
   * 仿es6 fetch
   */
  fetch: function (url, opts) {
    const def = {
      method: 'GET',
      data: null
    }

    const options = {
      ...def,
      ...opts
    }

    function ajax (url, opts, success, fail) {
      let xhr = new XMLHttpRequest()

      let {
        method,
        data
      } = opts

      xhr.open(method, url)

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            success(xhr.responseText)
          } else {
            fail(xhr.responseText)
          }
        }
      }

      if (method.toUpperCase() === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      }

      xhr.send(data)
    }

    return new Promise((resolve, reject) => {
      ajax(url, options, res => resolve(res), err => reject(err))
    })
  }
}

export default lxFetch
