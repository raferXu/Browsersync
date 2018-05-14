<template>
  <div class="expWrap">
    <div class="expBox">
      <div class="smallImgBox">
        <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
        <img v-for="(v,i) in uploadimg" :key="i" v-if="showimg==true" @click="showCanvasImg(i)" :src=v class="smallImg" >
      </div>
      <div id="imgBox" class="bigImgBox" ref="bigImgBox">
        <span class="bigImgSpan" ref="bigImgSpan">
          <img v-show="tryObj.bigImg" class="bigImg" ref="bigImg" :src="tryObj.bigImg" alt="bigImg">
        </span>
        <!-- <div class="uploadimgIconWrap" v-else>
          <span class="uploadimgIconBox">
            <img class="uploadimgIcon" :src="uploadimgIcon" alt="uploadimgIcon"><br>
            <i>请上传图片进行体验</i>
            <input ref="fileInput1" class="fileUploadBtn1" type="file" @change="fileUpload(1)">
          </span>
        </div> -->
      </div>
      <div v-if="showCanvas==true" id="canvasBox" style="display:none;" class="bigImgBox">
        <Pic ref='pic' :canvasHeight='canvasHeight' :imgFlag='imgFlag' :originImg='originImg' :index="index" :canvasWidth="canvasWidth" ></Pic>
      </div>
      
      <div class="infoBox" :style="infoBoxStyle">
        <div class="loadingBox" v-show="step==1">
          <p class="loadTips">众包录入中，请稍后查看结果。
            <!-- <br/>等待期间，欢迎<a target="_blank" style="color:#0090ff;text-decoration:underline" href="https://pazb.pingan.com.cn/static/h5/invite/doTask1sn.html">点此</a>体验平安众包APP。 -->
            </p>
          <span class="mainBtn refreshBtn" @click="refreshFn">刷新</span>
        </div>
        <div class="initWrap" v-show="step==0">
          <div class="infoTitleBox">
            <span class="infoTitle">请在图片中框选需要众包录入的字段内容，不超过5个。</span>
          </div>
          <div class="resultBox">
            
          </div>
          <div class="submitBox">
            <span class="countBox">剩余体验次数 {{count}} 次</span>
            <span class="mainBtn" @click="submitToCheck">确认提交</span>
          </div>
        </div>
        <div class="loadingBox resultWrap" v-show="step==2">
          <div class="regBox">
            <h4>众包录入结果</h4>
            <!-- <p>
              <span class="star"></span>
              <span class="label">1: </span>
              <span class="val">xxxxxx</span>
            </p> -->
            <p v-for="(v,i) in imgResult.task_infos" >
              <span class="star"></span>
              <span class="label">{{i+1}}: </span>
              <span class="val">{{v.zb_result}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="tipsBox tl">提示: 支持上传大小不超过3M的PNG、JPG、JPEG、BMP任意图片进行体验。</div>
    <div class="expBtnG pb160">
        <span class="mainBtn btnG">
          本地上传
          <input ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
        </span>
      </div>
  </div>
</template>

<script>
import Pic from '@/components/onlineCanvas.vue'

export default {
  name: '',
  data () {
    return {
      paintLength:0,
      allImgResult:[],
      imgResult:[],
      imgNum:0,
      count: 5,
      step: -1,
      uploadimgIcon: require('../assets/images/上传图片.png'),
      uploadimg:[],
      showimg:false,
      showCanvas:false,
      params:{},
      imageMessage:{},
      imgFlag:0,
      index:0,
      originImg:[],
      files:[],
      canvasWidth:400,
      canvasHeight:191,
      tryCount: 5,
      infoBoxStyle: {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../assets/images/识别结果框2.png') + ')' 
      },
      responseTxt: '',
      loading: false,
      imgUrl: '',
      nowTable: 'result',
      imgIndex: 0,
      tryObj: {
        showImgArr: [
          // require('../assets/images/2371523602521hd.png'),
          // require('../assets/images/2411523603123_hd.png')
        ],
        bigImg: ''
      },
      example: {
        result: {}
      },
      exampleRes: [
        // {
        //   result: {
        //     name: '小静',
        //     id: '370782198709170246'
        //   }
        // },
        // {
        //   result: {
        //     name: '小贴贴',
        //     id: '652901196611026716'
        //   }
        // }
      ]
    }
  },
  create(){
    this.axios({
        url:'/token/experience_results/zb',
        method:'post',
        data:''
      }).then(function(res){
        
        var s = res.data.body.res;
        this.allImgResult = s;
      })
  },
  methods: {
    ajaxResult(){
      let _this = this;
      this.axios({
        url:'/token/experience_results/zb',
        method:'post',
        data:''
      }).then(function(res){
        
        var s = res.data.body.res;
        _this.allImgResult = s;
        console.log(s[s.length-1]);
        for(var i = 0;i<s[s.length-1].task_infos.length;i++){
          console.log(s[s.length-1].task_infos[i].zb_result)
          if(!s[s.length-1].task_infos[i].zb_result){
            alert('我没跳')
            return false;
          }
        }
        _this.imgResult = s[s.length-1];
        _this.step = 2;
        // if(_this.paintLength == res[1].length){
        //   _this.imgResult = res[res.length-1];
        //   _this.step = 2;
        // }else{
        //   return false;
        // }
        
      })
    },
    refreshFn(){
      console.log('刷新按钮被点击了,发起查询结果的请求');
      this.ajaxResult();
      // var hasResult = true;
      // if(hasResult){
      //   this.step = 2;
      // }

    },
    submitToCheck(){
      console.log(this.imgNum)
      
      // var bigImgBox = document.getElementById("imgBox");
      // var canvasBox = document.getElementById("canvasBox");
      // bigImgBox.style.cssText = "display:none;";
      // // canvasBox.style.cssText = "display:none;";
      this.uploadimg[this.imgNum] = self.penal.toDataURL('image/png');
      this.viewResult()
      
    },
    showBigImg(i){
      
      this.show = false;
      this.imgIndex = i;
      this.example = this.exampleRes[i];
      this.tryObj.bigImg = this.tryObj.showImgArr[i];
      // console.log(this.tryObj.showImgArr[i])
      
    },
    upload(){
      if(this.imgUrl == ''){
        return false;
      }
      console.log(this.imgUrl)
      this.originImg  = [];
      this.originImg.push({
        src:this.imgUrl,
        name:'name'
      })
      this.imgFlag = 0;
      this.deleteX();
      this.$refs.pic.drawImage(this.imgUrl);
      var canvasBox = document.getElementById("canvasBox");
      var bigImgBox = document.getElementById("imgBox");
      canvasBox.style.cssText = "display:block;";
      bigImgBox.style.cssText = "display:none;";
    },
    fileUpload(){
      var bigImgBox = document.getElementById("imgBox");
      bigImgBox.style.cssText = "display:block;";
      let self=this;
      this.step = 0;  
      // this.files = [];
      this.originImg = [];
      this.imgFlag = 1;
      var imgBox = [];
      // this.$refs.pic.allPaintMes = {};
      this.$refs.pic.count = 1;
        //   console.log(this.$refs.upload.files[0])
        // if(i==1){
        //   var files=this.$refs.fileInput1.files
        // }else{
          var files=this.$refs.fileInput.files
        // }
        
        for(let i=0,len=files.length;i<len;i++){
            if (window.FileReader) {    
                var reader = new FileReader();    
                    
                    //监听文件读取结束后事件    
                reader.onloadend = function (e) {
                    // $(".img").attr("src",e.target.result);    //e.target.result就是最后的路径地址
                    // console.log(files[i].name)
                    // console.log(e.target.result)
                    var image = new Image();
                    image.src = e.target.result;
                    self.uploadimg.push(e.target.result) ;
                    // console.log(self.uploadimg)
                    self.showimg = true;
                    image.onload = function() {
                    　　//alert("图片的宽度为"+this.width+",长度为"+this.height);
                      // self.imageMessage.size = {
                      //   width:this.width,
                      //   height:this.height
                      // }
                      imgBox.push({
                        width:self.canvasWidth,
                        height:self.canvasHeight
                      })
                    };
                    self.imageMessage.given_size = imgBox;
                    self.files.push({
                        src:e.target.result,
                        name:files[i].name    
                    })
                    self.originImg.push({
                        src:e.target.result,
                        name:files[i].name   
                    })
                    // console.log(self.files[0].src)
                    self.deleteX();
                    self.$refs.pic.drawImage(self.files[self.files.length-1].src,0,0,self.canvasWidth,self.canvasHeight);
                    console.log("self.files.length-1="+(self.files.length-1));
                    self.imgNum = self.files.length-1;
                    // self.showCanvasImg(self.files.length-1);
                    self.uploadimg[self.imgNum] = self.files[self.files.length-1].src;
                
                };    
                reader.readAsDataURL(files[i]);    
            } 
            
            
            // {size={"width":1,"height":2},location=[{"x1":1,"x"}]}
        }
        let formdata = new FormData();
        for(let i=0;i<files.length;i++){
            formdata.append('files',files[i]);  
        }
        this.params=formdata
        this.axios({
            // url:"http://30.4.88.47:8080/token/upload_files",
            // url:'https://test-pazb.pingan.com.cn:20443/token/upload_files',
            url:"/token/upload_files",
            data:this.params,
            method:'post'
        }).then(function(res){
            let data = res.data.body
             console.log(data.url_list);
             self.imageMessage.pic_urls = data.url_list;
        })
        var bigImgBox = document.getElementById("imgBox");
        var canvasBox = document.getElementById("canvasBox");
        canvasBox.style.cssText = "display:block;"
        bigImgBox.style.cssText = "display:none;";
        this.$refs.pic.allPaintMes = {};
        // self.$refs.pic.drawImage(this.files[0].src);
    },
    showCanvasImg(n){
      // console.log("+++++"+this.imgNum+"++++++")
      console.log(n+"-------");
      // console.log(12345+"+++++"+i);
      this.imgNum = n;
      // console.log(this.imgNum);
      // this.uploadimg[this.imgNum] = self.penal.toDataURL('image/png');
      var x = document.getElementsByClassName("close_x");
      for(var i = 0;i<x.length;i++){
          x[i].style.display = "none";
      }
      var x2 = document.getElementsByClassName("close_x_"+i);
      for(var j = 0;j<x2.length;j++){
          x2[j].style.display = "block";
      }
      // console.log('showCanvasImg');
      var bigImgBox = document.getElementById("imgBox");
      var canvasBox = document.getElementById("canvasBox");
        canvasBox.style.cssText = "display:block;"
        bigImgBox.style.cssText = "display:none;";
      console.log(this.uploadimg);
      
      this.$refs.pic.drawImage(this.uploadimg[n],0,0,this.canvasWidth,this.canvasHeight);
    },
    deleteX(){
      var x = document.getElementsByClassName("close_x");
      var canvas_con = document.getElementById("canvas_con");
      // console.log(x);
      // console.log(x.length);
      var len = x.length;
      for(var i = len-1;i>=0;i--){
        canvas_con.removeChild(x[i]);
      }
    },
    viewResult(){
      let _this = this;
      this.imageMessage.location = this.$refs.pic.allPaintMes;
      this.paintLength = this.imageMessage.location.length;
      // this.uploadimg = self.penal.toDataURL('image/png');
      console.log(this.imageMessage);
      this.axios({
            // url:'https://test-pazb.pingan.com.cn:20443/token/public/zb_experience',
            // url:"https://test-pazb.pingan.com.cn:20443/bss/token/public/zb_experience",
            // url:"http://30.4.88.47:8080/token/public/zb_experience",
            // url:"http://192.168.0.203:5000/token/payment/balance",
            url:"/token/add_experience_task",
            data:this.imageMessage,
            method:'post'
        }).then(function(res){
            let data = res.data;
             console.log(res);
             console.log(res.data);
             if(data.code == 200){
               _this.step=1;
             }
            //  _this.$router.push({path:"/zbExpResult"});
        })
      // this.$router.push({path:"/zbExpResult"});
    },
    // showBigImg(i){
    //   this.imgIndex = i;
    //   this.example = this.exampleRes[i];
    //   this.tryObj.bigImg = this.tryObj.showImgArr[i];
    // },
    // fileUpload(e){
    //   this.imgIndex = 3;
    //   var _this = this;
    //   var obj = _this.$refs.fileInput.files[0];
    //   var objUrl = window.URL.createObjectURL(obj);
    //   this.tryObj.bigImg = objUrl;
    //   this.tryObj.showImgArr.splice(3,this.tryObj.showImgArr.length-3,''+objUrl);

    //   var image = new Image();   
    //   image.onload =function(){  
    //       var width = image.width;  
    //       var height = image.height;  
    //       var wrapW = _this.$refs.bigImgBox.clientWidth;
    //       var wrapH = _this.$refs.bigImgBox.clientHeight;
    //       if(width/height>wrapW/wrapH){
    //         console.log('宽占满');
    //       }else{
    //         console.log('高占满');
    //         _this.$refs.bigImgSpan.style.height = '100%';
    //         _this.$refs.bigImg.style.height = '100%';
    //         _this.$refs.bigImg.style.width = 'auto';
    //       }
    //   }  
    //   image.src = objUrl;

    //   let data = new FormData();
    //   data.append('file', obj);
    //   data.append('deviceId', 'device001');
    //   data.append('clientType', '1');
    //   data.append('appKey', '1234567890');
    //   _this.axios({
    //     url: 'https://test-pazb.pingan.com.cn:20443/alg/ocr_chanxian_test/id_test_only',
    //     method: 'post',
    //     data: data,
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   }).then(function (response) {
    //     if(response.status==200){
    //       var data = response.data;
    //       _this.responseTxt = data
    //       if(data.code==200){
    //         var info = data.info;
    //         _this.example.result = info;
    //         _this.exampleRes.splice(3,_this.exampleRes.length-3,{'result': info});
    //       }else{
    //         _this.example.result = {};
    //         _this.exampleRes.splice(3,_this.exampleRes.length-3,{'result': {}});
    //       }
    //     }else{
    //       console.log('response.status: '+response.status)
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log('error');
    //     console.log(error);
    //   });
    // }
  },
  mounted () {
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
    });

    var imgBox = document.getElementById("imgBox");
    var bigImgBox = document.getElementById("imgBox");
    this.canvasWidth = imgBox.clientWidth;
    this.canvasHeight = bigImgBox.clientHeight;
    console.log(this.canvasWidth+"+++"+this.canvasHeight);
    this.showCanvas = true;
  },
  components: {
    Pic
  }
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
.fileUploadBtn1{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
}

.bigImgBox{
  position: relative;
  width: 610px;
  height: 390px;
  overflow: hidden;
  background: #000000;
}
.canvasBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 610px;
  height: 390px;
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
  width: 140px;
  height: 390px;
  overflow: auto;
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
  line-height: 1;
  padding-left: 20px;
  padding-top: 40px;
  text-align: left;
}
.infoTitle{
  font-size: 24px;
  color: #ffffff;
}
.infoTitle:not(:last-child){
  margin-right: 40px;
}
.resultBox{
  box-sizing: border-box;
  position: relative;
  height: 236px;
  padding: 30px 40px;
  overflow-x: hidden;
  overflow-y: auto;
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
.resultWrap, .initWrap{
  box-sizing: border-box;
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  overflow: auto;
}
.resultWrap{
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
.uploadimgIconWrap{
  padding-top: 110px;
}
.uploadimgIconBox{
  position: relative;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  display: inline-block;
  overflow: hidden;
}
.uploadimgIcon{
  width: 100px;
  height: 100px;
  margin-bottom: 40px;
}
</style>
