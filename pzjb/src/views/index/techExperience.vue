<template>
  <div class="techExperienceWrap">
    <div class="techBox">
      <div class="selectBox">
        <ul>
          <li @click="changeSelect(selectTxt)">{{selectTxt}}</li>
          <li @click="changeSelect(selectTxt2)" v-show="selectFlag">{{selectTxt2}}</li>
        </ul>
        <span class="selectBtn">
          <img @click="selectFlag=!selectFlag" class="selectBtnImg" :src="selectBtnSrc" alt="">
        </span>
      </div>
    </div>
    <div class="showBox">
        <component :is="componentId"></component>
      </div>
  </div>
</template>

<script>
import ocrExp from '@/components/ocrExp'
import crowdsourcingExp from '@/components/crowdsourcingExp'
export default {
  name: '',
  created () {
    var to = this.$route.query.to || localStorage.getItem('experienceId');
    console.log('to: '+to);
    this.changeSelect(to);
  },
  data () {
    return {
      componentId: 'ocrExp',
      selectBtnSrc: require('../../assets/images/下拉按钮.png'),
      selectFlag: false,
      selectTxt: 'OCR文字识别',
      selectTxt2: '众包服务',
      selectTxtArr: ['OCR文字识别','众包服务']
    }
  },
  methods: {
    changeSelect(i){
      if(i=='OCR文字识别'){
        this.selectTxt = 'OCR文字识别';
        this.selectTxt2 = '众包服务';
        this.componentId = 'ocrExp';
        this.selectFlag = false;
        localStorage.setItem('experienceId','OCR文字识别');
      }else if(i=='众包服务'){
        this.selectTxt = '众包服务';
        this.selectTxt2 = 'OCR文字识别';
        this.componentId = 'crowdsourcingExp';
        this.selectFlag = false;
        localStorage.setItem('experienceId','众包服务');
      }
    }
  },
  components: {
    ocrExp,crowdsourcingExp
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.techExperienceWrap{
  background: #1e1e1e;
}
.techBox{
  box-sizing: border-box;
  height: 260px;
  padding: 140px 0 0 40px;
}
.selectBox{
  position: relative;
  width: 253px;
  height: 58px;
}
.selectBox ul{
  display: flex;
  width: 253px;
  flex-direction: column;
  font-size: 36px;
  color: #ffffff;
}
.selectBox li{
  box-sizing: border-box;
  width: 253px;
  height: 58px;
  line-height: 58px;
  text-align: center;
  border: 1px solid #0090ff;
}
.selectBox li:last-child{
  border-top: none;
}
.selectBtnImg{
  position: absolute;
  top: 0;
  right: -57px;
  width: 58px;
  height: 58px;
}
.showBox{
  padding-bottom: 234px;
}
</style>
