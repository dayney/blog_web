<template>
  <div>
    <layout>
      <div class="k-article">
        <el-container>
          <el-main>
             <div class="k-title"><h4>文章标题</h4></div>
            <div class="k-info">2020年02月20日 10:14  109次阅读</div>
            <div class="k-content">尽管在耐用性方面存在诸多质疑，但三星的Galaxy Z Flip似乎非常受消费者的欢迎。这家韩国电子巨头本周三表示，目前Z Flip线上线下渠道均已售罄，并计划在本周五再进行铺货。
    图片截取自三星官方视频此前，该公司表示 Galaxy Z Flip 会开启限量销售。然而据诸多媒体报道，三星官网、百思买和 AT&T 等线上零售渠道的新机很快就售罄（交付时间在 1 ~ 2 周）。在为这家韩国电子巨头感到庆贺的同时，还是有媒体希望大家冷静看待。比如 Phandroid 就指出，尽管取得了这一成功，该公司也不大可能售出成千上万的设备。原因是许多商店根本没有库存，仅有的库存也寥寥无几。此前有韩国消息人士称，三星到目前为止仅生产了 50 万部的 Galaxy Z Flip 。不过从现在的市场反响来看，后续还是可以追加不少产能的。配置方面，Galaxy Z Flip 采用了 6.7 英寸的 Infinity Flex 显示屏，辅以专有的可弯曲超薄玻璃（UTG）。三星为该机开发了全新的 Hideaway 折叠屏铰链，以及增强的定制用户体验。然而初期该机尽在美、韩等特定市场有售，可选镜面紫和镜面黑两种配色。未来几个月，Galaxy Z Flip 有望在更多市场推出，且部分地区会提供镜面金的配色选项。</div>
          </el-main>
          <el-aside width="200px">
            <section>
              <div class="k-title"><h3>最新文章</h3></div>
              <ul>
                <li v-for="i in 5" :key="i">
                  <router-link to="/">生活的苦难</router-link>
                </li>
              </ul>
            </section>
          </el-aside>
        </el-container>

      </div>
    </layout>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'home',
  components: {
    Layout
  },
  data () {
    return {
      article: {}
    }
  },
  filters: {
    formateDate (val) {
      return unescape(val)
    }
  },
  created () {
    // this.initarticle()
  },
  methods: {
    async initarticle () {
      let self = this
      await this.$api
        .getArticleDetail({id: this.$route.params.id})
        .then(res => {
          self.article = res.article
        })
        .catch(err => {
          err && console.log(err)
        })
    }
  }
}
</script>
<style lang="less">
.k-article {
  width: 100%;
  min-height: 100px;
  background-color: #fff;
  border-radius: 4px;

  .k-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    h4 {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
  }

  .k-info {
    width: 100%;
    color: #999;
    text-align: center;
  }
  .k-content {
    margin-top: 10px;
    text-align: left;
  }
}
</style>
