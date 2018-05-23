<template>
  <div class="jbbody">
    <bannerBox :bannerSrc="bannerSrc" :bannerStyle="bannerStyle"></bannerBox>
    <div class="pt160">
      <div class="title" style="height: auto;">
        <img class="titleImg" v-if="techFeaturesObj.title.img" :src="techFeaturesObj.title.img" alt="title">
        <span v-else>{{obj.title.txt}}</span>
      </div>
      <ul class="list">
          <li class="item" v-for="(listObj,index) in techFeaturesObj.list" :key="index">
              <listItem :listObj="listObj"></listItem>
          </li>
      </ul>
    </div>
    <productContent :obj="caseObj"></productContent>
    <applicationBox :obj="applicationScenObj"></applicationBox>
  </div>
</template>

<script>
import bannerBox from '@/components/bannerBox'
import listItem from '@/components/listItem'
import applicationBox from '@/components/applicationBox'
import productContent from '@/components/productContent'
export default {
  name: '',
  data () {
    return {
      bannerStyle: 1,
      bannerSrc: require('../../assets/images/首页banner.png'),
      techFeaturesObj: {
        title: {
          img: require('../../assets/images/产品特色.png')
        },
        list: [
          {
            url: require('../../assets/images/index/精确识别.png'),
            title: '精确识别',
            txt: '基于深度学习的自研OCR技术，支持多角度拍摄，适应透视畸变、光照不均的情况，在复杂环境中可保持高识别准确率'
          },
          {
            url: require('../../assets/images/灵活使用icon.png'),
            title: '灵活使用',
            txt: '除了可直接调用的全面的 API 接口，还提供了丰富多样的 SDK 供开发者使用，服务使用简单便捷，兼容性强'
          },
          {
            url: require('../../assets/images/index/操作简单.png'),
            title: '定制开发',
            txt: '支持自定义OCR识别内容，快速生成识别模型，满足各场景需求'
          },
          {
            url: require('../../assets/images/index/灵活应用.png'),
            title: '众包助力',
            txt: '全面、高效、专业的文字录入众包管理平台，解决疑难识别内容'
          },
        ]
      },
      applicationScenObj: {
        title: {
          img: require('../../assets/images/index/应用场景.png')
        },
        list: [
          {
            img: require('../../assets/images/index/金融.png')
          },
          {
            img: require('../../assets/images/index/医疗.png')
          },
          {
            img: require('../../assets/images/index/政府.png')
          },
          {
            img: require('../../assets/images/index/物流.png')
          }
        ]
      },
      caseObj: {
        title: {
          img: require('../../assets/images/产品内容.png')
        },
        pasx: {
          img: require('../../assets/images/产品内容.png'),
          name: '产品内容',
          txt: '产品内容'
        }
      }
    }
  },
  created () {
    console.log('scrollTo');
    window.scrollTo(0,0)
  },
  components: {
    bannerBox,
    applicationBox,
    productContent,
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
    padding: 0 200px 160px;
}
.item{
    width: 320px;
}
</style>
