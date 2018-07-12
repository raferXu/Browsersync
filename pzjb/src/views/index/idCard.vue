<template>
  <div class="idCardBox">
    <bannerBox :bannerStyle="bannerStyle">
      <div class="bannerTxtBox">
        <h3 class="mainH3 bannerH3">身份证识别</h3>
        <span class="mainBtn bannerBtn" @click="jumpTo('/techExperience','ocrExp')">在线体验</span>
        <a v-if="loginFlag" class="mainBtn bannerBtn" href="manage.html?to=OCRmodel">立即开通</a>
        <router-link v-else class="mainBtn bannerBtn" to="/login?from=manage_OCRmodel">立即开通</router-link>
      </div>
    </bannerBox>
    <div class="box">
      <standard :standardData="standardData"></standard>
    </div>
    <jbSection :jbSectionStyle="applicationScenStyle">
      <h4 slot="sectionHeaderTitle" class="sectionHeader"></h4>
      <ul slot="content" class="list">
          <li v-for="(listObj,index) in applicationScenObj.list" :key="index">
              <listBox :obj="listObj"></listBox>
          </li>
      </ul>
    </jbSection>
    <priceBox></priceBox>
  </div>
</template>

<script>
import jbSection from '@/components/jbSection'
import bannerBox from '@/components/bannerBox'
import standard from '@/components/standard'
import listBox from '@/components/listBox'
import priceBox from '@/components/priceBox'
export default {
  name: '',
  data () {
    return {
      overridingStyles: {
        color: '#ffffff',
        textAlign: 'left'
      },
      standardData: {
          title: '功能介绍',
          txt: '支持实时识别二代居民身份证的关键字段，识别准确率可达99%以上，便于提升多种场景下用户信息录入速度及产品身份认证效率，为用户提供最方便快捷的身份证信息录入体验。',
          url: require('../../assets/images/身份证识别功能介绍.png')
      },
      bannerStyle: {
        backgroundSize: '1920px 500px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: 'url(' + require('../../assets/images/身份证识别banner.png') + ')'
      },
      applicationScenObj: {
        list: [
          {
            title: '服务类产品用户实名认证',
            text: '身份证OCR识别技术服务于银行、保险、物流及互联网等行业，适用于各类用户身份认证场景，自动识别并录入姓名及身份证号信息，提升信息输入效率。',
            src: require('../../assets/images/服务类产品用户实名认证.png')
          },
          {
            title: '业务部门身份信息采集',
            text: '人社、金融、工商、公安等政府办事部门使用身份证OCR技术，可以快速识别用户身份信息，缓解政府部门办事压力，减少业务办理的等待时间，是智能识别产业在政务领域的一大突破。',
            src: require('../../assets/images/业务部门身份信息采集.png')
          }
        ]
      },
      applicationScenStyle: {
        height: '596px',
        backgroundSize: '1920px 596px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: 'url(' + require('../../assets/images/应用场景-身份证识别.png') + ')'
      }
    }
  },
  created () {
    console.log('scrollTo');
    window.scrollTo(0,0)
  },
  computed: {
    loginFlag: function(){
      let token = this.$store.state.token || localStorage.getItem('token');
      if(!token || token===null || token==='null'){
        return false;
      }else{
        return true;
      }
    }
  },
  components: {
    bannerBox,
    standard,
    listBox,
    priceBox,
    jbSection
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
.box {
    width: 1170px;;
    padding: 60px 0;
    margin: 0 auto;
    text-align: left;
}
.sectionHeader{
  box-sizing: content-box;
  min-height: 36px;
  padding: 60px 0;
  font-size: 36px;
  color: #333333;
}
.list{
    display: flex;
    justify-content: space-between;
    padding-bottom: 60px;
}
</style>
