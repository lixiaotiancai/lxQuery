const fs = require('fs')
const path = require('path')

function ConcatPlugin (opts) {
  var option = {
    wrapper: '',
    split_mark: '',
    output: ''
  }

  var options = this.options = { ...option,
    ...opts
  }

  this.wrapper = options.wrapper
  this.split_mark = options.split_mark
  this.output = options.output
}

ConcatPlugin.prototype.readFile = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) {
        return reject(err)
      }

      resolve(content)
    })
  })
}

ConcatPlugin.prototype.writeFile = function (path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}

ConcatPlugin.prototype.concatFile = async function (source) {
  var self = this
  var wrapper = await self.readFile(path.resolve(__dirname, self.wrapper))
  var wrapper_split_arr = wrapper.split(self.split_mark)
  await self.writeFile(path.resolve(__dirname, self.output), wrapper_split_arr[0] + source + wrapper_split_arr[1])
}

ConcatPlugin.prototype.apply = function (compiler) {
  var self = this

  compiler.hooks.emit.tap('emit', (compilation, callback) => {
    compilation.chunks.forEach(chunk => {
      chunk.files.forEach(function (filename) {
        self.source = compilation.assets[filename].source()
      })
    })
  })

  compiler.hooks.done.tap('done', () => {
    var self = this

    self.concatFile(self.source)
  })
}

module.exports = ConcatPlugin
