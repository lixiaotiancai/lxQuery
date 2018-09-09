const debounce = {
  createDebounce: (callback, delay = 200) => {
    let timer

    return function () {
      clearTimeout(timer)

      timer = setTimeout(() => {
        callback()
      }, delay)
    }
  }
}

export default debounce
