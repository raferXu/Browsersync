<template>
  <div class="idCardBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <div class="bannerTxtBox">
      <h3 class="mainH3 bannerH3">身份证识别</h3>
      <span class="mainBtn bannerBtn">在线体验</span>
      <span class="mainBtn bannerBtn">立即开通</span>
    </div>
    <div class="pt160">
      <functionBox></functionBox>
    </div>
    <cardApplication></cardApplication>
    <priceBox></priceBox>
  </div>
</template>

<script>
import bannerBox from '@/components/bannerBox'
import functionBox from '@/components/functionBox'
import cardApplication from '@/components/cardApplication'
import priceBox from '@/components/priceBox'
export default {
  name: '',
  data () {
    return {
      bannerSrc: require('../assets/images/身份证识别banner.png')
    }
  },
  components: {
    bannerBox,functionBox,cardApplication,priceBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
