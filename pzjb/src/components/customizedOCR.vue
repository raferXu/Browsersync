<template>
  <div class="customizedOCRBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <OCRfunctionBox></OCRfunctionBox>
    <div class="appliBox">
      <cardApplication></cardApplication>
    </div>
    <div class="btnWrap">
      <consultAndTryBtnG :page="page"></consultAndTryBtnG>
    </div>
  </div>
</template>

<script>
import bannerBox from './bannerBox'
import OCRfunctionBox from './OCRfunctionBox'
import cardApplication from './cardApplication'
import consultAndTryBtnG from './consultAndTryBtnG'
export default {
  name: '',
  data () {
    return {
      page: 'customizedOCR',
      bannerSrc: require('../assets/images/index/首页banner.png')
    }
  },
  components: {
    bannerBox,OCRfunctionBox,cardApplication,consultAndTryBtnG
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appliBox{
  background: #ebf6ff;
}
.btnWrap{
  padding: 160px;
}
</style>
