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
        <div class="loadingBox" v-show="step==1">
          <p class="loadTips">众包校验中，请稍后查看结果。<br/>等待期间，欢迎<a target="_blank" style="color:#0090ff;text-decoration:underline" href="https://pazb.pingan.com.cn/static/h5/invite/doTask1sn.html">点此</a>体验平安众包APP。</p>
          <span class="mainBtn refreshBtn">刷新</span>
        </div>
        <div class="initWrap" v-show="step==0">
          <div class="infoTitleBox">
            <span class="infoTitle">识别结果 (请勾选需要进行众包校验的字段信息)</span>
          </div>
          <div class="resultBox">
            <div class="nameBox">
              <input type="checkbox" id="ID_XingMing" value="ID_XingMing" v-model="checkedNames" style="-webkit-appearance:checkbox">
              <span class="key">姓名: </span>
              <span class="val" v-show="example.ID_XingMing">{{example.ID_XingMing.text}}</span>
            </div>
            <div class="idBox">
              <input type="checkbox" id="ID_HaoMa" value="ID_HaoMa" v-model="checkedNames" style="-webkit-appearance:checkbox">
              <span class="key">身份证: </span>
              <span class="val" v-show="example.ID_HaoMa">{{example.ID_HaoMa.text}}</span>
            </div>
          </div>
          <div class="submitBox">
            <span class="countBox">剩余体验次数 {{count}} 次</span>
            <span class="mainBtn" @click="submitToCheck">确认提交</span>
          </div>
        </div>
        <div class="loadingBox resultWrap" v-show="step==2">
          <div class="regBox ocrRegBox">
            <h4>OCR识别结果</h4>
            <p>
              <span class="star">*</span>
              <span class="label">姓名: </span>
              <span class="val">rx</span>
            </p>
            <p>
              <span class="star">*</span>
              <span class="label">姓名: </span>
              <span class="val">rx</span>
            </p>
          </div>
          <div class="regBox crowdsRegBox">
            <h4>众包识别结果</h4>
            <p>
              <span class="star">*</span>
              <span class="label">姓名: </span>
              <span class="val">rx</span>
            </p>
            <p>
              <span class="star">*</span>
              <span class="label">姓名: </span>
              <span class="val">rx</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="tipsBox tl">提示: 支持上传大小不超过3M的PNG、JPG、JPEG、BMP身份证图片进行体验。</div>
    <div class="expBtnG pb160">
        <span class="mainBtn btnG">
          本地上传
          <input ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
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
      step: 0,
      imgUrl: '',
      nowTable: 'result',
      imgIndex: 0,
      tryObj: {
        showImgArr: [
          require('../assets/images/2401523603122_hd.png')
        ],
        bigImg: require('../assets/images/2401523603122_hd.png')
      },
      others: [
        {
          pic_url: "/token/img/d49725319d50647df38c6cf093c05acc",
          step: 0
        }
      ],
      example: {
        "ID_HaoMa": {
          "score": "0.529698036078", 
          "text": "310228199601115411", 
          "xmax": "391.0", 
          "xmin": "140.0", 
          "ymax": "259.546020508", 
          "ymin": "235.665283203"
        }, 
        "ID_XingMing": {
          "score": "0.470644197621", 
          "text": "章鱼", 
          "xmax": "130.0", 
          "xmin": "72.0", 
          "ymax": "60.0203361511", 
          "ymin": "34.2139263153"
        }, 
        "frame": {
          "rot_angle": 0, 
          "score": "0.978264", 
          "text": "身份证", 
          "type": "ID_Kuang_1", 
          "xmax": "435", 
          "xmin": "0", 
          "ymax": "268", 
          "ymin": "9"
        }
      },
      exampleRes: [
        {
          "ID_HaoMa": {
            "score": "0.529698036078", 
            "text": "310228199601115411", 
            "xmax": "391.0", 
            "xmin": "140.0", 
            "ymax": "259.546020508", 
            "ymin": "235.665283203"
          }, 
          "ID_XingMing": {
            "score": "0.470644197621", 
            "text": "章鱼", 
            "xmax": "130.0", 
            "xmin": "72.0", 
            "ymax": "60.0203361511", 
            "ymin": "34.2139263153"
          }, 
          "frame": {
            "rot_angle": 0, 
            "score": "0.978264", 
            "text": "身份证", 
            "type": "ID_Kuang_1", 
            "xmax": "435", 
            "xmin": "0", 
            "ymax": "268", 
            "ymin": "9"
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
      this.step = this.others[this.imgIndex].step;
    },
    fileUpload(e){
      var initLen = this.tryObj.showImgArr.length;
      this.imgIndex = initLen;
      var _this = this;
      var obj = _this.$refs.fileInput.files[0];
      var fileName = obj.name;

      this.upload_files(obj);
      this.handleImg(obj);

      
      

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
          var data = response.data;
          console.log(data);
          _this.exampleRes.push(data[fileName][0]['info']);
          _this.example = data[fileName][0]['info'];
        }else{
          console.log('response.status: '+response.status)
        }
      })
      .catch(function (error) {
        console.log('error');
        console.log(error);
      });
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
              var obj = {
                pic_url: resData.body.url_list[0],
                step: 0
              }
              _this.others.push(obj);
            }else{
              console.log('data.code: '+resData.code);
              _this.others.push({
                pic_url: '',
                step: 0
              });
            }
          }else{
            console.log('res.status: '+res.status);
            _this.others.push({
              pic_url: '',
              step: 0
            });
          }
      }); 
    },
    submitToCheck(){
      var _this = this;
      var len = this.checkedNames.length;
      if(len){
        this.step = 1;
        console.log(this.checkedNames);
        console.log('this.imgIndex: '+this.imgIndex);
        for(var i=0;i<this.checkedNames.length;i++){
          var obj = {};
          obj.type = this.checkedNames[i];
          var info = this.exampleRes[this.imgIndex][this.checkedNames[i]];
          obj['alg_answer'] = info['text'];
          obj['square'] = [info['xmin'],info['ymin'],info['xmax'],info['ymax']];
          this.task.task_infos.push(obj);
        }
        // setTimeout(() => {
        //   this.loading = false;
        //   this.loadSuc = true;
        // }, 2000);
        
        this.task.pic_url = this.others[this.imgIndex].pic_url;
        this.others[this.imgIndex].step = 1;
        console.log('this.others');
        console.log(this.others);
        console.log('this.task');
        console.log(this.task);

        this.axios({
          url: '/token/add_orc_zb_task',
          method: 'post',
          data: _this.task
        }).then(function (res) {
          console.log('add_orc_zb_task res');
          console.log(res);
        }).catch(function (error) {
          console.log('error');
          console.log(error);
        })

      }else{
        alert('请选择字段');
      }
    }
  },
  mounted () {
    var _this = this;
    this.axios.interceptors.request.use(function(config){
      console.log("request init.");
      return config;
    });
    this.axios.interceptors.response.use(function(response){
      console.log("response init.");
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
  padding-top: 167px;
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
  overflow: scroll;
  margin-right: 10px;
  font-size:0;
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
  border-color: transparent;
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
.tipsBox{
  transform-origin: left top;
  transform: scale(0.7);
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
.regBox>p:nth-of-type(1){
  padding: 30px 0;
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
