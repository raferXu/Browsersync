<template>
  <div class="customizedOCRBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <div class="bannerTxtBox">
      <h3 class="mainH3 bannerH3">众包服务</h3>
      <span class="mainBtn bannerBtn" @click="jumpTo('/techExperience','众包服务')">在线体验</span>
      <!-- <span class="mainBtn bannerBtn">申请开通</span> -->
      <a class="mainBtn bannerBtn" href="manage.html?to=ZBmodel">立即开通</a>
    </div>
    <div class="box">
        <h3 class="mainH3B tc pb80">功能介绍</h3>
        <media :mediaData="ocrAppliData[2]"></media>
        <div class="divide"></div>
        <media :mediaData="ocrAppliData[3]"></media>
    </div>
    <div class="box futBox">
        <h3 class="mainH3B tc pb80">产品特色</h3>
        <ul class="list">
            <li class="item" v-for="(listObj,index) in listData" :key="index">
                <listItem :listObj="listObj"></listItem>
            </li>
        </ul>
    </div>
    <div class="box bg3 stepBox" style="position:relative">
        <h3 class="mainH3 tc pb80">使用流程</h3>
        <img class="stepImg" :src="stepSrc" alt="stepImg">
        <!-- <img class="imgL" src="../../assets/images/众包服务文字识别服务使用流程.png"> -->
    </div>
    <div class="box">
        <h3 class="mainH3B tc pb80">应用场景</h3>
        <media :mediaData="ocrAppliData[0]"></media>
        <div class="divide"></div>
        <media :mediaData="ocrAppliData[1]"></media>
    </div>
    <div class="pt160 pb160 tc">
        <!-- <span class="mainColorBigBtn">申请众包服务</span> -->
        <a class="mainColorBigBtn" href="manage.html?to=ZBmodel">申请众包服务</a>
    </div>
  </div>
</template>

<script>
import bannerBox from '@/components/bannerBox'
import media from '@/components/media'
import listItem from '@/components/listItem'
export default {
  name: '',
  created () {
    console.log('scrollTo');
    window.scrollTo(0,0)
  },
  data () {
    return {
        listData: [
            {
                url: require('../../assets/images/安全脱敏icon.png'),
                title: '安全脱敏',
                txt: '信息有机拆分，脱敏及防控追溯机制，保障信息安全。'
            },
            {
                url: require('../../assets/images/index/稳定高效.png'),
                title: '快速响应',
                txt: '平台数百万日处理量，大量数据快速沉淀实现业务无延时。'
            },
            {
                url: require('../../assets/images/高质交付icon.png'),
                title: '高质交付',
                txt: '多重验证机制严格把控平台回收结果，提供全面、高效、专业的数据交付。'
            }
        ],
        ocrAppliData: [
            {
                title: '1. 手写体识别',
                txt: '针对手写数字、手写文字体等多种复杂图片进行纯人工文字检测及录入，迅速完成文档电子化。',
                url: require('../../assets/images/手写体识别.png'),
                imgRight: true
            },
            {
                title: '2. 机器识别的低效字段',
                txt: '解决整图文字识别中个别信息识别效果差影响业务适用性的情况，通过人工快速纠正OCR错误识别信息，迅速提升整体准确性，达到各场景下的可用性标准。',
                url: require('../../assets/images/机器识别的低效字段.png'),
                imgRight: false
            },
            {
                title: '众包审核——校验OCR识别结果',
                txt: '基于OCR识别结果，将机器识别准确率较低的疑难文字，通过平安众包人工审核服务进行有效纠错，助力OCR识别精度提升至99.9%。',
                url: require('../../assets/images/众包审核——校验OCR识别结果.png'),
                imgRight: false
            },
            {
                title: '众包录入——纯人工输入',
                txt: '通过24*7全天候运营的平安众包平台，连接海量用户进行文字录入，并提供交叉验证机制对回收结果进行系统自动核对，高质高效完成数据交付。',
                url: require('../../assets/images/众包录入——纯人工输入.png'),
                imgRight: true
            }
        ],
      page: 'customizedOCR',
      bannerSrc: require('../../assets/images/众包服务banner.png'),
      stepSrc: require('../../assets/images/开通&未开通OCR文字识别服务使用流程.png')
    }
  },
  components: {
    bannerBox,media,listItem
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
.box{
    padding: 160px 375px 0;
    text-align: left;
}
.futBox, .stepBox{
    padding-bottom: 160px;
}
.divide{
    height: 80px;
}
.list{
    display: flex;
    justify-content: space-between;
}
.item{
    width: 336px;
}
.stepBox{
    padding: 1.6rem 0;
    text-align: center;
}
.stepImg{
    width: 1222px;
}
.imgL{
    position: absolute;
    top:315px;
    right:270px;
    width:377px;
}
</style>
