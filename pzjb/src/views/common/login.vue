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
      token: ''
    };
  },
  components: {},
  computed: {},
  mounted(){
    // this.$store.commit(types.TITLE, 'Login');
  },
  methods: {
      loginHandler(){
          console.log('点击登录按钮，已登陆');
          window.localStorage.setItem('token','had login in');
          this.$store.commit('loginFn', window.localStorage.getItem('token'));
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          this.$router.push({
            path: redirect
          });
      }
  }
}

</script>
<style scoped>
</style>