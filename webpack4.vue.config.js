var path = require('path')
var webpack = require('webpack')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
        vendor: ['vue', 'vue-router', 'axios', 'qs', 'jsonp', 'rxjs']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s?[ac]ss$/,
                // use: [MiniCssExtractPlugin.loader, 'style-loader', 'vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
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
            }
        ]
    },
    devServer: {
        host: "dev.m.jd.com",
        port: 80,
        contentBase: "./",
        inline: true,
        disableHostCheck: true,
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // http://www.th7.cn/web/html-css/201703/216970.shtml
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                safe: true
            }
        })
    ])
}
