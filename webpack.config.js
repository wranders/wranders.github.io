const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    name: 'wranders.github.io',
    mode: String,
    watch: Boolean,
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: {
        'static/js/main': './src/index.jsx',
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
        alias: {
            Components: path.resolve(__dirname, 'src/components'),
            Image: path.resolve(__dirname, 'src/img'),
            Screens: path.resolve(__dirname, 'src/screens')
        },
        extensions: ['.jsx', '.js']
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: 'static/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
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
                    test: /[\\/]node_modules[\\/].*\.js$/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug'
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: 'service-worker.js',
            clientsClaim: true,
            skipWaiting: true,
            exclude: [ /CNAME$/, /\.md$/]
        })
    ]
}