<template>
  <div class="jbbody">
    <bannerBox :bannerStyle="bannerStyle"></bannerBox>
    <jbSection>
      <h4 slot="sectionHeaderImg" class="sectionHeader">
        <img :src="productFeaturesImg" alt="">
      </h4>
      <ul slot="content" class="list">
          <li class="item" v-for="(listObj,index) in techFeaturesObj.list" :key="index">
              <listItem :listObj="listObj"></listItem>
          </li>
      </ul>
    </jbSection>
    <jbSection :jbSectionStyle="productContentStyle">
      <h4 slot="sectionHeaderImg" class="sectionHeader">
        <div class="emptyHeader"></div>
      </h4>
      <ul slot="content" class="list">
          <li v-for="(listObj,index) in productContentObj.list" :key="index">
              <listBox :obj="listObj" :listStyle="productContentObj.listStyle">
                <div class="btnG">
                  <span v-for="(v,i) in listObj.btn" :key="i" @click="jumpTo(v.to,v.query)">{{v.txt}}</span>
                </div>
              </listBox>
          </li>
      </ul>
    </jbSection>
    <jbSection :jbSectionStyle="applicationScenStyle">
      <h4 slot="sectionHeaderImg" class="sectionHeader">
        <img :src="applicationScenImg" alt="">
      </h4>
      <div slot="content">
        <applicationBox :obj="applicationScenObj"></applicationBox>
      </div>
    </jbSection>
    <jbSection>
      <h4 slot="sectionHeaderImg" class="sectionHeader">
        <img :src="caseImg" alt="">
      </h4>
      <div slot="content" class="list caseBox">
          <img :src="parsImg" alt="">
          <img :src="pacxImg" alt="">
      </div>
    </jbSection>
  </div>
</template>

<script>
import bannerBox from '@/components/bannerBox'
import jbSection from '@/components/jbSection'
import listItem from '@/components/listItem'
import listBox from '@/components/listBox'
import applicationBox from '@/components/applicationBox'
export default {
  name: '',
  data () {
    return {
      applicationScenStyle: {
        height: '857px',
        backgroundSize: '1920px 857px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: 'url(' + require('../../assets/images/应用场景背景.png') + ')'
      },
      productContentStyle: {
        height: '817px',
        backgroundSize: '1920px 817px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: 'url(' + require('../../assets/images/产品内容-首页.png') + ')'
      },
      bannerStyle: {
        height: '1080px',
        backgroundSize: '1920px 1080px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: 'url(' + require('../../assets/images/首页banner.png') + ')'
      },
      bannerSrc: require('../../assets/images/首页banner.png'),
      productFeaturesImg: require('../../assets/images/产品特色.png'),
      techFeaturesObj: {
        title: {
          img: require('../../assets/images/产品特色.png')
        },
        list: [
          {
            url: require('../../assets/images/精确识别.png'),
            title: '精确识别',
            txt: '基于深度学习的自研OCR技术，支持多角度拍摄，适应透视畸变、光照不均的情况，在复杂环境中可保持高识别准确率'
          },
          {
            url: require('../../assets/images/灵活使用icon.png'),
            title: '灵活使用',
            txt: '除了可直接调用的全面的 API 接口，还提供了丰富多样的 SDK 供开发者使用，服务使用简单便捷，兼容性强'
          },
          {
            url: require('../../assets/images/定制开发icon.png'),
            title: '定制开发',
            txt: '支持自定义OCR识别内容，快速生成识别模型，满足各场景需求'
          },
          {
            url: require('../../assets/images/众包助力icon.png'),
            title: '众包助力',
            txt: '全面、高效、专业的文字录入众包管理平台，解决疑难识别内容'
          },
        ]
      },
      applicationScenImg: require('../../assets/images/应用场景.png'),
      applicationScenObj: {
        list: [
          {
            img: require('../../assets/images/金融.png')
          },
          {
            img: require('../../assets/images/医疗.png')
          },
          {
            img: require('../../assets/images/政府.png')
          },
          {
            img: require('../../assets/images/物流.png')
          }
        ]
      },
      caseImg: require('../../assets/images/客户案例.png'),
      parsImg: require('../../assets/images/平安人寿.png'),
      pacxImg: require('../../assets/images/平安产险.png'),
      productContentObj: {
        list: [
          {
            title: '标准卡证识别',
            text: '支持快速开通多种文字识别服务，包括身份证、行驶证、驾驶证、银行卡及上海医疗发票等标准化文件类型',
            src: require('../../assets/images/身份证体验.png'),
            btn: [
              {
                txt: '在线体验',
                to: '/techExperience',
                query: 'ocrExp'
              },
              {
                txt: '了解详情',
                to: '/idCard'
              }
            ]
          },
          {
            title: '定制化识别服务',
            text: '提供除标准卡证外的文字识别服务，针对各类图片的文字识别内容，支持个性化定制OCR模板，快速生成算法模型，灵活匹配识别需求',
            src: require('../../assets/images/定制化识别服务场景图.png'),
            btn: [
              {
                txt: '了解详情',
                to: '/customizedOCR'
              }
            ]
          },
          {
            title: '众包服务',
            text: '针对手写体识别等复杂内容，提供人工录入、人工审核的平安众包APP任务分发平台，满足疑难识别需求，保障识别精度',
            src: require('../../assets/images/众包服务场景图.png'),
            btn: [
              {
                txt: '在线体验',
                to: '/techExperience',
                query: 'crowdsourcingExp'
              },
              {
                txt: '了解详情',
                to: '/crowdsourcing'
              }
            ]
          }
        ],
        listStyle: {
          width: '363px',
          height: '461px',
          background: '#ffffff'
        }
      }
    }
  },
  created () {
    console.log('scrollTo');
    window.scrollTo(0,0)
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
  },
  components: {
    bannerBox,
    jbSection,
    applicationBox,
    listBox,
    listItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  height: auto;
  margin-bottom: 80px;
  text-align: center;
  border: none;
}
.titleImg{
  width: 137px;
}
.list{
    display: flex;
    justify-content: space-between;
    padding-bottom: 80px;
}
.item{
    width: 232px;
}
.btnG{
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  text-align: center;
  color: #0090ff;
  font-size: 14px;
}
.caseBox{
  width: 644px;
  padding-bottom: 160px;
  margin: 0 auto;
}

</style>