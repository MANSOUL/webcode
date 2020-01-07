const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const pagePath = path.resolve(__dirname, '../src/pages')

module.exports = {
  entry: {
    project: path.resolve(pagePath, 'project/index.tsx'),
    editor: path.resolve(pagePath, 'editor/index.tsx')
  },
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
      },
      {
        test: /\.(ttf|svg)$/,
        use: ['file-loader']
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
    },
    contentBase: path.join(__dirname, '../build')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(pagePath, 'project/index.html'),
      filename: 'project.html',
      chunks: ['project']
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(pagePath, 'editor/index.html'),
      filename: 'editor.html',
      chunks: ['editor']
    }),
    new MonacoWebpackPlugin()
  ]
}