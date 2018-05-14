<template>
  <div class="bannerBox" :class="{'bannerH':bannerStyle}">
    <img class="banner" :src="bannerSrc" alt="bannerSrc">
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['bannerSrc','bannerStyle']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bannerBox{
  height: 520px;
  overflow: hidden;
  background: #f0f0f0;
}
.banner{
  width: 100%;
  height: 100%;
}
.bannerH{
  height: 620px;
}
</style>
