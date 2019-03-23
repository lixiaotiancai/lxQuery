var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var TransformObjectRestSpread = require('babel-plugin-transform-object-rest-spread')
var ConcatPlugin = require('./webpack-plugin/concat-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: ['./src/lxquery.js'],
  output: {
    filename: 'lxquery.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['latest'],
          plugins: TransformObjectRestSpread
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new ConcatPlugin({
      wrapper: path.resolve(__dirname, './src/wrapper.js'),
      split_mark: '(insert lxquery core code here)',
      output: path.resolve(__dirname, './dist/lxquery.js')
    })
  ]
}
