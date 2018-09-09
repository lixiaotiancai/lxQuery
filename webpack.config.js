var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var TransformObjectRestSpread = require('babel-plugin-transform-object-rest-spread')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: ['./src/lxquery.js'],
  output: {
    filename: 'lxquery.js',
    path: path.resolve(__dirname, './dist'),
    library: 'lxQuery',
    libraryTarget: 'umd'
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
    new CleanWebpackPlugin(['./dist'])
  ]
}
