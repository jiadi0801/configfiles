var path = require('path')
var webpack = require('webpack')
var copyWebpackPlugin =  require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    cache: true,
    entry: {
        build: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, './editor'),
        publicPath: process.env.UPLOAD_ENV === 'rap' ? 'editor/' :'/editor/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // a dep of vue-loader
                        })
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
                test: /\.html$/,
                use: ['vue-html-loader']
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
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        disableHostCheck: true,
        allowedHosts: ['jdv.jd.com', 'local.jd.com'],
        proxy: [
            {
                context: ['/appcfg', '/file/fileUpload', '/screenscheme'],
                target: {
                    "host": "jdv.jd.com",
                    "protocol": 'http:',
                    "port": 80
                },
                secure: false,
                changeOrigin: true
            }
            ,{
             context:['/screen/index.jsp'],
                target: {
                    "host": "jdv.jd.com",
                    "protocol": 'http:',
                    "port": 8080
                },
                pathRewrite: {
                    '^/screen/index.jsp':'/screen/index.html'
                }
            }
        ],
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new ExtractTextPlugin("[name].css")
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // http://www.th7.cn/web/html-css/201703/216970.shtml
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                safe: true
            }
        }),
        new copyWebpackPlugin([
            {
                from: './src/assets/theme/',
                to: 'theme/'
            }
        ]),
        // // https://webpack.js.org/plugins/commons-chunk-plugin/#components/sidebar/sidebar.jsx
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     minChunks: Infinity
        // }),

        // https://github.com/webpack/webpack/tree/master/examples/dll
        // http://engineering.invisionapp.com/post/optimizing-webpack/
        // https://github.com/webpack/webpack/tree/master/examples/dll-user
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, "client"),
            manifest: require("./dll/vendor-manifest.json")
        })
    ])
}
