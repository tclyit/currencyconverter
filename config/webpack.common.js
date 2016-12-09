var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['node_modules', 'src'], extension: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      // Load globally applied styles here (public).
      {
        test: /\.scss$/i,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract(['css', 'sass'])
      },
      // Load component styles here. When loaded with styleUrls in component, string of styles expected.
      {
        test: /\.scss$/i,
        include: helpers.root('src', 'app'),
        loader: 'raw!sass'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new CleanWebpackPlugin(['dist'], {
      root: helpers.root(),
      verbose: true,
      dry: false
    })
  ]
};
