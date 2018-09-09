const getAbsoluteUrl = {
  getAbsoluteUrl: function (url) {
    let a = global.document.createElement('a')

    a.href = encodeURIComponent(url)

    return a.href
  }
}

export default getAbsoluteUrl
