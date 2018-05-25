<!--  -->
<template>
  <div>
    <h1>login</h1>
    <h1>login</h1>
    <h1>login</h1>
    <button @click="loginHandler">登录</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  components: {},
  computed: {},
  mounted(){},
  methods: {
      loginHandler(){
          console.log('点击登录按钮，已登陆');
          window.localStorage.setItem('token','had login in');
          this.$store.commit('loginFn', window.localStorage.getItem('token'))
      }
  }
}

</script>
<style scoped>
</style>