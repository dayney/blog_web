let path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'components': '@/views/common/components',
        'common': '@/views/common',
        'fontend': '@/views/font_end',
        'admin': '@/views/admin'
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 9099,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/views/common/less/index.less')
      ]
    }
  }
}
