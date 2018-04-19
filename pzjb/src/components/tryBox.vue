<template>
  <div class="tryBox">
    <h3 class="tryTitle">{{tryObj.title}}</h3>
    <div class="mainBox">
      <div class="showBox">
        <div class="imgBox">
          <div class="bigImgBox">
            <img class="bigImg" :src="tryObj.bigImg" alt="bigImg">
          </div>
          <div class="smallImgBox">
            <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
          </div>
        </div>
        <div class="infoBox">
          <div class="infoTitleBox">
            <span class="infoTitle" :class="{'bdb':nowTable=='result'}" @click="nowTable='result'">识别结果</span>
            <span class="infoTitle" :class="{'bdb':nowTable=='response'}" @click="nowTable='response'">Response Json</span>
          </div>
          <div class="resultBox" v-show="nowTable=='result'">
            <div class="nameBox" v-for="(v,k) in example.result" :key="k">
              <span class="key">{{k}}</span>
              <span class="val">{{v}}</span>
            </div>
          </div>
          <div class="responseBox" v-show="nowTable=='response'">responseBox</div>
        </div>
      </div>
      <div class="operateBox">
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
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      imgUrl: '',
      nowTable: 'result',
      imgIndex: 0,
      tryObj: {
        title: '在线体验',
        showImgArr: [
          require('../assets/images/2371523602521hd.png'),
          require('../assets/images/2401523603122_hd.png'),
          require('../assets/images/2411523603123_hd.png'),
          require('../assets/images/2431523603616_hd.png'),
        ],
        bigImg: require('../assets/images/2371523602521hd.png')
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
            name: '章鱼',
            id: '310228199601115411'
          }
        },
        {
          result: {
            name: '小贴贴',
            id: '333333333333333333'
          }
        },{
          result: {
            name: '妹子',
            id: '123123123123121212'
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
      this.imgIndex = -1;
      var _this = this;
      console.log(this.$refs.fileInput.files[0])
      var obj = this.$refs.fileInput.files[0];
      var reader = new FileReader();
      var imgFile;
      reader.onload=function(e) {
          imgFile = e.target.result;
          _this.tryObj.bigImg = window.URL.createObjectURL(obj);;
          var blob = new Blob([imgFile]);
          _this.axios.post('https://test-pazb.pingan.com.cn:20443/alg/ocr_chanxian_test/id_test_only', blob)
          .then(function (response) {
            if(response.status==200){
              var data = response.data;
              if(data.code==200){
                var info = data.info;
                console.log(info)
                _this.example.result = info;
              }else{
                _this.example.result = {};
                console.log('data.code: '+data.code)
              }
            }else{
              console.log('response.status: '+response.status)
            }
          })
          .catch(function (error) {
            console.log('error');
            console.log(error);
          });
      };

      //正式读取文件
      reader.readAsArrayBuffer(this.$refs.fileInput.files[0]);
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
  margin-bottom: 40px;
}
.imgBox{
  width: 585px;
}
.bigImgBox{
  margin-bottom: 15px;
}
.bigImg{
  width: 585px;
  height: 280px;
  background: #f0f0f0;
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
.key{
  display: inline-block;
  width: 128px;
  margin-right: 50px;
  text-align: right;
}
.operateBox{
  display: flex;
  justify-content: space-between;
  width: 585px;
  margin-bottom: 20px;
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
  font-size: 14px;
  color: #666666;
  text-align: left;
}
</style>
