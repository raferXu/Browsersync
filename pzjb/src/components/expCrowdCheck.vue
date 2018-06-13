<template>
  <div class="expWrap">
    <div class="expBox">
      <div class="smallImgBox">
        <div class="smallImgList">
          <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
        </div>
      </div>
      <div class="bigImgBox" ref="bigImgBox">
        <span class="bigImgSpan" ref="bigImgSpan">
          <img class="bigImg" ref="bigImg" :src="tryObj.bigImg" alt="bigImg">
        </span>
      </div>
      <div class="infoBox" :style="infoBoxStyle">
        <div class="loadingBox" v-if="others.step==1">
          <p class="loadTips">众包校验中，请稍后查看结果。</p>
          <span class="mainBtn refreshBtn" @click="getAppAnswer">刷新</span>
        </div>
        <div class="loadingBox loadingBox2" v-show="!others.coordinateFlag||!others.uploadFlag">加载中...</div>
        <div class="initWrap" v-if="others.step==0">
          <div class="infoTitleBox">
            <span class="infoTitle">识别结果 (请勾选需要进行众包校验的字段信息)</span>
          </div>
          <div class="resultBox">
            <div class="nameBox">
              <input type="checkbox" id="ID_XingMing" value="ID_XingMing" v-model="checkedNames" style="-webkit-appearance:checkbox">
              <span class="key">姓名: </span>
              <span class="val" v-if="example.ID_XingMing">{{example.ID_XingMing.text}}</span>
            </div>
            <div class="idBox">
              <input type="checkbox" id="ID_HaoMa" value="ID_HaoMa" v-model="checkedNames" style="-webkit-appearance:checkbox">
              <span class="key">身份证: </span>
              <span class="val" v-if="example.ID_HaoMa">{{example.ID_HaoMa.text}}</span>
            </div>
          </div>
          <div class="submitBox">
            <span class="countBox"></span>
            <span class="mainBtn" @click="submitToCheck">确认提交</span>
          </div>
        </div>
        <div class="loadingBox resultWrap" v-if="others.step==2">
          <div class="regBox ocrRegBox">
            <h4>OCR识别结果</h4>
            <p v-if="ocrResult['ID_XingMing']">
              <span class="star"><i v-if="ocrResult['ID_XingMing']"></i></span>
              <span class="label">姓名: </span>
              <span class="val">{{ocrResult['ID_XingMing']?ocrResult['ID_XingMing']["alg_answer"]:example.ID_XingMing.text}}</span>
            </p>
            <p v-if="ocrResult['ID_HaoMa']">
              <span class="star"><i v-if="ocrResult['ID_HaoMa']"></i></span>
              <span class="label">身份证: </span>
              <span class="val">{{ocrResult['ID_HaoMa']?ocrResult['ID_HaoMa']["alg_answer"]:example.ID_HaoMa.text}}</span>
            </p>
          </div>
          <div class="regBox crowdsRegBox">
            <h4>众包识别结果</h4>
            <p v-if="ocrResult['ID_XingMing']">
              <span class="star"><i v-if="ocrResult['ID_XingMing']"></i></span>
              <span class="label">姓名: </span>
              <span class="val">{{ocrResult['ID_XingMing']?ocrResult['ID_XingMing']['zb_result']:'xxxxxx'}}</span>
            </p>
            <p v-if="ocrResult['ID_HaoMa']">
              <span class="star"><i v-if="ocrResult['ID_HaoMa']"></i></span>
              <span class="label">身份证: </span>
              <span class="val">{{ocrResult['ID_HaoMa']?ocrResult['ID_HaoMa']['zb_result']:'xxxxxx'}}</span>
            </p>
          </div>
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
import baseUrl from '../Global'
console.log('baseUrl: '+baseUrl.BASE_URL);
export default {
  name: '',
  data () {
    return {
      hasClickSubmit: false,
      task: {
        pic_url: '',
        task_infos:[]
      },
      count: 5,
      checkedNames: [],
      infoBoxStyle: {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../assets/images/识别结果框1.png') + ')' 
      },
      responseTxt: '',
      imgUrl: '',
      nowTable: 'result',
      imgIndex: 0,
      tryObj: {
        showImgArr: [
          require('../assets/images/2371523602521hd.png')
        ],
        bigImg: require('../assets/images/2371523602521hd.png')
      },
      othersList: [
        {
          pic_url: "/token/img/e46cc1b97c046ff6d200772296335b41",
          step: 0,
          coordinateFlag: true,
          uploadFlag: true
        }
      ], 
      others: {
        pic_url: "/token/img/e46cc1b97c046ff6d200772296335b41",
        step: 0,
        coordinateFlag: true,
        uploadFlag: true
      },
      example: {
        "ID_HaoMa": {
          "score": "0.750742434131", 
          "text": "370782198709170246", 
          "xmax": "397.0", 
          "xmin": "138.0", 
          "ymax": "261.121246338", 
          "ymin": "238.674926758"
        }, 
        "ID_XingMing": {
          "score": "0.472615646502", 
          "text": "小静", 
          "xmax": "129.0", 
          "xmin": "73.0", 
          "ymax": "60.3761863708", 
          "ymin": "32.8974304199"
        }, 
        "frame": {
          "rot_angle": 0, 
          "score": "0.996747", 
          "text": "身份证", 
          "type": "ID_Kuang_1", 
          "xmax": "421", 
          "xmin": "4", 
          "ymax": "282", 
          "ymin": "0"
        }
      },
      exampleRes: [
        {
          "ID_HaoMa": {
            "score": "0.750742434131", 
            "text": "370782198709170246", 
            "xmax": "397.0", 
            "xmin": "138.0", 
            "ymax": "261.121246338", 
            "ymin": "238.674926758"
          }, 
          "ID_XingMing": {
            "score": "0.472615646502", 
            "text": "小静", 
            "xmax": "129.0", 
            "xmin": "73.0", 
            "ymax": "60.3761863708", 
            "ymin": "32.8974304199"
          }, 
          "frame": {
            "rot_angle": 0, 
            "score": "0.996747", 
            "text": "身份证", 
            "type": "ID_Kuang_1", 
            "xmax": "421", 
            "xmin": "4", 
            "ymax": "282", 
            "ymin": "0"
          }
        }
      ],
      ocrResultArr: [],
      ocrResult: {}
    }
  },
  methods: {
    getAppAnswer(flag){
      var _this = this;
      var nowIndex = this.imgIndex;
      _this.axios({
        url: '/token/experience_results/ocr',
        method: 'post'
      }).then(function (response) {
        console.log(response)
        var data = response.data;
        if(data.code==200){
          _this.ocrResultArr = data.body.res;
          if(_this.ocrResultArr.length>0){
            console.log('ocrResultArr有数据');
            _this.ocrResult = data.body.res[nowIndex];
            if(flag==1){
              console.log('页面刷新了，获取列表');
              var NowImgArr = [];
              var NowOthersList = [];
              var NowExampleRes = [];
              for(var i=0;i<_this.ocrResultArr.length;i++){
                var nowImgUrl = baseUrl.BASE_URL+_this.ocrResultArr[i]["pic_with_mark"];
                NowImgArr.push(nowImgUrl);
                NowOthersList.push({
                  pic_url: nowImgUrl,
                  step: 1,
                  coordinateFlag: true,
                  uploadFlag: true
                });
                NowExampleRes.push({
                  "ID_HaoMa": {
                    "score": "", 
                    "text": "", 
                    "xmax": "", 
                    "xmin": "", 
                    "ymax": "", 
                    "ymin": ""
                  }, 
                  "ID_XingMing": {
                    "score": "", 
                    "text": "", 
                    "xmax": "", 
                    "xmin": "", 
                    "ymax": "", 
                    "ymin": ""
                  }
                });
              }
              _this.tryObj.showImgArr = NowImgArr;
              _this.tryObj.bigImg = NowImgArr[nowIndex];
              _this.othersList = NowOthersList;
              _this.others = NowOthersList[nowIndex];
              _this.exampleRes = NowExampleRes;
            }else{
              console.log('图片上传');
            }
            _this.checkAppResult(nowIndex);
          }else{
            console.log('返回的ocrResultArr为空数组,新用户初始化状态');
          }
        }else{
          console.log('experience_results/ocr data.code: '+data.code);
          alert('网络异常，请刷新页面');
          common.refresh(_this);
        }
      })
      .catch(function (error) {
        console.log('/token/experience_results/ocr error');
        console.log(error);
        alert('网络异常，请刷新页面');
        common.refresh(_this);
      });
    },
    checkAppResult(nowIndex){
      var _this = this;
      // Cannot read property 'ID_HaoMa' of undefined
      console.log(_this.ocrResult);
      if(_this.ocrResult){
        if(_this.ocrResult["ID_HaoMa"]){
          if(_this.ocrResult["ID_XingMing"]){
            console.log('姓名和身份证都校验');
            if(_this.ocrResult["ID_HaoMa"]["zb_result"]&&_this.ocrResult["ID_XingMing"]["zb_result"]){
              console.log('姓名和身份证app结果都有了');
              _this.others.step = 2;
              _this.othersList[nowIndex].step = 2;
            }else{
              console.log('姓名和身份证还没全部返回结果');
              _this.others.step = 1;
              _this.othersList[nowIndex].step = 1;
            }
          }else{
            console.log('只校验身份证字段');
            if(_this.ocrResult["ID_HaoMa"]["zb_result"]){
              console.log('身份证app结果有了');
              _this.others.step = 2;
              _this.othersList[nowIndex].step = 2;
            }else{
              console.log('身份证app结果还没返回');
              _this.others.step = 1;
              _this.othersList[nowIndex].step = 1;
            }
          }
        }else if(_this.ocrResult["ID_XingMing"]){
          console.log('只校验姓名字段');
          if(_this.ocrResult["ID_XingMing"]["zb_result"]){
            console.log('姓名app结果有了');
            _this.others.step = 2;
            _this.othersList[nowIndex].step = 2;
          }else{
            console.log('姓名app结果还没返回');
            _this.others.step = 1;
            _this.othersList[nowIndex].step = 1;
          }
        }
      }
    },
    showBigImg(i){
      var nowIndex = i;
      this.imgIndex = nowIndex;
      this.others = this.othersList[nowIndex];
      this.ocrResult = this.ocrResultArr[nowIndex];
      this.checkAppResult(nowIndex);
      this.tryObj.bigImg = this.tryObj.showImgArr[nowIndex];
      this.others.step = this.othersList[nowIndex].step;
      this.example = this.exampleRes[nowIndex];
    },
    ocrFn(obj,fileName){
      var _this = this;
      var nowOcrImgIndex = _this.imgIndex;
      let data = new FormData();
      data.append('file', obj);
      data.append('text', JSON.stringify({"0":""+fileName}));
      _this.axios({
        url: 'https://test-pazb.pingan.com.cn:20443/alg/ocr_chanxian_test/id_test_inner',
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        if(response.status==200){
          console.log(response);
          var data = response.data;
          var returnJSON = data[fileName][0],returnInfo;
          _this.others.coordinateFlag = true;
          _this.othersList[nowOcrImgIndex].coordinateFlag = true;
          if(returnJSON){
            returnInfo = returnJSON['info'];
            
          }else{
            console.log('id_test_inner接口返回空，请上传身份证');
            console.log(returnJSON);
            alert('请上传身份证图片');
            common.refresh(_this);
            returnInfo = {
              "ID_HaoMa": {
                "score": "666", 
                "text": "", 
                "xmax": "397.0", 
                "xmin": "138.0", 
                "ymax": "261.121246338", 
                "ymin": "238.674926758"
              }, 
              "ID_XingMing": {
                "score": "666", 
                "text": "", 
                "xmax": "129.0", 
                "xmin": "73.0", 
                "ymax": "60.3761863708", 
                "ymin": "32.8974304199"
              }
            }
          }
          _this.exampleRes.push(returnInfo);
          _this.example = returnInfo;
        }else{
          console.log('response.status: '+response.status);
          _this.others.coordinateFlag = false;
          _this.othersList[nowOcrImgIndex].coordinateFlag = false;
          alert('网络异常，请刷新页面');
          common.refresh(_this);
        }
      })
      .catch(function (error) {
        console.log('ocr_chanxian_test/id_test_inner error');
        console.log(error);
        alert('网络异常，请刷新页面');
        common.refresh(_this);
      });
    },
    fileUpload(e){
      this.checkedNames = [];
      var initLen = this.tryObj.showImgArr.length;
      this.imgIndex = initLen;
      var obj = this.$refs.fileInput.files[0];
      var fileName = obj.name;
      var othersObj = {
        pic_url: '',
        step: 0,
        coordinateFlag: false,
        uploadFlag: false
      };
      this.othersList.push(othersObj);
      this.others = Object.assign({},this.others,othersObj);
      this.ocrResultArr.push({});
      this.ocrResult = {};

      this.upload_files(obj);
      this.handleImg(obj);
      this.ocrFn(obj,fileName);

    },
    handleImg(obj){
      var _this = this;
      var objUrl = window.URL.createObjectURL(obj);
      this.tryObj.bigImg = objUrl;
      this.tryObj.showImgArr.push(objUrl);
      var image = new Image();   
      image.onload =function(){  
          var width = image.width;  
          var height = image.height;  
          var wrapW = _this.$refs.bigImgBox.clientWidth;
          var wrapH = _this.$refs.bigImgBox.clientHeight;
          if(width/height>wrapW/wrapH){
            console.log('宽占满');
            _this.$refs.bigImgSpan.style.width = '100%';
            _this.$refs.bigImg.style.width = '100%';
            _this.$refs.bigImg.style.height = 'auto';
          }else{
            console.log('高占满');
            _this.$refs.bigImgSpan.style.height = '100%';
            _this.$refs.bigImg.style.height = '100%';
            _this.$refs.bigImg.style.width = 'auto';
          }
      }  
      image.src = objUrl;
    },
    upload_files(obj){
      var _this = this;
      var nowImgIndex = _this.imgIndex;
      let formdata = new FormData();
      formdata.append('files',obj);
      _this.axios({
          url:"/token/upload_files",
          data:formdata,
          method:'post'
      }).then(function(res){
          console.log(res);
          if(res.status==200){
            var resData = res.data;
            if(resData.code==200){
              _this.others.uploadFlag = true;
              _this.othersList[nowImgIndex].uploadFlag = true;
              _this.others["pic_url"] = resData.body["url_list"][0];
              _this.othersList[nowImgIndex]["pic_url"] = resData.body["url_list"][0];
            }else{
              console.log('upload_files data.code: '+resData.code);
              _this.others.uploadFlag = false;
              _this.othersList[nowImgIndex].uploadFlag = false;
              alert('网络异常，请刷新页面');
              common.refresh(_this);
              // location.reload();
            }
          }else{
            console.log('upload_files res.status: '+res.status);
            _this.others.uploadFlag = false;
            _this.othersList[nowImgIndex].uploadFlag = false;
            alert('网络异常，请刷新页面');
            common.refresh(_this);
            // location.reload();
          }
      }); 
    },
    submitToCheck(){
      var nowIndex = this.imgIndex;
      console.log('submitToCheck确认提交按钮被点击了 '+this.hasClickSubmit);
      if(this.hasClickSubmit){
        console.log('确认提交按钮被点击,请求提交未返回');
        return;
      }
      this.hasClickSubmit = true;
      if(!this.others.coordinateFlag||!this.others.uploadFlag){
        console.log('坐标没拿到或者文件上传失败');
        alert('网络异常，请刷新页面');
        console.log(localStorage.getItem('experienceId'));
        console.log(localStorage.getItem('crowdsourcingExp'));
        return;
      }
      if(this.exampleRes[nowIndex]['ID_HaoMa']['score']=='666'){
        console.log('算法接口返回空，上传的不是身份证');
        alert('请上传身份证图片');
        this.hasClickSubmit = false;
        
        return;
      }
      
      var _this = this;
      var len = this.checkedNames.length;
      if(len){
        for(var i=0;i<this.checkedNames.length;i++){
          var obj = {};
          obj.type = this.checkedNames[i];
          var info = this.exampleRes[nowIndex][this.checkedNames[i]];
          obj['alg_answer'] = info['text'];
          obj['square'] = [info['xmin'],info['ymin'],info['xmax'],info['ymax']];
          this.task.task_infos.push(obj);
        }
        
        this.task.pic_url = this.othersList[nowIndex].pic_url;
        this.others.step = 1;
        this.othersList[nowIndex].step = 1;

        this.axios({
          url: '/token/add_orc_zb_task',
          method: 'post',
          data: _this.task
        }).then(function (res) {
          _this.hasClickSubmit = false;
          console.log('add_orc_zb_task res返回的状态码是： '+res.data.code);
          console.log(res);
          
          _this.task = {
            pic_url: '',
            task_infos:[]
          };
          console.log(_this.task)
        }).catch(function (error) {
          console.log('/token/add_orc_zb_task error');
          console.log(error);
          alert('网络异常，请刷新页面');
          common.refresh(_this);
        })
      }else{
        alert('请选择字段');
      }
    }
  },
  created () {
    localStorage.setItem('crowdsourcingExp','expCrowdCheck');
    this.getAppAnswer(1);  //初始化页面标志1
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
  height: 390px;
  /* overflow-x: auto; */
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: 10px;
  font-size:0;
}
.smallImgList{
  width: 140px;
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
  /* color: white; */
  cursor: pointer;
}
.infoTitle:not(:last-child){
  margin-right: 40px;
}
.resultBox{
  box-sizing: border-box;
  position: relative;
  height: 236px;
  padding: 30px 40px 0;
  overflow: auto;
  text-align: left;
  line-height: 2;
  font-size: 24px;
}
.key{
  margin-right: 20px;
}
.loadingBox{
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  line-height: 54px;
  color: white;
  background: rgba(0,0,0);
  text-align: center;
  font-size: 24px;
  z-index: 1;
}
.loadingBox2{
  line-height: 392px;
}
.tipsBox{
  transform-origin: left top;
  transform: scale(0.9);
  margin: .2rem 3.5rem 0;
  font-size: 0.14rem;
  color: #ffffff;
}
.refreshBtn{
  position: absolute;
  right: 40px;
  bottom: 40px;
}
.loadTips{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
}
.submitBox{
  display: flex;
  justify-content: space-between;
  padding: 0 40px 0 20px;
}
.countBox{
  align-self: flex-end;
}
.resultWrap{
  box-sizing: border-box;
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  overflow: auto;
  padding: 40px 20px;
}
.regBox{
  line-height: 1;
  text-align: left;
}
.regBox:not(:last-child){
  padding-bottom: 50px;
}
.regBox>p{
  padding-top: 30px;
}
.star{
  display: inline-block;
  box-sizing: border-box;
  width: 40px;
  padding-right: 10px;
  text-align: right;
}
.val{
  padding-left: 10px;
}
</style>
