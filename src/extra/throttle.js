const throttle = {
  createThrottle: (callback, delay = 500) => {
    let timer

    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          callback()

          clearTimeout(timer)

          timer = null
        }, delay)
      }
    }
  }
}

export default throttle
