<template>
  <div class="jbbody">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <sectionBox :obj="techFeaturesObj"></sectionBox>
    <productContent :obj="caseObj"></productContent>
    <applicationBox :obj="applicationScenObj"></applicationBox>
  </div>
</template>

<script>
import bannerBox from './bannerBox'
import sectionBox from './sectionBox'
import functionBox from './functionBox'
import tryBox from './tryBox'
import applicationBox from './applicationBox'
import productContent from './productContent'
import priceBox from './priceBox'
export default {
  name: '',
  data () {
    return {
      bannerSrc: require('../assets/images/首页banner.png'),
      techFeaturesObj: {
        title: {
          img: require('../assets/images/index/技术特色.png')
        },
        list: [
          {
            img: require('../assets/images/index/精确识别.png'),
            title: '精确识别',
            txt: '基于深度学习技术，经过亿万级样本数据进行训练，单字段OCR识别率可达99%；结合平安众包服务，识别准确率可达99.9%以上。'
          },
          {
            img: require('../assets/images/index/稳定高效.png'),
            title: '稳定高效',
            txt: 'OCR结果实时反馈，众包服务24X7不停歇，支持海量图像高效识别，可用性高达99.9%以上。'
          },
          {
            img: require('../assets/images/index/操作简单.png'),
            title: '操作简单',
            txt: '接包平台提供符合技术规范的API访问接口及灵活设置的众包服务，使用简单，兼容性强。'
          },
          {
            img: require('../assets/images/index/灵活应用.png'),
            title: '灵活应用',
            txt: '支持定制化OCR模板训练，除标准证外，更支持各类票据、表格及文档的个性化识别服务，满足各场景需求。'
          },
        ]
      },
      applicationScenObj: {
        title: {
          img: require('../assets/images/index/应用场景.png')
        },
        list: [
          {
            img: require('../assets/images/index/金融.png')
          },
          {
            img: require('../assets/images/index/医疗.png')
          },
          {
            img: require('../assets/images/index/政府.png')
          },
          {
            img: require('../assets/images/index/物流.png')
          }
        ]
      },
      caseObj: {
        title: {
          img: require('../assets/images/产品内容.png')
        },
        pasx: {
          img: require('../assets/images/产品内容.png'),
          name: '产品内容',
          txt: '产品内容'
        }
      }
    }
  },
  components: {
    bannerBox,sectionBox,functionBox,tryBox,applicationBox,productContent,priceBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
