<template>
  <div class="expWrap">
    <div class="expBox">
      <div class="smallImgBox">
        <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
      </div>
      <div class="bigImgBox" ref="bigImgBox">
        <span class="bigImgSpan" ref="bigImgSpan">
          <img class="bigImg" ref="bigImg" :src="tryObj.bigImg" alt="bigImg">
        </span>
      </div>
      <div class="infoBox" :style="infoBoxStyle">
        <div class="loadingBox" v-show="loading">加载中...</div>
        <div class="infoTitleBox">
          <span class="infoTitle" :class="{'bdb':nowTable=='result'}" @click="nowTable='result'">识别结果</span>
          <span class="infoTitle" :class="{'bdb':nowTable=='response'}" @click="nowTable='response'">Response Json</span>
        </div>
        <div class="resultBox" v-show="nowTable=='result'">
          <div class="nameBox">
            <span class="key">姓名: </span>
            <span class="val">{{example.result.name}}</span>
          </div>
          <div class="nameBox">
            <span class="key">身份证: </span>
            <span class="val">{{example.result.id}}</span>
          </div>
        </div>
        <div class="responseBox" v-show="nowTable=='response'">
          <pre v-show="imgIndex==0">
  {
    "code": "200",
    "info": {
      "id": "370782198709170246",
      "name": "小静"
    },
    "message": "success"
  }
          </pre>
          <pre v-show="imgIndex==1">
  {
    "code": "200",
    "info": {
      "id": "310228199601115411",
      "name": "章鱼"
    },
    "message": "success"
  }
          </pre>
          <pre v-show="imgIndex==2">
  {
    "code": "200",
    "info": {
      "id": "652901196611026716",
      "name": "小贴贴"
    },
    "message": "success"
  }
          </pre>
          <pre v-show="imgIndex>2">{{responseTxt}}</pre>
        </div>
      </div>
    </div>
    <div class="tipsBox tl">提示: 支持上传大小不超过3M的PNG、JPG、JPEG、BMP身份证图片进行体验。</div>
    <div class="expBtnG">
        <span class="uploadBtn btnG">
          图片上传
          <input accept="image/bmp,image/jpeg,image/jpg,image/png" ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
        </span>
      </div>
  </div>
</template>

<script>
import {common} from '../assets/js/common'
export default {
  name: '',
  data () {
    return {
      infoBoxStyle: {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../assets/images/识别结果框.png') + ')' 
      },
      responseTxt: '',
      loading: false,
      imgUrl: '',
      nowTable: 'result',
      imgIndex: 0,
      tryObj: {
        showImgArr: [
          require('../assets/images/2371523602521hd.png'),
          require('../assets/images/2401523603122_hd.png'),
          require('../assets/images/2411523603123_hd.png')
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
            id: '652901196611026716'
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
    fileUpload(e){
      this.imgIndex = 3;
      var _this = this;
      var obj = _this.$refs.fileInput.files[0];
      var objUrl = window.URL.createObjectURL(obj);
      this.tryObj.bigImg = objUrl;
      this.tryObj.showImgArr.splice(3,this.tryObj.showImgArr.length-3,''+objUrl);

      var image = new Image();   
      image.onload =function(){  
          var width = image.width;  
          var height = image.height;  
          var wrapW = _this.$refs.bigImgBox.clientWidth;
          var wrapH = _this.$refs.bigImgBox.clientHeight;
          if(width/height>wrapW/wrapH){
            console.log('宽占满');
          }else{
            console.log('高占满');
            _this.$refs.bigImgSpan.style.height = '100%';
            _this.$refs.bigImg.style.height = '100%';
            _this.$refs.bigImg.style.width = 'auto';
          }
      }  
      image.src = objUrl;

      let data = new FormData();
      data.append('file', obj);
      data.append('deviceId', 'device001');
      data.append('clientType', '2');
      data.append('appKey', '24680');
      data.append('appID', 'com.pingan.ocr.demo');
      _this.axios({
        url: 'https://test-pazb.pingan.com.cn:20443/alg/ocr_chanxian_test/identity_card_grab_rec',
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        if(response.status==200){
          var data = response.data;
          _this.responseTxt = data
          if(data.code==200){
            var info = data.info;
            _this.example.result = info;
            _this.exampleRes.splice(3,_this.exampleRes.length-3,{'result': info});
          }else{
            alert('请上传身份证图片');
            common.refresh(_this);
            _this.example.result = {};
            _this.exampleRes.splice(3,_this.exampleRes.length-3,{'result': {}});
          }
        }else{
          console.log('response.status: '+response.status)
        }
      })
      .catch(function (error) {
        console.log('error');
        console.log(error);
        alert('网络异常,请刷新页面');
        common.refresh(_this);
      });
    }
  },
  created () {
    localStorage.setItem('experienceId','ocrExp');
    var _this = this;
    this.axios.interceptors.request.use(function(config){
      console.log("request init.");
      _this.loading = true;
      return config;
    });
    this.axios.interceptors.response.use(function(response){
      console.log("response init.");
      _this.loading = false;
      return response;
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.expBox{
  display: flex;
  padding: 108px 200px 0;
}
.expBtnG{
  padding-top: 80px;
  text-align: center;
}
.btnG{
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

.bigImgBox{
  width: 610px;
  height: 390px;
  overflow: hidden;
  background: #ffffff;
}
.bigImgSpan{
  position: relative;
  display: inline-block;
}
.bigImg{
  width: 585px;
  background: #f0f0f0;
}
.smallImgBox{
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  font-size:0;
  overflow-y: auto;
  overflow-x: hidden;
}
.smallImg{
  box-sizing: border-box;
  width: 140px;
  height: 90px;
  border: 2px solid transparent;
}
.smallImg:not(:last-child){
  margin-bottom: 10px;
}
.imgActive{
  border-color: #0090ff;
}

.infoBox{
  position: relative;
  width: 722px;
  height: 392px;
  margin-left: 40px;
  color: #ffffff;
}
.infoTitleBox{
  line-height: 60px;
  padding-left: 20px;
  text-align: left;
}
.infoTitle{
  font-size: 24px;
  color: #0090ff;
}
.infoTitle:hover, .bdb{
  color: white;
  cursor: pointer;
}
.infoTitle:not(:last-child){
  margin-right: 40px;
}
.resultBox, .responseBox{
  box-sizing: border-box;
  position: relative;
  height: 300px;
  padding: 0 40px;
  overflow: auto;
  text-align: left;
  line-height: 2;
  font-size: 24px;
}
.resultBox{
  padding-top: 30px;
}
.key{
  margin-right: 20px;
}
.loadingBox{
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 324px;
  color: white;
  background: rgba(0,0,0,0.7);
  text-align: center;
}
.tipsBox{
  transform-origin: left top;
  transform: scale(0.9);
  margin: .2rem 3.5rem 0;
  font-size: 0.14rem;
  color: #ffffff;
}
</style>
