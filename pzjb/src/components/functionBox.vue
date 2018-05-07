<template>
  <div class="functionBox tl">
    <h3 class="funcTitle tc">{{func.title}}</h3>
    <p class="funcTips">{{func.tips}}</p>
    <div class="example">
      <img class="exampleImg" :src="func.exampleImg" alt="exampleImg">
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      func: {
        title: '功能介绍',
        tips: '支持实时识别二代居民身份证的关键字段，识别准确率可达99%以上，便于提升多种场景下用户信息录入速度及产品身份认证效率，为用户提供最方便快捷的身份证信息录入体验。',
        exampleImg: require('../assets/images/身份证识别功能介绍.png')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.functionBox{
  padding: 0 415px;
}
.funcTitle{
  font-size: 36px;
  color: #333333;
  margin-bottom: 80px;
}
.funcTips{
  font-size: 24px;
  color: #666666;
  margin-bottom: 40px;
}
.example{
  display: flex;
  text-align: center;
  margin-bottom: 160px;
}
.exampleImg{
  width: 1170px;
  height: 355px;
}
</style>
