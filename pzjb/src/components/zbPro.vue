<template>
  <div class="zbProBox">
    <bannerBox :bannerSrc="bannerSrc"></bannerBox>
    <proIntroduceBox :itrdObj="itrdObj"></proIntroduceBox>
    <bussinessCon :bussinessCon="bussinessCon"></bussinessCon>
    <applicationSceneBox :apsObj="apsObj"></applicationSceneBox>
  </div>
</template>

<script>
import bannerBox from './bannerBox'
import proIntroduceBox from './proIntroduceBox'
import applicationSceneBox from './applicationSceneBox'
import bussinessCon from './bussinessCon'

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
      bussinessCon: {
        title: '业务内容',
        bussinessArr: [
          {
            img: require('../assets/images/index/首页banner.png')
          },
          {
            img: require('../assets/images/index/首页banner.png')
          },
          {
            img: require('../assets/images/index/首页banner.png')
          },
          {
            img: require('../assets/images/index/首页banner.png')
          }
        ]
      }
    }
  },
  components: {
    bannerBox,proIntroduceBox,applicationSceneBox,bussinessCon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
