<template>
  <div class="bannerBox" :style="bannerStyle">
    <!-- <img :style="{left: left+'px'}" class="banner" :src="bannerSrc" alt="bannerSrc"> -->
    <slot></slot>
  </div>
</template>

<script>
// import {common} from '../assets/js/common'
export default {
  name: '',
  data () {
    return {
      // left: 0
    }
  },
  methods: {
    
  },
  computed: {
    
  },
  mounted(){
  },
  // props: ['bannerSrc','bannerStyle'],
  props: {
    bannerStyle: {
      default: ()=> {return {
        'backgroundColor': '#000000'
      }}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bannerBox{
  width: 100%;
  min-width: 1170px;
  height: 500px;
  position: relative;
  overflow: hidden;
}
/* .banner{
  position: absolute;
  left: 0;
  top: 0;
  min-width: 1920px;
  width: 100%;
  height: 1080px;
} */
</style>
