const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  name: 'wranders.github.io',
  mode: String,
  watch: Boolean,
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    'static/js/main': path.resolve(__dirname, 'src', 'index.jsx')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          maxSize: 50000
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.pug')
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      exclude: [
        'CNAME',
        'keybase.txt',
        'pgp_pubkey.asc',
        /\.md$/
      ]
    })
  ]
};