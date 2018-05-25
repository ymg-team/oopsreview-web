require("dotenv").config();

const webpack = require("webpack");
const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");

let outputPath;
let plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename:
      process.env.NODE_ENV === "production" ? "vendor.[hash].js" : "vendor.js",
    minChunks: Infinity
  }),
  new AssetsPlugin({
    prettyPrint: false,
    path: path.join(__dirname, "internals")
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

outputPath = path.resolve(__dirname, "public/build");

// production config
if (process.env.NODE_ENV === "production") {
  // minify appjs
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  plugins.push(
    new UglifyJSPlugin()
  );
}

// default config
module.exports = {
  entry: {
    app: "./src/client/index.ts",
    vendor: ["vue", "vuex", "vue-router", "string-manager"]
  },

  output: {
    filename:
      process.env.NODE_ENV === "production" ? "[name].[hash].js" : "[name].js",
    path: outputPath,
    publicPath: "/"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        loader: "vue-loader"
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        loader: "css-loader"
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },

  plugins
};
