const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = [
    {
        name: 'wranders.github.io',
        entry: {
            'static/js/main': './src/index.jsx'
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
                    test: /\.css$/,
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' }
                    ]
                },
                {
                    test: /\.(png|jpg|svg)$/,
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, 'src/img'),
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/img',
                            publicPath: 'static/img'
                        }
                    }
                }
            ]
        },
        resolve: {
            alias: {
                com: path.resolve(__dirname, 'src/com'),
                img: path.resolve(__dirname, 'src/img'),
                screens: path.resolve(__dirname, 'src/screens')
            },
            extensions: ['.jsx', '.js', '.css']
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
            new CopyWebpackPlugin([
                { from: 'public/icons', to: 'static/icons' },
                { from: 'public/CNAME', to: 'CNAME', toType: 'file'},
                { from: 'public/browserconfig.xml', to: 'browserconfig.xml', toType: 'file'},
                { from: 'public/manifest.json', to: 'manifest.json', toType: 'file'},
                { from: 'public/keybase.txt', to: 'keybase.txt', toType: 'file'},
                { from: 'README.md', to: 'README.md', toType: 'file'},
                { from: 'LICENSE.md', to: 'LICENSE.md', toType: 'file'}
            ]),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html'
            }),
            new WorkboxPlugin.GenerateSW({
                swDest: 'service-worker.js',
                clientsClaim: true,
                skipWaiting: true,
                exclude: [ /CNAME$/, /\.md$/]
            })
        ]
    }
]