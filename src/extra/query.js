const query = {
  /**
   * 获取指定的 querystring 中指定 name 的 value
   * @param {String} name
   * @param {String} querystring
   * @return {String|undefined}
   *
   * query('hello', '?hello=js') 结果是 js
   *
   */
  query: (name, querystring) => {
    let result

    name = encodeURIComponent(name)

    let reg = new RegExp(`(?:(?=^)|\\?|&|#)${name}=(.*?)(?:&|$|#)`)

    result = querystring.match(reg)

    return result ? result[1] : undefined
  }
}

export default query
