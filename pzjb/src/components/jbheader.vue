<template>
  <div class="jbheader">
    <div class="navbar">
      <div class="navbar-nav navbar-left">
        <img src="" alt="">
        <span>{{navbarObj.left.txt}}</span>
      </div>
      <ul class="navbar-nav">
        <li>
          <router-link to=""></router-link>
        </li>
      </ul>
      <div class="navbar-nav navbar-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      navbarObj: {
        left: {
          icon: '',
          txt: '平安接包'
        },
        right: {

        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jbheader{
  display: flex;
  height: 60px;
  padding: 0 375px;
}
</style>
