# configfiles
各种配置文件


* webpack-dev-server --inline --hot
* cross-env NODE_ENV=production webpack --config=webpack.config.js --hide-modules --progress

* 项目通用可替换的配置项，比如host，appid，统一放在独立文件中，方便动态发布

## iconfont
可采用这俩个工具尝试

brew install ttfautohint fontforge --with-python

npm install grunt-webfont --save-dev


## 疑问
initializing的loading动画，翻页。寻求统一封装的模式。

DataSource封装分页

## webpack 打包加速（待验证）
* 性能分析Webpack-bundle-analyzer、webpack-chart、 webpack-analyse
* 时间分析Speed Measure Plugin
* 加速loader HappyPack/thread-loader
* 缓存loader cacheDirectory/cache-loader
* 固定依赖 DllPlugin
* 模块查找 exclude include resolve

