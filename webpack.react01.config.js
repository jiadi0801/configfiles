var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var postcssLoader = {
    loader: 'postcss-loader',
    options: {
        config: {
            path: path.resolve(__dirname, 'postcss.config.js')
        }
    }
}

module.exports = {
    cache: true,
    entry: {
        build: './src/entry.js',
        vendor: ['react', 'react-dom', 'axios', 'moment', 'mobx', 'history', 'qs']
    },
    output: {
        path: path.resolve(__dirname, './target'),
        publicPath: process.env.NODE_ENV === 'production' ? '/qier/target/' : '/target/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                        postcssLoader
                    ]
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: ['file-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]?[hash]'
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: [
                        { loader: 'css-loader' },
                        postcssLoader,
                        { loader: 'sass-loader' }
                    ]
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    devServer: {
        host: "local.jd.com",
        port: 8000,
        contentBase: "./",
        inline: true,
        disableHostCheck: true,
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin("[name].css"),
        // 抽取公共部分放到vendor
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        // http://www.th7.cn/web/html-css/201703/216970.shtml  z-index被重新计算
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                safe: true
            }
        })
    ])
}
