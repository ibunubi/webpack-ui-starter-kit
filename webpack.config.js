const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/_scss/style.scss'],
  output: {
    filename: 'js/bundle.js',
    path: path.join(__dirname, './build/')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }, {
        test: /\.(png|jpeg|jpg)/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: './img/[name].[ext]',
            limit: 10000
          }
        }, {
          loader: 'img-loader'
        }]
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            { 
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }, {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/main.css'
    })
  ],
  devServer: {
    contentBase: './build'
  }
}