const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/ts/app.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/js/'
  },
  devServer: {
    open: true,
    port: 9000,
    contentBase: './public'
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}