<template>
  <div class="OCRfunctionBox">
    <h3 class="funcTitle">{{func.title}}</h3>
    <p class="funcTips">{{func.tips}}</p>
    <div class="stepWrap">
      <div class="stepBox">
        <div class="circleBox c1Bg" :class="{'nowStep':step>0}"></div>
        <div class="rectBox r1Bg" :class="{'nowStep':step>0}"></div>
        <!-- <div class="rectBox" :class="{'nowStep':step>1}"></div> -->
        <div class="circleBox c2Bg" :class="{'nowStep':step>1}"></div>
        <div class="rectBox r2Bg" :class="{'nowStep':step>1}"></div>
        <!-- <div class="rectBox" :class="{'nowStep':step>2}"></div> -->
        <div class="circleBox c3Bg" :class="{'nowStep':step>2}"></div>
        <div class="rectBox r3Bg" :class="{'nowStep':step>2}"></div>
        <!-- <div class="rectBox" :class="{'nowStep':step>3}"></div> -->
        <div class="circleBox c4Bg" :class="{'nowStep':step>3}"></div>
        <div class="rectBox r4Bg" :class="{'nowStep':step>3}"></div>
        <!-- <div class="rectBox" :class="{'nowStep':step>4}"></div> -->
        <div class="circleBox c5Bg" :class="{'nowStep':step>4}"></div>
        <div class="rectBox r5Bg" :class="{'nowStep':step>4}"></div>
        <!-- <div class="rectBox" :class="{'nowStep':step>5}"></div> -->
        <div class="circleBox c6Bg" :class="{'nowStep':step>5}"></div>
      </div>
      <div class="stepTxtBox">
        <span>1.在线自定义OCR模板</span>
        <span>2.上传样本</span>
        <span>3.缴纳训练费用</span>
        <span>4.自定义开发 (7日)</span>
        <span>5.验收训练成果</span>
        <span>6.按需调用API</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      step: -1,
      func: {
        title: '功能介绍',
        tips: '上传图片识别过程，参考示例如下',
        example: {
          
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.c1Bg{
  background: #d8eeff;
}
.c2Bg{
  background: #abdaff;
}
.c3Bg{
  background: #89ccff;
}
.c4Bg{
  background: #68bdff;
}
.c5Bg{
  background: #34a7ff;
}
.c6Bg{
  background: #0090ff;
}
.r1Bg{
  background: linear-gradient(90deg,#d8eeff,#abdaff)
}
.r2Bg{
  background: linear-gradient(90deg,#abdaff,#89ccff)
}
.r3Bg{
  background: linear-gradient(90deg,#89ccff,#68bdff)
}
.r4Bg{
  background: linear-gradient(90deg,#68bdff,#34a7ff)
}
.r5Bg{
  background: linear-gradient(90deg,#34a7ff,#0090ff)
}
.OCRfunctionBox{
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
.stepWrap{
  /* padding: 80px 0 80px 110px; */
  padding: 0 0 160px 30px;
}
.stepBox{
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 20px;
}
.circleBox{
  width: 60px;
  height: 60px;
  border-radius: 30px;
  /* background: #f0f0f0; */
}
.rectBox{
  /* width: 67px; */
  width: 134px;
  height: 10px;
  /* background: #f0f0f0; */
}
.nowStep{
  background: #0090ff;
}
.stepTxtBox{
  display: flex;
  justify-content: space-between;
  width: 1070px;
  position: relative;
  left: -60px;
  font-size: 24px;
  color: #323232;
}
.stepTxtBox span{
  width: 150px;
}
</style>
