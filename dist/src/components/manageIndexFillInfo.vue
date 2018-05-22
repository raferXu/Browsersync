<template>
  <div class="manageIndexFillInfoBox">
    <div class="box nameBox">
      <i>*</i>
      <span>模板名称</span>
      <input type="text">
    </div>
    <div class="box descBox">
      <i>*</i>
      <span>需求描述</span>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
    <div class="box pageBox">
      <i>*</i>
      <span>模板页面</span>
      <b></b>
      <s></s>
      <input type="text">
    </div>
    <div class="box countBox">
      <i>*</i>
      <span class="spanMax">预计月调用次数</span>
      <input type="text">
    </div>
    <div class="box timeBox">
      <i>*</i>
      <span class="spanMax">预计调用时长</span>
      <input type="text">
    </div>
    <div class="box maxCountBox">
      <i>*</i>
      <span class="spanMax">预计调用峰值</span>
      <input type="text">
    </div>
    <div class="box addPosBox">
      <i>*</i>
      <span class="spanMax">叠加位置信息</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manageIndexFillInfoBox{
  padding-left: 80px;
}
.box{
  display: flex;
  align-items: center;
  height: 54px;
}
.descBox{
  height: 200px;
}
.box input{
  height: 54px;
  background: #f0f0f0;
}
.box textarea{
  background: #f0f0f0;
}
.box span{
  padding: 0 20px;
}
.spanMax{
  box-sizing: border-box;
  width: 230px;
}
.box i{
  color: #ff3b30;
}
</style>
