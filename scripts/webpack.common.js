const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
    new MonacoWebpackPlugin(),
    new CopyWebpackPlugin([{
      context: path.resolve(__dirname, '../'),
      from: './src/static',
      to: './assets'
    }])
  ]
}