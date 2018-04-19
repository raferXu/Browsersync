<template>
  <div class="crowdsourcingBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <zbfunctionBox></zbfunctionBox>
    <div class="tryBox">
      <zbtryBox></zbtryBox>
    </div>
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
import zbfunctionBox from './zbfunctionBox'
import cardApplication from './cardApplication'
import consultAndTryBtnG from './consultAndTryBtnG'
import zbtryBox from './zbtryBox'
export default {
  name: '',
  data () {
    return {
      page: 'crowdsourcing',
      bannerSrc: require('../assets/images/index/首页banner.png')
    }
  },
  components: {
    bannerBox,zbfunctionBox,cardApplication,consultAndTryBtnG,zbtryBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tryBox{
  background: #ebf6ff;
}
.btnWrap{
  padding: 160px;
}
</style>
