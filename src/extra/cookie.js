const cookie = {
  setCookie: (name, value) => {
    global.document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  },

  getCookie: name => {
    let cookie = decodeURIComponent(global.document.cookie)

    let ret = new RegExp(`${name}=(.*?)(?:;|$)`)

    let result = cookie.match(ret)

    return result ? result[1] : undefined
  },

  removeCookie: name => {
    global.document.cookie = `${encodeURIComponent(name)}='';Expires=${new Date(0)}`
  }
}

export default cookie
