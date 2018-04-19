<template>
  <div class="idCardBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <functionBox></functionBox>
    <tryBox></tryBox>
    <cardApplication></cardApplication>
    <priceBox></priceBox>
  </div>
</template>

<script>
import bannerBox from './bannerBox'
import functionBox from './functionBox'
import tryBox from './tryBox'
import cardApplication from './cardApplication'
import priceBox from './priceBox'
export default {
  name: '',
  data () {
    return {
      bannerSrc: require('../assets/images/index/首页banner.png')
    }
  },
  components: {
    bannerBox,functionBox,tryBox,cardApplication,priceBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
