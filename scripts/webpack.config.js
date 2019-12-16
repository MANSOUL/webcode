const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    chunkFilename: '[id].[chunkhash:8].chunk.js',
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'node_modules')],
            },
          },
        ],
      },
      {
        test: /\.(jpeg|png|jpg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@src': path.resolve(__dirname, '../src/')
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 7080,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:9999'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
}