# hummer-load-script-webpack-pligin
针对hummer项目中splitChunk后chunk加载插件
在hummer项目中起到类似于html-webpack-plugin的作用

## playground
playground下为测试项目可以调试插件功能 项目根目录安装好依赖以后 对应项目下执行hummer dev命令即可查看效果

## 用法
首先你需要在项目中安装我们的脚本加载插件
```
npm i -D @hummer/load-script-webpack-plugin
```
然后再Hummer项目中配置文件hummer.config.js中引入和使用插件，然后进行splitChunks的配置，这一步可以按照[webpack文档][1]进行自定义配置，下面是我给出的简单示例
```
const path = require('path')

const HummerLoadScriptPlugin  = require('@hummer/load-script-webpack-plugin')
module.exports = {
  type: 'tenon',
  webpack: {
    entries: "src/*/entry.js",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js",
      globalObject: 'this',// Hummer环境特殊性，这一步必须配置
    },
    optimization: {
      splitChunks: {
        // 这里我抽取了common和tenon运行时
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            minSize: 10
          },
          tenon: {
            name: 'tenon',
            priority: 3,
            test: /[\\/]node_modules[\\/]@hummer[\\/]tenon-vue[\\/]/,
            chunks: 'initial',
          },
        },
      }
    },
    // 使用插件，infix可以修改原入口名,不传的话默认为main
    plugins: [new HummerLoadScriptPlugin({infix: 'hahaha'})]
  }
}
```
配置完成后重新执行构建,你就可以看到产物发生变化了

