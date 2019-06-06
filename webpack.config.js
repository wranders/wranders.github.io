const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        name: 'wranders.github.io',
        entry: {
            main: path.resolve(__dirname, 'src/index.jsx')
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
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' }
                    ]
                },
                {
                    test: /\.(png|jpg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            publicPath: 'static'
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
            path: path.resolve(__dirname, 'build/static'),
            publicPath: 'static'
        },
        performance: {
            hints: process.env.NODE_ENV === 'production' ? 'warning' : false
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'public/icons', to: 'icons' },
                { from: 'public/CNAME', to: '../CNAME', toType: 'file'},
                { from: 'public/browserconfig.xml', to: '../browserconfig.xml', toType: 'file'},
                { from: 'public/manifest.json', to: '../manifest.json', toType: 'file'},
                { from: 'README.md', to: '../README.md', toType: 'file'},
                { from: 'LICENSE.md', to: '../LICENSE.md', toType: 'file'}
            ]),
            new HtmlWebpackPlugin({
                filename: path.resolve(__dirname, 'build/index.html'),
                template: path.resolve(__dirname, 'src/index.html'),
                meta: {
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    'theme-color': '#000000',
                    'msapplication-TileColor': '#000000'
                },
                templateParameters: {
                    publicUrl: 'https://www.doubleu.codes'
                }
            })
        ]
    }
]