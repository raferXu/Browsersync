<template>
  <div class="customizedOCRBox">
    <bannerBox :bannerStyle="bannerStyle">
        <div class="bannerTxtBox">
        <h3 class="mainH3 bannerH3">众包服务</h3>
        <span class="mainBtn bannerBtn" @click="jumpTo('/techExperience','众包服务')">在线体验</span>
        <a v-if="loginFlag" class="mainBtn bannerBtn" href="manage.html?to=ZBmodel">立即开通</a>
        <router-link v-else class="mainBtn bannerBtn" to="/login?from=manage_ZBmodel">立即开通</router-link>
        </div>
    </bannerBox>
    <jbSection>
        <h4 slot="sectionHeaderTitle" class="sectionHeader">功能介绍</h4>
        <ul slot="content" class="list">
            <li class="sectionListItem" v-for="(listObj,index) in funcScenObj.list" :key="index">
                <listBox :obj="listObj"></listBox>
            </li>
        </ul>
    </jbSection>
    <div class="box futBox">
        <h3 class="mainH3B tc pb80">产品特色</h3>
        <ul class="list">
            <li class="item" v-for="(listObj,index) in listData" :key="index">
                <listItem :listObj="listObj"></listItem>
            </li>
        </ul>
    </div>
    <jbSection :jbSectionStyle="stepStyle"></jbSection>
    <jbSection>
        <h4 slot="sectionHeaderTitle" class="sectionHeader">应用场景</h4>
        <ul slot="content" class="list">
            <li class="sectionListItem" v-for="(listObj,index) in applicationScenObj.list" :key="index">
                <listBox :obj="listObj"></listBox>
            </li>
        </ul>
    </jbSection>
    <div class="pt80 pb80 tc">
        <a v-if="loginFlag" class="mainColorBigBtn" href="manage.html?to=ZBmodel">申请众包服务</a>
        <router-link v-else class="mainColorBigBtn" to="/login?from=manage_ZBmodel">申请众包服务</router-link>
    </div>
  </div>
</template>

<script>
import bannerBox from '@/components/bannerBox'
import listItem from '@/components/listItem'
import listBox from '@/components/listBox'
import jbSection from '@/components/jbSection'
export default {
  name: '',
  created () {
    console.log('scrollTo');
    window.scrollTo(0,0)
  },
  data () {
    return {
        stepStyle: {
            height: '712px',
            backgroundSize: '1920px 712px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(' + require('../../assets/images/使用流程-众包服务.png') + ')'
        },
        listData: [
            {
                url: require('../../assets/images/安全脱敏icon.png'),
                title: '安全脱敏',
                txt: '信息有机拆分，脱敏及防控追溯机制，保障信息安全。'
            },
            {
                url: require('../../assets/images/稳定高效.png'),
                title: '快速响应',
                txt: '平台数百万日处理量，大量数据快速沉淀实现业务无延时。'
            },
            {
                url: require('../../assets/images/高质交付icon.png'),
                title: '高质交付',
                txt: '多重验证机制严格把控平台回收结果，提供全面、高效、专业的数据交付。'
            }
        ],
        funcScenObj: {
            list: [
            {
                title: '众包审核——校验OCR识别结果',
                text: '基于OCR识别结果，将机器识别准确率较低的疑难文字，通过平安众包人工审核服务进行有效纠错，助力OCR识别精度提升至99.9%。',
                src: require('../../assets/images/众包审核——校验OCR识别结果.png')
            },
            {
                title: '众包录入——纯人工输入',
                text: '通过24*7全天候运营的平安众包平台，连接海量用户进行文字录入，并提供交叉验证机制对回收结果进行系统自动核对，高质高效完成数据交付。',
                src: require('../../assets/images/众包录入——纯人工输入.png')
            }
            ]
        },
        applicationScenObj: {
            list: [
            {
                title: '手写体识别',
                text: '针对手写数字、手写文字体等多种复杂图片进行纯人工文字检测及录入，迅速完成文档电子化。',
                src: require('../../assets/images/手写体识别.png')
            },
            {
                title: '机器识别的低效字段',
                text: '解决整图文字识别中个别信息识别效果差影响业务适用性的情况，通过人工快速纠正OCR错误识别信息，迅速提升整体准确性，达到各场景下的可用性标准。',
                src: require('../../assets/images/机器识别的低效字段.png')
            }
            ]
        },
        bannerStyle: {
            backgroundSize: '1920px 500px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(' + require('../../assets/images/众包服务banner.png') + ')'
        },
    }
  },
  components: {
    bannerBox,
    jbSection,
    listBox,
    listItem
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
    width: 1170px;
    margin: 0 auto;
    padding-top: 160px;
    text-align: left;
}
.futBox{
    padding-bottom: 80px;
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
.imgL{
    position: absolute;
    top:315px;
    right:270px;
    width:377px;
}
</style>
