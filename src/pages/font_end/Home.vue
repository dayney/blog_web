<template>
  <div class="home">
    <h3>前端首页</h3>
    <span @click="log">
    <a class="vux-header-more" @click.stop="tagAEvent">1231321231233</a>
    </span>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from 'components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    // this.$store.commit('setToken', 123123)

    console.log(this.$store.state.system.token)
  },
  methods: {
    log () {
      console.log('excel log')
    },
    tagAEvent (e) {
      console.log('excel tagAEvent')
    }
  }
}
</script>
