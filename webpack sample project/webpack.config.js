/**
 * Created by raferxu on 17/5/28.
 */
module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + "/app/main3.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle5.js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  },
  devServer: {
    contentBase: "./public",  //提供本地服务器的根文件夹
    colors: true,  //输出的文件为彩色
    historyApiFallback: true,  //不跳转
    inline: true  //实时刷新
  }
};