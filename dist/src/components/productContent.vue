<template>
  <div class="mainBox caseBox">
    <div class="mainTitle tc">
      <img class="titleImg" v-if="obj.title.img" :src="obj.title.img" alt="title">
      <span v-else>{{obj.title.txt}}</span>
    </div>
    <div class="df mb160 standardBox">
        <div class="left">
            <h3 class="mainH3 pt40 pb40">标准卡证识别</h3>
            <p class="mainTxt pb80">
                支持快速开通多种文字识别服务，包括身份证、行驶证、驾驶证、银行卡及上海医疗发票等标准化文件类型
            </p>
            <span class="mainBtn" @click="jumpTo('/techExperience','ocrExp')">在线体验</span>
        </div>
        <ul class="right standardRight">
            <li @click="jumpTo(value.link)" v-for="(value,index) in standardData" :key="index">
                <img :src="value.url" alt="">
                <div v-if="value.txt" class="mask">身份证</div>
            </li>
        </ul>
    </div>
    <div class="df mb160 customBox">
        <div class="imgBox mr160" @click="jumpTo('/customizedOCR')">
            <img class="serverIcon" :src="customizedOCRSrc" alt="">
        </div>
        <div class="txtBox">
            <h3 class="mainH3 pt40 pb40">定制化识别服务</h3>
            <p class="mainTxt">
                提供除标准卡证外的文字识别服务，针对各类图片的文字识别内容，支持个性化定制OCR模板，快速生成算法模型，灵活匹配识别需求            
            </p>
        </div>
    </div>
    <div class="df crowdsourcingBox">
        <div class="txtBox">
            <h3 class="mainH3 pt40 pb40">众包服务</h3>
            <p class="mainTxt pb80">
                针对手写体识别等复杂内容，提供人工录入、人工审核的平安众包APP任务分发平台，满足疑难识别需求，保障识别精度
            </p>
            <span class="mainBtn" @click="jumpTo('/techExperience','crowdsourcingExp')">在线体验</span>
        </div>
        <div class="imgBox ml160" @click="jumpTo('/crowdsourcing')">
        <img class="serverIcon" :src="crowdsourcingSrc" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['obj'],
  data () {
    return {
        customizedOCRSrc: require('../assets/images/定制化识别服务场景图.png'),
        crowdsourcingSrc: require('../assets/images/众包服务场景图.png'),
        standardData: [
            {
                url: require('../assets/images/身份证体验.png'),
                txt: '身份证',
                link: '/idCard'
            },
            {
                url: require('../assets/images/行驶证体验.png'),
                txt: ''
            },
            {
                url: require('../assets/images/银行卡体验.png'),
                txt: ''
            },
            {
                url: require('../assets/images/驾驶证体验.png'),
                txt: ''
            },
            {
                url: require('../assets/images/医院票据.png'),
                txt: ''
            },
            {
                url: require('../assets/images/自定义模板.png'),
                txt: ''
            }
        ]
    }
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

.mr160{
    margin-right: 180px;
}
.ml160{
    margin-left: 180px;
}
.caseBox{
    padding-left: 200px;
    padding-right: 200px;
    background: #333333;
    text-align: left;
}
.title{
  text-align: center;
  border: none;
}
.titleImg{
  width: 129px;
}

.left{
    flex: 1;
    padding-right: 200px;
}

.right{
    display: flex;
    flex-wrap: wrap;
    width: 840px;
}
.standardRight li{
    position: relative;
    width: 280px;
    height: 164px;
    overflow: hidden;
}
.standardRight img{
    width: 100%;
}
.mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    text-align: center;
    line-height: 164px;
    font-size: 24px;
    color: #ffffff;
    background: rgba(0,144,255,0.7);
}
.standardRight li:hover .mask{
    z-index: 1;
    cursor: pointer;
}

.imgBox{
   width: 840px;
   height: 328px;
   background: #ffffff;
}
.txtBox{
    flex: 1;
}
.serverIcon{
    width: 840px;
}
</style>
