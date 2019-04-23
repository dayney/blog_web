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
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/common/less/index.less')
      ]
    }
  }
}
