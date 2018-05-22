<template>
  <div class="idCardBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <div class="bannerTxtBox">
      <h3 class="mainH3 bannerH3">身份证识别</h3>
      <span class="mainBtn bannerBtn" @click="jumpTo('/techExperience','ocrExp')">在线体验</span>
      <!-- <span class="mainBtn bannerBtn">立即开通</span> -->
      <a class="mainBtn bannerBtn" href="manage.html?to=OCRmodel">立即开通</a>
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
      bannerSrc: require('../../assets/images/身份证识别banner.png')
    }
  },
  created () {
    console.log('scrollTo');
    window.scrollTo(0,0)
  },
  components: {
    bannerBox,functionBox,cardApplication,priceBox
  },
  methods: {
      jumpTo(link,params){
          if(link){
              if(params){
                  this.$router.push({path:link,query:{to: params}});
              }else{
                  this.$router.push(link);
              }
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
