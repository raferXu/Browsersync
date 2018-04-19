<template>
  <div class="stepWrap">
    <div class="stepBox">
      <div class="circleBox" :class="{'nowStep':step>0}"></div>
      <div class="rectBox" :class="{'nowStep':step>0}"></div>
      <div class="rectBox" :class="{'nowStep':step>1}"></div>
      <div class="circleBox" :class="{'nowStep':step>1}"></div>
      <div class="rectBox" :class="{'nowStep':step>1}"></div>
      <div class="rectBox" :class="{'nowStep':step>2}"></div>
      <div class="circleBox" :class="{'nowStep':step>2}"></div>
      <div class="rectBox" :class="{'nowStep':step>2}"></div>
      <div class="rectBox" :class="{'nowStep':step>3}"></div>
      <div class="circleBox" :class="{'nowStep':step>3}"></div>
    </div>
    <div class="stepTxtBox">
      <span>1.填写信息</span>
      <span>2.字段标注</span>
      <span>3.样本上传</span>
      <span>4.提交审核</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['step']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stepWrap{
  padding: 80px 0 80px 110px;
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
  background: #f0f0f0;
}
.rectBox{
  width: 95px;
  height: 10px;
  background: #f0f0f0;
}
.nowStep{
  background: #0090ff;
}
.stepTxtBox{
  display: flex;
  justify-content: space-between;
  width: 870px;
  position: relative;
  left: -30px;
  font-size: 24px;
  color: #323232;
}
</style>
