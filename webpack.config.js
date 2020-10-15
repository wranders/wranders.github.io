/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  name: 'wranders.github.io',
  mode: String,
  watch: Boolean,
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    'static/js/main': path.resolve(__dirname, 'src', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Screens': path.resolve(__dirname, 'src/Screens'),
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.pug'),
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      exclude: ['CNAME', 'keybase.txt', 'pgp_pubkey.asc', /\.md$/],
    }),
  ],
};
