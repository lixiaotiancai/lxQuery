const localStorage = {
  setLocalStorage: (name, value) => {
    let storage = global.localStorage

    storage.setItem(name, value)
  },

  getLocalStorage: name => {
    let storage = global.localStorage

    let res = storage.getItem(name)

    return res || undefined
  },

  removeLocalStorage: name => {
    let storage = global.localStorage

    if (name) {
      storage.removeItem(name)
    } else {
      storage.clear()
    }
  }
}

export default localStorage
