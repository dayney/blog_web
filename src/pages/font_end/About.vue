<template>
  <layout>
    <div class="k-about">
      <div class="k-title-1">
        关于我
      </div>

      <div>
        个人简介
知名技术博主，开源达人，《React状态管理与同构实战》作者krui90后一枚，活跃在各个技术社区，常以歪脖无脸男作为头像，专注Web前端。热爱思考，热爱开源分享，爱好读书，羽毛球，乒乓球，相声，铁杆纲丝，当然非常热爱写代码了，yanhaijing.com是我的个人博客。目前就职于美团点评，从事Web前端开发工作。
      </div>

    </div>
  </layout>
</template>

<script>
import { commonLayout } from './utils/mixins.js'

export default {
  name: 'About',
  mixins: [ commonLayout ],
  methods: {
    knowMe () {
      console.log('了解我')
    }
  }
}
</script>

<style lang="less">
@import "./assets/style/index.less";

.k-about {
  .main-container;

  .k-title-1 {
    margin-top: 20px;
    height: 60px;
    line-height: 60px;
    font-size: 48px;
    font-weight: bold;
    text-align: left;
    color: #000;
    border-bottom: thin solid #eee;
    small {
      font-size: 12px;
      border-radius: 4px;
      overflow: hidden;
      span {
        background-color:red;
      }
    }
  }
}
</style>
