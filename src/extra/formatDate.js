const formatDate = {
  /**
   * @日期格式化
   *
   * @param {String} pattern 日期格式 (格式化字符串的符号参考w3标准 http://www.w3.org/TR/NOTE-datetime)
   * @param {Date Object} date 待格式化的日期对象
   * @return {String} 格式化后的日期字符串
   * @example
   * formatDate("YYYY-MM-DD hh:mm:ss", (new Date()));
   */

  formatDate: (pattern, date) => {
    if (typeof date !== 'number' && !(date instanceof Date)) {
      return ''
    }

    if (typeof date === 'number') {
      date = new Date(date)
    }

    function formatNumber (format, num) {
      format = format.length

      return format === 1 ? num : String(Math.pow(10, format) + num).slice(-format)
    }

    var result = pattern.replace(/([YMDhms])\1*/g, function (format) {
      switch (format.charAt()) {
        case 'Y':
          return formatNumber(format, date.getFullYear())
        case 'M':
          return formatNumber(format, date.getMonth() + 1)
        case 'D':
          return formatNumber(format, date.getDate())
        case 'h':
          return formatNumber(format, date.getHours())
        case 'm':
          return formatNumber(format, date.getMinutes())
        case 's':
          return formatNumber(format, date.getSeconds())
      }
    })

    return result
  }

}

export default formatDate
