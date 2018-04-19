<template>
  <div class="functionBox">
    <h3 class="funcTitle">{{func.title}}</h3>
    <p class="funcTips">{{func.tips}}</p>
    <div class="example">
      <div class="from">
        <img class="exampleImg" :src="func.example.from.img" :alt="func.example.from.txt">
        <p class="exampleTxt">{{func.example.from.txt}}</p>
      </div>
      <div class="process">
        <img class="processImg" :src="func.example.process.img" alt="processing">
        <p></p>
      </div>
      <div class="to">
        <img class="exampleImg" :src="func.example.to.img" :alt="func.example.to.txt">
        <p class="exampleTxt">{{func.example.to.txt}}</p>
      </div>
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
        tips: '上传图片识别过程，参考示例如下',
        example: {
          from: {
            img: require('../assets/images/待识别图片.png'),
            txt: '待识别图片'
          },
          process: {
            img: require('../assets/images/idCard/箭头.png')
          },
          to: {
            img: require('../assets/images/识别结果.png'),
            txt: '识别结果'
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.functionBox{
  padding: 0 415px;
  text-align: center;
}
.funcTitle{
  font-size: 36px;
  color: #333333;
  margin-bottom: 40px;
}
.funcTips{
  font-size: 24px;
  color: #666666;
  margin-bottom: 80px;
}
.example{
  display: flex;
  justify-content: space-between;
  margin-bottom: 160px;
}
.exampleImg{
  width: 340px;
  height: 210px;
  margin-bottom: 20px;
  background: #f0f0f0;
}
.exampleTxt{
  font-size: 24px;
  color: #323232;
}
.process{
  padding-top: 60px;
}
.processImg{
  width: 202px;
  height: 80px;
}
</style>
