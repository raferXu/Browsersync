<template>
  <div class="expWrap">
    <div class="expBox">
      <div class="smallImgBox">
        <div class="smallImgList">
          <img @click="showBigImg(i)" class="smallImg" :class="{'imgActive':imgIndex==i}" v-for="(v,i) in allImgResult" v-if="allImgResult.length>0" :src="host+v['pic_with_mark']" :key="i" :alt="i">
          <img v-for="(v,i) in uploadimg" :key="i" v-if="showimg" @click="showCanvasImg(i)" :src=v class="smallImg" >
        </div>
      </div>
      <div id="imgBoxW" class="bigImgBox">
        <div v-show="showCanvas" id="canvasBox" class="bigImgBox">
          <Pic v-if="showCanvas" ref='pic' :canvasHeight='canvasHeight' :imgFlag='imgFlag' :originImg='originImg' :index="index" :canvasWidth="canvasWidth" ></Pic>
        </div>
        <div v-show="!showCanvas" id="imgBox" class="bigImgBox" ref="bigImgBox">
          <span class="bigImgSpan" ref="bigImgSpan">
            <img v-show="tryObj.bigImg" class="bigImg" ref="bigImg" :src="tryObj.bigImg" alt="bigImg">
          </span>
        </div>
      </div>
      
      <div class="infoBox" :style="infoBoxStyle">
        <div class="loadingBox" v-if="item.step==1">
          <p class="loadTips">众包录入中，请稍后查看结果。</p>
          <span class="mainBtn refreshBtn" @click="refreshFn">刷新</span>
        </div>
        <div class="initWrap" v-if="item.step==0">
          <div class="infoTitleBox">
            <span class="infoTitle">请在图片中框选需要众包录入的字段内容。</span>
          </div>
          <div class="resultBox"></div>
          <div class="submitBox">
            <span class="mainBtn" @click="submitToCheck">确认提交</span>
          </div>
        </div>
        <div class="loadingBox resultWrap" v-if="item.step==2">
          <div class="regBox">
            <h4>众包录入结果</h4>
            <p v-for="(v,i) in item['zb_result']" :key="i">
              <span class="star"></span>
              <span class="val">{{v}}</span>
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
import baseUrl from '../Global'
console.log('baseUrl: '+baseUrl.BASE_URL);
console.log(baseUrl.BASE_URL);
export default {
  name: '',
  data () {
    return {
      host: baseUrl.BASE_URL,
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
      canvasWidth:610,
      canvasHeight:390,
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
        showImgArr: [],
        bigImg: ''
      },
      list: [],
      item: {}
    }
  },
  created(){
    console.log('scrollTo');
    window.scrollTo(0,0)
    var _this = this;
    this.axios({
        url:'/token/experience_results/zb',
        method:'post',
        data:''
      }).then(function(res){
        /*
        {
          "pic_with_mark": "/token/img/5395350e052a3ccef710a316031095aa", 
          "task_infos": [
            {
              "zb_result": "NotClear", 
              "square": [140, 86, 194, 157], 
              "task_id": 588
            }, 
            {
              "zb_result": "NotClear", 
              "square": [366, 160, 439, 214], 
              "task_id": 589
            }
          ]
        }
        */
        var s = res.data.body.res;
        _this.allImgResult = s;
        _this.showCanvas = false;
        if(s.length>0){
          _this.tryObj.bigImg = _this.host+s[0]["pic_with_mark"];
          for(var i=0;i<s.length;i++){
            var taskInfos = s[i]['task_infos'];
            var itemObj = {
              step: 1,
              zb_result: []
            };
            var stepFlag = 0;
            for(var j=0;j<taskInfos.length;j++){
              if(taskInfos[j]["zb_result"]){
                itemObj.step = 2;
                itemObj["zb_result"].push(taskInfos[j]["zb_result"]);
              }else{
                stepFlag = 1;
              }
            }
            if(stepFlag){
              console.log('还没答案');
              itemObj.step = 1;
            }
            _this.list.push(itemObj);
            _this.item = itemObj;
          }
          console.log('list');
          
          console.log(_this.list);

        }else{
          console.log('刷新无图片纪录');
        }
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
        for(var k=0;k<s.length;k++){
          var resultObj = {
            step: 1,
            zb_result: []
          };
          var answerSum = s[k]["task_infos"].length;
          var answerCount = 0;
          for(var m=0;m<answerCount;m++){
            if(s[k]["task_infos"][m]["zb_result"]){
              answerCount++;
              resultObj["zb_result"].push(s[k]["task_infos"][m]["zb_result"]);
            }
          }
          if(answerSum==answerCount){
            console.log('全部返回');
            resultObj.step = 2;
          }
          _this.list.push(resultObj);
        }
        // for(var i = 0;i<s[s.length-1]["task_infos"].length;i++){
        //   if(!s[s.length-1]["task_infos"][i].zb_result){
        //     _this.list[s.length-1].step = 1;
        //     _this.list[s.length-1]["zb_result"] = [];
        //     console.log('答案未完成');
        //     return false;
        //   }
        //   _this.list[s.length-1]["zb_result"].push(s[s.length-1]["task_infos"][i]["zb_result"]);
        // }
        _this.list[s.length-1].step = 2;
        _this.item = _this.list[s.length-1];
        console.log('答案完成');
        console.log(_this.item);
        _this.imgResult = s[s.length-1];
      })
    },
    refreshFn(){
      console.log('刷新按钮被点击了,发起查询结果的请求');
      this.ajaxResult();
    },
    submitToCheck(){
      console.log(this.imgNum)
      // this.uploadimg[this.imgNum] = self.penal.toDataURL('image/png');
      this.viewResult()
    },
    showBigImg(i){
      this.imgIndex = i;
      console.log('showBigImg点击历史图片,this.imgIndex: '+this.imgIndex);
      console.log(this.list)
      this.item = this.list[i];
      this.showCanvas = false;
      this.tryObj.bigImg = this.host+this.allImgResult[i]['pic_with_mark'];
      
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
      this.showCanvas = true;
    },
    fileUpload(){
      var newItemObj = {
        step: 0,
        zb_result: []
      };
      this.list.push(newItemObj);
      this.item = newItemObj;
      console.log('this.list');
      console.log(this.list);
      var imgWrap = document.getElementById("imgBoxW");
      this.showCanvas = true;
      this.canvasWidth = imgWrap.clientWidth;
      this.canvasHeight = imgWrap.clientHeight;
      let self=this;
      this.step = 0;  
      this.originImg = [];
      this.imgFlag = 1;
      var imgBox = [];
      // this.$refs.pic.count = 1;
        var files=this.$refs.fileInput.files
        for(let i=0,len=files.length;i<len;i++){
            if (window.FileReader) {    
                var reader = new FileReader();    
                //监听文件读取结束后事件    
                reader.onloadend = function (e) {
                  console.log(self.$refs.pic);
                    var image = new Image();
                    image.src = e.target.result;
                    self.uploadimg.push(e.target.result) ;
                    self.showimg = true;
                    image.onload = function() {
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
                    self.deleteX();
                    self.$refs.pic.drawImage(self.files[self.files.length-1].src,0,0,self.canvasWidth,self.canvasHeight);
                    self.imgNum = self.files.length-1;
                    self.uploadimg[self.imgNum] = self.files[self.files.length-1].src;
                    console.log(self.$refs.pic);
                };    
                reader.readAsDataURL(files[i]);    
            } 
        }
        console.log(this.canvasWidth);
        console.log(this.$refs.pic);
        let formdata = new FormData();
        for(let i=0;i<files.length;i++){
            formdata.append('files',files[i]);  
        }
        this.params=formdata
        this.axios({
            url:"/token/upload_files",
            data:this.params,
            method:'post'
        }).then(function(res){
            console.log(self.canvasWidth);
            console.log(self.$refs.pic);
            let data = res.data.body
             console.log(data.url_list);
             self.imageMessage.pic_urls = data.url_list;
        })
        console.log(this.$refs.pic);
        // this.$refs.pic.allPaintMes = {};
    },
    showCanvasImg(n){

      this.imgIndex = n;
      console.log('showCanvasImg点击历史图片,this.imgIndex: '+this.imgIndex);
      console.log(this.list)
      this.item = this.list[n];
      this.tryObj.bigImg = this.host+this.allImgResult[n]['pic_with_mark'];

      this.showCanvas = true;
      this.imgNum = n;
      var x = document.getElementsByClassName("close_x");
      for(var i = 0;i<x.length;i++){
          x[i].style.display = "none";
      }
      var x2 = document.getElementsByClassName("close_x_"+i);
      for(var j = 0;j<x2.length;j++){
          x2[j].style.display = "block";
      }
      this.$refs.pic.drawImage(this.uploadimg[n],0,0,this.canvasWidth,this.canvasHeight);
    },
    deleteX(){
      var x = document.getElementsByClassName("close_x");
      var canvas_con = document.getElementById("canvas_con");
      var len = x.length;
      for(var i = len-1;i>=0;i--){
        canvas_con.removeChild(x[i]);
      }
    },
    viewResult(){
      let _this = this;
      this.imageMessage.location = this.$refs.pic.allPaintMes;
      this.paintLength = this.imageMessage.location.length;
      this.axios({
            url:"/token/add_experience_task",
            data:this.imageMessage,
            method:'post'
        }).then(function(res){
            let data = res.data;
             console.log(res);
             console.log(res.data);
             if(data.code == 200){
               _this.list[_this.list.length-1].step = 1;
               _this.item.step=1;
             }
        })
    }
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
    var imgWrap = document.getElementById("imgBoxW");
    this.canvasWidth = imgWrap.clientWidth;
    this.canvasHeight = imgWrap.clientHeight;
    // this.showCanvas = true;
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
