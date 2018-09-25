const xss = {
  /**
   * 去掉所有的html标签, 只保留标签中的文本
   *
   * 标签有4类情况
   * 1.双标签 <div></div>
   * 2.单标签 <input />、<input>、</input>(这种标签虽然不会被编译, 但还是要和谐一下, 若不为英文, 则会被编译为注释)、</ input>(会被编译为注释)
   * 3.空标签 <></>、<>、</>
   * 4.会被直接编译为文本的标签 < div>、<中文>, <123 /> 这类标签可以开绿灯
   *
   * test:
   *
   * input：
   * delHtmlTag('<h1>这是h1的内容!<a href="a.com">详情可点击</a></><img src="a.jpg" />')
   * output:
   * 这是h1的内容!详情可点击
   *
   * input:
   * delHtmlTag('<啦啦啦 />123456<123></input aaa>')
   * output:
   * <啦啦啦 />123456<123>
   */
  delHtmlTag: text => {
    let REG_Tab_Double = /<([a-z]*?)[^<>]*?>(.*?)<\/\1>/ig
    let REG_Tab_Single = /<(?:[a-z]+?.*?\/?|\/.+?)>/ig
    let REG_Tab_Null = /<\s*?\/*?\s*?>/ig

    return text
      .replace(REG_Tab_Double, ($0, $1, $2) => {
        return $2
      })
      .replace(REG_Tab_Single, '')
      .replace(REG_Tab_Null)
  },

  /**
   * 转义 HTML 特殊字符
   * @param {String} str
   */
  htmlEncode: str => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
}

export default xss
