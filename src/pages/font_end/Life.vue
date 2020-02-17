<template>
  <layout>
    <div class="k-life">
      生活感悟
    </div>
  </layout>
</template>

<script>
import { commonLayout } from './utils/mixins.js'

export default {
  name: 'Life',
  mixins: [ commonLayout ]
}
</script>

<style lang="less">
@import "./assets/style/index.less";

.k-about {
  .main-container;
}
</style>
