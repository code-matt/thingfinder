var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, 'www/js')
var APP_DIR = path.resolve(__dirname, 'src')

var config = {
  entry: APP_DIR + '/main.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'thingfinderbuild.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = config
