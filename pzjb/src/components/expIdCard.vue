<template>
  <div class="expWrap">
    <div class="expBox">
      <div class="smallImgBox">
        <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
      </div>
      <div class="bigImgBox" ref="bigImgBox">
        <exp-canvas :src="tryObj.bigImg"></exp-canvas>
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
    <div class="tipsWrap">
      <div class="tipsBox tl">提示: 支持上传大小不超过3M的PNG、JPG、JPEG、BMP身份证图片进行体验。</div>
      <div class="expBtnG">
        <span class="uploadBtn btnG">
          上传图片
          <input v-if="fileInputFlag" accept="image/bmp,image/jpeg,image/jpg,image/png" ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {common} from '../assets/js/common'
import expCanvas from './expCanvas'
export default {
  name: '',
  components: {
    expCanvas
  },
  data () {
    return {
      fileInputFlag: true,
      infoBoxStyle: {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../assets/images/识别结果框.png') + ')' 
      },
      insertNum: 3,
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
    showBigImg(i){  //点击小图绘制相应大图
      let nowIndex = i;
      this.imgIndex = nowIndex;
      this.example = this.exampleRes[nowIndex];
      this.tryObj.bigImg = this.tryObj.showImgArr[nowIndex];
    },
    axiosIdentity(data){  //身份证识别请求
      var _this = this;
      _this.axios({
        url: 'https://test-pazb.pingan.com.cn:20443/alg/ocr_chanxian_test/identity_card_grab_rec',
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        _this.loading = false;
        _this.showResult(response);
      })
      .catch(function (error) {
        console.log('alg/ocr_chanxian_test/identity_card_grab_rec error');
        console.log(error);
        alert('网络异常,请刷新页面');
        common.refresh(_this);
      });
    },
    showResult(response){  //识别结果显示
      var info = {};
      var _this = this;
      if(response.status==200){
        var data = response.data;
        _this.responseTxt = data;
        if(data.code==200){
          info = data.info;
        }else{
          alert('请上传身份证图片');
          common.refresh(_this);
        }
      }else{
        console.log('response.status: '+response.status)
      }
      _this.example.result = info;
      _this.exampleRes.splice(_this.insertNum,_this.exampleRes.length-_this.insertNum,{'result': info});
      _this.fileInputFlag = false;
      _this.$nextTick(()=>{
        _this.fileInputFlag = true;
      });
    },
    setAxiosData(obj){  //整合请求数据
      let data = new FormData();
      data.append('file', obj);
      data.append('deviceId', 'device001');
      data.append('clientType', '2');
      data.append('appKey', '24680');
      data.append('appID', 'com.pingan.ocr.demo');
      return data;
    },
    fileUpload(e){  //文件上传
      
      var _this = this;;
      //获取上传图片信息
      var obj = this.$refs.fileInput.files[0];
      var objUrl = window.URL.createObjectURL(obj);
      //设置左边小图
      this.tryObj.showImgArr.splice(_this.insertNum,this.tryObj.showImgArr.length-_this.insertNum,''+objUrl);
      this.imgIndex = _this.insertNum;
      //绘制大图
      this.tryObj.bigImg = objUrl;
      //请求获取图片信息
      let data = this.setAxiosData(obj)
      this.loading = true;
      this.axiosIdentity(data)
    }
  },
  created () {
    localStorage.setItem('experienceId','ocrExp');
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.expBox{
  display: flex;
  width: 1170px;
  padding-top: 110px;
  margin: 0 auto;
}
.expBtnG{
  padding-top: 40px;
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
  width: 150px;
  height: 54px;
  opacity: 0;
}

.bigImgBox{
  width: 416px;
  height: 350px;
  overflow: hidden;
  background: #ffffff;
}
.smallImgBox{
  display: flex;
  width: 140px;
  height: 350px;
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
  font-size: 18px;
  position: relative;
  width: 566px;
  height: 352px;
  margin-left: 40px;
  color: #ffffff;
}
.infoTitleBox{
  padding-top: 10px;
  padding-left: 20px;
  text-align: left;
}
.infoTitle{
  color: #0090ff;
}
.infoTitle:hover, .bdb{
  color: white;
  cursor: pointer;
}
.infoTitle:not(:last-child){
  margin-right: 54px;
}
.resultBox, .responseBox{
  box-sizing: border-box;
  position: relative;
  height: 300px;
  padding: 0 40px;
  overflow: auto;
  text-align: left;
  line-height: 2;
}
.resultBox{
  padding-top: 20px;
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
.tipsWrap{
  width: 1170px;
  margin: 0 auto;
}
.tipsBox{
  width: 416px;
  margin: 10px 0 0 150px;
  font-size: 0.14rem;
  color: #ffffff;
}
</style>
