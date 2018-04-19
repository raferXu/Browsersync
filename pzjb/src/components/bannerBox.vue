<template>
  <div class="bannerBox">
    <img class="banner" :src="bannerSrc" alt="">
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['bannerSrc']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bannerBox{
  height: 520px;
  margin-bottom: 160px;
  overflow: hidden;
  background: #f0f0f0;
}
.banner{
  width: 100%;
  height: 100%;
}
</style>
