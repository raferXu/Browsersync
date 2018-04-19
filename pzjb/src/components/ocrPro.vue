<template>
  <div class="ocrProBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <proIntroduceBox :itrdObj="itrdObj"></proIntroduceBox>
    <tasteOnlineBox :tasteObj="tasteObj"></tasteOnlineBox>
    <applicationSceneBox :apsObj="apsObj"></applicationSceneBox>
  </div>
</template>

<script>
import bannerBox from './bannerBox'
import proIntroduceBox from './proIntroduceBox'
import applicationSceneBox from './applicationSceneBox'
import tasteOnlineBox from './tasteOnlineBox'

export default {
  name: '',
  data () {
    return {
      bannerSrc: require('../assets/images/index/首页banner.png'),
      itrdObj: {
        title: '业务介绍',
        txt: '业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍业务介绍',
        img: require('../assets/images/index/首页banner.png')
      },
      apsObj: {
        title: '应用场景',
        imgArr: [require('../assets/images/index/首页banner.png'),require('../assets/images/index/首页banner.png'),require('../assets/images/index/首页banner.png')]
      },
      tasteObj: {
        title: '在线体验',
        tasteArr: [
          {
            txt: '身份证',
            img: require('../assets/images/身份证体验.png'),
            to: '/idCard'
          },
          {
            txt: '行驶证',
            img: require('../assets/images/行驶证体验.png'),
            to: ''
          },
          {
            txt: '驾驶证',
            img: require('../assets/images/驾驶证体验.png'),
            to: ''
          },
          {
            txt: '银行卡',
            img: require('../assets/images/银行卡体验.png'),
            to: ''
          },
          {
            txt: '医疗票据 (上海)',
            img: require('../assets/images/医院票据.png'),
            to: ''
          },
          {
            txt: '自定义模板',
            img: require('../assets/images/自定义模板.png'),
            to: '',
            link: 'manage.html?to=manageCustomDevIndex'
          }
        ]
      }
    }
  },
  components: {
    bannerBox,proIntroduceBox,applicationSceneBox,tasteOnlineBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
