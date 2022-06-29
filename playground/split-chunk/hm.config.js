const path = require('path')

const HummerLoadScriptPlugin  = require('../../index')
module.exports = {
  type: 'tenon',
  webpack: {
    entries: "src/*/entry.js",
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].js",
      globalObject: 'this',

    },

    optimization: {
      splitChunks: {
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
    plugins: [new HummerLoadScriptPlugin({infix: 'hahaha'})]
  }
}