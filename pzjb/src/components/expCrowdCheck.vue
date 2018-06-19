<template>
  <div class="expWrap">
    <div class="expBox">
      <div class="smallImgBox">
        <div class="smallImgList">
          <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
        </div>
      </div>
      <div class="bigImgBox" ref="bigImgBox">
        <exp-canvas :hasClickSubmit="hasClickSubmit" @getCanvasImg="getCanvasImg" :rectData="rectData" :src="tryObj.bigImg"></exp-canvas>
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
            <span class="techBtn" @click="submitToCheck">确认提交</span>
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
    <div class="tipsWrap">
      <div class="tipsBox tl">提示: 支持上传大小不超过3M的PNG、JPG、JPEG、BMP身份证图片进行体验。</div>
      <div class="expBtnG">
        <span @click="canUploadFn" class="uploadBtn btnG">
          图片上传
          <input v-show="canUploadFlag" accept="image/bmp,image/jpeg,image/jpg,image/png" ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {common} from '../assets/js/common'
import baseUrl from '../Global'
console.log('baseUrl: '+baseUrl.BASE_URL);
import expCanvas from './expCanvas'
export default {
  name: '',
  components: {
    expCanvas
  },
  watch: {
    checkedNames(){ //多选框改变时改变rectData，从而通知canvas重新绘制
      console.log('checkedNames change');
      this.rectData.checkedNames = this.checkedNames
      this.rectData.example = this.example
    }
  },
  data () {
    return {
      rectData: {
        checkedNames: [],
        example: {}
      },
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
    getCanvasImg(src){  //将已提交的画框图片插入小图列表
      console.log('parent getcanvasImg src')
      console.log(src)
      this.tryObj.showImgArr[this.tryObj.showImgArr.length-1] = src;
    },
    init(nowIndex){  //构造初始化时的已有图片的数据占位符
      var _this = this;
      console.log('初始化页面');
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
    },
    checkExperienceResult(){  //请求查询结果列表
      var _this = this;
      return _this.axios({
        url: '/token/experience_results/ocr',
        method: 'post'
      });
    },
    handleOcrResult(data,nowIndex,flag){  //对请求结果列表的处理
      var _this = this;
      _this.ocrResultArr = data.body.res;
        if(_this.ocrResultArr.length>0){
          console.log('ocrResultArr有数据');
          _this.ocrResult = data.body.res[nowIndex];
          if(flag==1){  //页面初始化
            _this.init(nowIndex);
          }else{
            console.log('图片上传');
          }
          _this.checkAppResult(nowIndex);
        }else{
          console.log('返回的ocrResultArr为空数组,新用户初始化状态');
        }
    },
    getAppAnswer(flag){  //获取结果列表
      var _this = this;
      var nowIndex = this.imgIndex;
      _this.checkExperienceResult().then(function (response) {
        console.log(response)
        var data = response.data;
        if(data.code==200){
          _this.handleOcrResult(data,nowIndex,flag)
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
    checkAppResult(nowIndex){  //根据查询app结果判断结果是否已返回
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
    showBigImg(i){  //点击小图显示大图
      var nowIndex = i;
      if(i!=this.tryObj.showImgArr.length){
        this.checkedNames = []
      }
      this.imgIndex = nowIndex;
      this.others = this.othersList[nowIndex];
      this.ocrResult = this.ocrResultArr[nowIndex];
      this.checkAppResult(nowIndex);
      this.tryObj.bigImg = this.tryObj.showImgArr[nowIndex];
      this.others.step = this.othersList[nowIndex].step;
      this.example = this.exampleRes[nowIndex];
    },
    axiosOcrTest(data){
      var _this = this;
      return _this.axios({
        url: 'https://test-pazb.pingan.com.cn:20443/alg/ocr_chanxian_test/id_test_inner',
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    showOcrTestResult(response,fileName,nowOcrImgIndex){
      console.log(response);
      var _this = this;
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
    },
    setAxiosOcrTestData(obj,fileName){
      let data = new FormData();
      data.append('file', obj);
      data.append('text', JSON.stringify({"0":""+fileName}));
      return data;
    },
    ocrFn(obj,fileName){
      var _this = this;
      var nowOcrImgIndex = _this.imgIndex;
      let data = _this.setAxiosOcrTestData(obj,fileName);
      _this.axiosOcrTest(data).then(function (response) {
        if(response.status==200){
          _this.showOcrTestResult(response,fileName,nowOcrImgIndex)
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
    canUploadFn(){
      if(!this.canUploadFlag){
        alert('请先勾选已有图片字段信息')
        return;
      }
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
    },
    axiosUploadFiles(formdata){
      var _this = this;
      return _this.axios({
          url:"/token/upload_files",
          data:formdata,
          method:'post'
      })
    },
    showUploadFilesResult(resData,nowImgIndex){
      var _this = this;
      _this.others.uploadFlag = true;
      _this.othersList[nowImgIndex].uploadFlag = true;
      _this.others["pic_url"] = resData.body["url_list"][0];
      _this.othersList[nowImgIndex]["pic_url"] = resData.body["url_list"][0];
    },
    upload_files(obj){
      var _this = this;
      var nowImgIndex = _this.imgIndex;
      let formdata = new FormData();
      formdata.append('files',obj);
      _this.axiosUploadFiles(formdata).then(function(res){
          console.log(res);
          if(res.status==200){
            var resData = res.data;
            if(resData.code==200){
              _this.showUploadFilesResult(resData,nowImgIndex)
            }else{
              console.log('upload_files data.code: '+resData.code);
              _this.others.uploadFlag = false;
              _this.othersList[nowImgIndex].uploadFlag = false;
              alert('网络异常，请刷新页面');
              common.refresh(_this);
            }
          }else{
            console.log('upload_files res.status: '+res.status);
            _this.others.uploadFlag = false;
            _this.othersList[nowImgIndex].uploadFlag = false;
            alert('网络异常，请刷新页面');
            common.refresh(_this);
          }
      }); 
    },
    canSubmitFn(){
      if(this.hasClickSubmit){
        console.log('确认提交按钮被点击,请求提交未返回');
        return;
      }
      this.hasClickSubmit = true;
    },
    isNotWrongBeforeSubmit(){
      if(!this.others.coordinateFlag||!this.others.uploadFlag){
        console.log('坐标没拿到或者文件上传失败');
        alert('网络异常，请刷新页面');
        return;
      }
    },
    isIdCard(nowIndex){
      if(this.exampleRes[nowIndex]['ID_HaoMa']['score']=='666'){
        console.log('算法接口返回空，上传的不是身份证');
        alert('请上传身份证图片');
        this.hasClickSubmit = false;
        return;
      }
    },
    setAxiosAddZbTaskData(nowIndex){
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
    },
    axiosAddZbTask(){
      var _this = this;
      return this.axios({
        url: '/token/add_orc_zb_task',
        method: 'post',
        data: _this.task
      })
    },
    submitToCheck(){
      var nowIndex = this.imgIndex;
      console.log('submitToCheck确认提交按钮被点击了 '+this.hasClickSubmit);
      this.canSubmitFn()
      this.isNotWrongBeforeSubmit()
      this.isIdCard(nowIndex)
      
      var _this = this;
      var len = this.checkedNames.length;
      if(len){
        this.setAxiosAddZbTaskData(nowIndex)

        this.axiosAddZbTask().then(function (res) {
          _this.hasClickSubmit = false;
          console.log('add_orc_zb_task res返回的状态码是： '+res.data.code);
          console.log(res);
          _this.task = {  //请求完成后重置请求参数，以便后续使用
            pic_url: '',
            task_infos:[]
          };
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
  computed: {
    canUploadFlag(){  //根据已有图片是否已提交来判断可否上传
      return this.othersList[this.othersList.length-1].step ? true : false;
    }
  },
  mounted(){
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
/* .bigImgSpan{
  position: relative;
  display: inline-block;
} */
/* .bigImg{
  width: 416px;
  background: #f0f0f0;
} */
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
  font-size: 18px;
  color: #0090ff;
}
.infoTitle:hover, .bdb{
  /* color: white; */
  cursor: pointer;
}
.infoTitle:not(:last-child){
  margin-right: 54px;
}
.resultBox{
  box-sizing: border-box;
  position: relative;
  height: 236px;
  padding: 20px 20px 0;
  overflow: auto;
  text-align: left;
  line-height: 2;
  font-size: 18px;
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
  font-size: 18px;
  z-index: 1;
}
.loadingBox2{
  line-height: 392px;
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
  padding: 20px 20px;
}
.regBox{
  line-height: 1;
  text-align: left;
}
.regBox:not(:last-child){
  padding-bottom: 40px;
}
.regBox>p{
  padding-top: 20px;
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
