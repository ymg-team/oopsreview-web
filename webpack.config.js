require('dotenv').config()

const webpack = require('webpack')
const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'development'

let outputPath
let plugins = [
  // added vendor chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: process.env.NODE_ENV === 'production' ? 'vendor.[hash].js' : 'vendor.js',
    minChunks: Infinity
  })
]

// set client environment variabels
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}))

outputPath = path.resolve(__dirname, 'public/build')

// production config
if (nodeEnv === 'production') {
  // minify appjs
  const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
  plugins.push(new UglifyJsPlugin({ minimize: true }))
}

// default config
module.exports = {
  entry: {
    app: './src/client/index.ts',
    vendor: ['vue', 'vuex', 'vue-router', 'string-manager']
  },

  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].[hash].js' : '[name].js',
    path: outputPath,
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  plugins

}
