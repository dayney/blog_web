<template>
  <layout>
    <div class="k-study">
      学习记录
    </div>
  </layout>
</template>

<script>
import { commonLayout } from './utils/mixins.js'

export default {
  name: 'Study',
  mixins: [ commonLayout ]
}
</script>

<style lang="less">
@import "./assets/style/index.less";

.k-style {
  .main-container;
}
</style>
