(function(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ?
      factory(global, true) :
      function(w) {
        if (!w.document) {
          throw new Error('lxQuery requires a window with a document')
        }
        return factory(w)
      }
  } else if (typeof define === 'function' && define.amd) {
    // 兼容AMD规范
    define('lxQuery', [], function() {
      return factory(global)
    })
  } else {
    factory(global)
  }
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  return (insert lxquery core code here)
})