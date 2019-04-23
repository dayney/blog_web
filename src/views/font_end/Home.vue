<template>
  <div class="home">
    <h3>前端首页</h3>
    <img src="../common/assets/images/logo.png" alt="logo" />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from 'components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
