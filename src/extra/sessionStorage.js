const sessionStorage = {
  setSessionStorage: (name, value) => {
    let storage = global.sessionStorage

    storage.setItem(name, value)
  },

  getSessionStorage: name => {
    let storage = global.sessionStorage

    let res = storage.getItem(name)

    return res || undefined
  },

  removeSessionStorage: name => {
    let storage = global.sessionStorage

    if (name) {
      storage.removeItem(name)
    } else {
      storage.clear()
    }
  }
}

export default sessionStorage
