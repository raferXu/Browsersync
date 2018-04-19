<template>
  <div class="manageIndexBox">
    <div class="title">{{title}}</div>
    <step :step="which"></step>
    <component :is="now"></component>
    <div class="customizedDevBtnG">
      <span class="btn">取消</span>
      <span class="btn">下一步</span>
    </div>
  </div>
</template>

<script>
import fillInfo from './manageIndexFillInfo'
import txtLabel from './manageIndexLabel'
import sampleUpload from './manageIndexSampleUpload'
import submitCheck from './manageIndexSubmit'
import step from './step'
export default {
  name: '',
  data () {
    // fillInfo,label,sampleUpload,submit
    return {
      title: '自定义开发',
      now: 'fillInfo'
    }
  },
  computed: {
    which(){
      var step = 1;
      if(this.now=='fillInfo'){
        step = 1;
      }else if(this.now=='txtLabel'){
        step = 2;
      }else if(this.now=='sampleUpload'){
        step = 3;
      }else if(this.now=='submitCheck'){
        step = 4;
      }
      return step;
    }
  },
  components: {
    fillInfo,txtLabel,sampleUpload,submitCheck,step
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  height: 90px;
  line-height: 90px;
  padding-left: 40px;
  font-size: 32px;
  color: #323232;
}
.customizedDevBtnG{
  text-align: center;
}
.btn{
  display: inline-block;
  width: 130px;
  text-align: center;
  height: 54px;
  line-height: 54px;
  color: #ffffff;
  font-size: 24px;
  background: #0090ff;
  cursor: pointer;
}
.btn:nth-child(2){
  margin-left: 160px;
}
.btn:active{
  background: #68bdff;
}
</style>
