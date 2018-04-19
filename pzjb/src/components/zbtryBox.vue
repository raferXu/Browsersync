<template>
  <div class="tryBox">
    <h3 class="tryTitle">{{tryObj.title}}</h3>
    <div class="mainBox">
      <div class="showBox">
        <div class="imgBox">
          <div class="bigImgBox">
            <img class="bigImg" :src="tryObj.bigImg" alt="bigImg">
            <img v-show="checkedNames.indexOf('id')>-1" class="rectImg" :src="tryObj.rectImg1" alt="rectImg">
            <img v-show="checkedNames.indexOf('name')>-1" class="rectImg" :src="tryObj.rectImg2" alt="rectImg">
          </div>
          <div class="smallImgBox">
            <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
          </div>
        </div>
        <div class="infoBox">
          <div class="infoTitleBox">
            <span class="infoTitle">以下为OCR结果，请选择所需众包校验的字段</span>
          </div>
          <div class="resultBox">
            <div class="nameBox" v-for="(v,k) in example.result" :key="k">
              <input type="checkbox" :value="k" class="checkbox" v-model="checkedNames">
              <span class="key">{{keyNameObj[k]}}</span>
              <span class="val">{{v}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="operateBox">
        <div class="imgUrlWrap">
          <div class="imgWrap">
            <div class="imgUrlBox">
              <input class="urlInput" type="text" placeholder="网络图片URL" v-model="imgUrl">
              <span class="urlBtn" @click="upload">选择图片</span>
            </div>
            <span class="orTxt">或</span>
            <div class="localUploadBox">
              <input class="urlBtn" type="button" value="本地上传">
              <input ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
            </div>
          </div>
          <div class="imgTips">提示: 支持识别大小不超过3M，长边不超过800像素的png、jpg、jpeg、bmp图片。</div>
          <div class="tryCountBox">剩余体验次数 <span class="tryCount">{{tryCount}}</span> 次</div>
        </div>
        <div class="checkWrap">
          <div class="checkTxtBox">校验次数：3次 (实际使用时可以设置>3次校验)</div>
          <div class="urlBtn checkBtn">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tryCount: 5,
      keyNameObj: {
        name: '姓名:',
        id: '身份证号:'
      },
      checkedNames: [],
      imgUrl: '',
      nowTable: 'result',
      imgIndex: 0,
      tryObj: {
        title: '在线体验',
        showImgArr: [
          require('../assets/images/身份证识别体验.png'),
          require('../assets/images/身份证识别体验.png'),
          require('../assets/images/身份证识别体验.png'),
          require('../assets/images/身份证识别体验.png'),
        ],
        bigImg: require('../assets/images/身份证识别体验.png'),
        rectImg1: require('../assets/images/身份证号.png'),
        rectImg2: require('../assets/images/姓名.png')
      },
      example: {
        result: {
          name: '小静',
          id: '370782198709170246'
        }
      },
      exampleRes: [
        {
          result: {
            name: '小静',
            id: '370782198709170246'
          }
        },
        {
          result: {
            name: '小静',
            id: '370782198709170246'
          }
        },
        {
          result: {
            name: '小静',
            id: '370782198709170246'
          }
        },{
          result: {
            name: '小静',
            id: '370782198709170246'
          }
        }
      ]
    }
  },
  methods: {
    showBigImg(i){
      this.imgIndex = i;
      this.example = this.exampleRes[i];
      this.tryObj.bigImg = this.tryObj.showImgArr[i];
    },
    upload(){
      console.log(this.imgUrl)
    },
    fileUpload(e){
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tryBox{
  padding: 80px 375px;
  background: #ebf6ff;
}
.tryTitle{
  margin-bottom: 80px;
  font-size: 36px;
  color: #333333;
  text-align: center;
}
.showBox{
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 40px; */
}
.imgBox{
  width: 585px;
  margin-right: 20px;
}
.bigImgBox{
  position: relative;
  margin-bottom: 20px;
}
.bigImg{
  width: 585px;
  height: 280px;
  background: #f0f0f0;
}
.rectImg{
  position: absolute;
  width: 585px;
  height: 280px;
  top: 0;
  left: 0;
}
.smallImgBox{
  display: flex;
  justify-content: space-between;
  font-size:0;
}
.smallImg{
  box-sizing: border-box;
  width: 140px;
  height: 90px;
  border: 2px solid transparent;
}
.imgActive{
  border-color: red;
}
.infoBox{
  width: 565px;
}
.infoTitleBox{
  display: flex;
  justify-content: space-around;
  height: 54px;
  margin-bottom: 10px;
  background: #aadaff;
}
.infoTitle{
  box-sizing: border-box;
  height: 54px;
  line-height: 54px;
  font-size: 24px;
  font-weight: bold;
  color: #0090ff;
}
.bdb{
  border-bottom: 4px solid #0090ff;
}
.resultBox, .responseBox{
  width: 565px;
  height: 324px;
  overflow: auto;
}
.resultBox{
  background: #cae8ff;
}
.nameBox{
  height: 54px;
  line-height: 54px;
  text-align: left;
  font-size: 16px;
  color: #333333;
}
.nameBox:nth-of-type(odd){
  background: #cae8ff;
}
.nameBox:nth-of-type(even){
  background: #aadaff;
}
.checkbox{
  appearance: checkbox;
  margin-left: 40px;
  margin-right: 20px;
}
.key{
  display: inline-block;
  width: 128px;
  margin-right: 20px;
  text-align: left;
}
.operateBox{
  display: flex;
  justify-content: space-between;
}
.imgUrlWrap{
  display: flex;
  flex-direction: column;
  width: 585px;
  margin-right: 20px;
}
.imgWrap{
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}
.imgUrlBox{
  display: flex;
}
.urlInput{
  box-sizing: border-box;
  width: 276px;
  height: 54px;
  line-height: 54px;
  padding-left: 10px;
  border: 1px solid #aadaff;
  border-right: none;
}
.urlBtn{
  width: 130px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  background: #0090ff;
}
.orTxt{
  line-height: 54px;
  font-size: 24px;
}
.localUploadBox{
  position: relative;
  overflow: hidden;
}
.fileUploadBtn{
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 54px;
  opacity: 0;
}
.imgTips{
  padding: 20px 0 40px;
  line-height: 2;
  font-size: 14px;
  color: #666666;
  text-align: left;
}
.checkWrap{
  display: flex;
  align-self: flex-start;
  flex: 1;
  padding: 40px;
  background: #ffffff;
}
.tryCountBox{
  text-align: left;
  font-size: 18px;
  color: #333333;
}
.tryCount{
  color: #ff3b30;
}
.checkTxtBox{
  font-size: 18px;
  text-align: left;
}
.checkBtn{
  margin-left: 40px;
}
</style>
