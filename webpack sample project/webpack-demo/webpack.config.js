var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
  return {
    entry: {
      main: './app/index.js',
      vendor: 'moment'
    },
    output: {
      filename: '[chunkhash].[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
      })
    ]
  }
};