<template>
  <div class="techExperienceWrap" @click="changeSelect">
    <div class="techBox">
      <div class="selectBox">
        <ul>
          <li @click.stop="changeSelect(selectTxt)">{{selectTxt}}</li>
          <li @click.stop="changeSelect(selectTxt2)" v-show="selectFlag">{{selectTxt2}}</li>
        </ul>
        <span class="selectBtn">
          <img @click.stop="selectFlag=!selectFlag" class="selectBtnImg" :src="selectBtnSrc" alt="">
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
    console.log('进入技术体验页时的token是: '+window.localStorage.getItem('token'));
    console.log('scrollTo');
    window.scrollTo(0,0)
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
      if(i=='OCR文字识别'||i=='ocrExp'){
        this.selectTxt = 'OCR文字识别';
        this.selectTxt2 = '众包服务';
        this.componentId = 'ocrExp';
        this.selectFlag = false;
        localStorage.setItem('experienceId','OCR文字识别');
      }else if(i=='众包服务'||i=='crowdsourcingExp'){
        this.selectTxt = '众包服务';
        this.selectTxt2 = 'OCR文字识别';
        this.componentId = 'crowdsourcingExp';
        this.selectFlag = false;
        localStorage.setItem('experienceId','众包服务');
      }else{
        this.selectFlag = false;
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
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 1170px;
  padding-top: 140px;
  padding-bottom: 20px;
  margin: 0 auto;
}
.selectBox{
  position: relative;
  width: 150px;
  height: 54px;
}
.selectBox ul{
  display: flex;
  width: 150px;
  flex-direction: column;
  font-size: 20px;
  color: #ffffff;
}
.selectBox li{
  box-sizing: border-box;
  width: 150px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  background: #1e1e1e;
  border: 1px solid #0090ff;
}
.selectBox li:last-child{
  border-top: none;
}
.selectBtnImg{
  position: absolute;
  top: 0;
  right: -53px;
  width: 54px;
  height: 54px;
}
.showBox{
  box-sizing: border-box;
  width: 100%;
  min-width: 1170px;
  margin: 0 auto;
  padding-bottom: 80px;
}
</style>
