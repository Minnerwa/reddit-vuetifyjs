const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin') // remove dist folder each build
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SystemLangs = require('./src/systems/langs')

module.exports = {
  resolve: {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.vue'],
    alias: {
      '~src': path.resolve(__dirname, './src'),
      '~components': path.resolve(__dirname, './src/components'),
      '~layouts': path.resolve(__dirname, './src/layouts'),
      '~views': path.resolve(__dirname, './src/views'),
      '~langs': path.resolve(__dirname, './src/langs'),
      '~stores': path.resolve(__dirname, './src/stores'),
      '~systems': path.resolve(__dirname, './src/systems'),
      '~utils': path.resolve(__dirname, './src/utils'),

      'vue': 'vue/dist/vue.esm.js'
    }
  },
  entry: {
    app: './src/index',
    vendor: ['vue', 'vuetify', 'vuex', 'vue-router', 'vue-i18n', 'lodash', 'axios']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV
      },
      SystemLangs: JSON.stringify(SystemLangs)
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      {
        from: './src/public',
        to: ''
      }
    ])
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['eslint-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(handlebars|hbs)$/,
        use: ['handlebars-loader']
      }
    ]
  }
}
