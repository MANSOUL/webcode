
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 7080,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://192.168.31.112:9999'
    },
    contentBase: path.join(__dirname, '../build')
  }
})