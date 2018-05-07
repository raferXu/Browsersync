<template>
  <div class="tryBox">
    <h3 class="tryTitle">{{tryObj.title}}</h3>
    <div class="mainBox">
      <div class="showBox">
        <div class="imgBox" id="imgBox" >
          <div class="bigImgBox" id="bigImgBox">
            <img class="bigImg" :src="tryObj.bigImg" alt="bigImg">
            <img v-show="checkedNames.indexOf('id')>-1" class="rectImg" :src="tryObj.rectImg1" alt="rectImg">
            <img v-show="checkedNames.indexOf('name')>-1" class="rectImg" :src="tryObj.rectImg2" alt="rectImg"> 
          </div>
          <div v-if="showCanvas==true" id="canvasBox" style="display:none;" class="bigImgBox">
            <Pic ref='pic' :canvasHeight='canvasHeight' :imgFlag='imgFlag' :originImg='originImg' :index="index" :canvasWidth="canvasWidth" ></Pic>
          </div>
          <div class="smallImgBox">
            <!-- :class="{'imgActive':imgIndex==i}" -->
            <img @click="showBigImg(i)" class="smallImg"  v-for="(v,i) in tryObj.showImgArr" :src="v" :key="i" :alt="i">
            <img v-if="showimg==true" @click="showCanvasImg" :src='uploadimg' class="smallImg" >
          </div>
        </div>
        <div id="infoBox1" class="infoBox">
          <div class="infoBoxMes">请在图片中框选需要校验的字段</div>
        </div>
        <div id="infoBox" class="infoBox">
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
            <!-- <div class="imgUrlBox">
              <input class="urlInput" type="text" placeholder="网络图片URL" v-model="imgUrl">
              <span class="urlBtn" style="cursor:pointer;" @click="upload">选择图片</span>
            </div>
            <span class="orTxt">或</span> -->
            <div class="localUploadBox">
              <input class="urlBtn" type="button" style="cursor:pointer;" value="本地上传">
              <input ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
            </div>
          </div>
          <div class="imgTips">提示: 支持识别大小不超过3M，长边不超过800像素的png、jpg、jpeg、bmp图片。</div>
          <div class="tryCountBox">剩余体验次数 <span class="tryCount">{{tryCount}}</span> 次</div>
        </div>
        <div class="checkWrap">
          <div class="checkTxtBox">校验次数：3次 (实际使用时可以设置>3次校验)</div>
          <div class="urlBtn checkBtn" @click='deleteX' >确定</div>
        </div>
      </div>
      <div class="urlBtn resutBtn " @click="viewResult">查看结果</div>
    </div>
  </div>
</template>

<script>
import Pic from '@/components/onlineCanvas.vue'
export default {
  components:{
      Pic
  },
  name: '',
  data () {
    return {
      uploadimg:'',
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
          // require('../assets/images/身份证识别体验.png'),
          // require('../assets/images/身份证识别体验.png'),
          // require('../assets/images/身份证识别体验.png'),
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
        }
      ]
    }
  },
  mounted(){
    var imgBox = document.getElementById("imgBox");
    var bigImgBox = document.getElementById("bigImgBox");
    this.canvasWidth = imgBox.clientWidth;
    this.canvasHeight = bigImgBox.clientHeight;
    console.log(this.canvasWidth+"+++"+this.canvasHeight);
    this.showCanvas = true;
  },
  methods: {
    showBigImg(i){
      this.show = false;
      this.imgIndex = i;
      this.example = this.exampleRes[i];
      this.tryObj.bigImg = this.tryObj.showImgArr[i];
      // console.log(this.tryObj.showImgArr[i])
      var bigImgBox = document.getElementById("bigImgBox");
      var canvasBox = document.getElementById("canvasBox");
      bigImgBox.style.cssText = "display:block;";
      canvasBox.style.cssText = "display:none;"
      var infoBox1 = document.getElementById("infoBox1");
        var infoBox = document.getElementById("infoBox");
        infoBox.style.cssText="display:block;";
        infoBox1.style.cssText = "display:none";
        this.uploadimg = self.penal.toDataURL('image/png');
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
      var bigImgBox = document.getElementById("bigImgBox");
      canvasBox.style.cssText = "display:block;";
      bigImgBox.style.cssText = "display:none;";
    },
    fileUpload(){
      let self=this  
      this.files = [];
      this.originImg = [];
      this.imgFlag = 1;
      var imgBox = [];
      this.$refs.pic.allPaintMes = {};
      this.$refs.pic.count = 1;
        //   console.log(this.$refs.upload.files[0])
        let files=this.$refs.fileInput.files
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
                    self.uploadimg = e.target.result;
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
                    self.imageMessage.size = imgBox;
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
                    self.$refs.pic.drawImage(self.files[0].src,0,0,self.canvasWidth,self.canvasHeight);
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
            url:"https://test-pazb.pingan.com.cn:20443/bss/token/upload_files",
            data:this.params,
            method:'post'
        }).then(function(res){
            let data = res.data.body
             console.log(data.url_list);
             self.imageMessage.picture_url = data.url_list;
        })
        var bigImgBox = document.getElementById("bigImgBox");
        var canvasBox = document.getElementById("canvasBox");
        canvasBox.style.cssText = "display:block;"
        bigImgBox.style.cssText = "display:none;";
        // self.$refs.pic.drawImage(this.files[0].src);
        var infoBox1 = document.getElementById("infoBox1");
        var infoBox = document.getElementById("infoBox");
        infoBox.style.cssText="display:none;";
        infoBox1.style.cssText = "display:block";
    },
    showCanvasImg(){
      var bigImgBox = document.getElementById("bigImgBox");
      var canvasBox = document.getElementById("canvasBox");
        canvasBox.style.cssText = "display:block;"
        bigImgBox.style.cssText = "display:none;";
      this.$refs.pic.drawImage(this.uploadimg,0,0,this.canvasWidth,this.canvasHeight);
       var infoBox1 = document.getElementById("infoBox1");
        var infoBox = document.getElementById("infoBox");
        infoBox.style.cssText="display:none;";
        infoBox1.style.cssText = "display:block";
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
      this.uploadimg = self.penal.toDataURL('image/png');
      console.log(this.imageMessage);
      this.axios({
            // url:'https://test-pazb.pingan.com.cn:20443/token/public/zb_experience',
            url:"https://test-pazb.pingan.com.cn:20443/bss/token/public/zb_experience",
            // url:"http://30.4.88.47:8080/token/public/zb_experience",
            // url:"http://192.168.0.203:5000/token/payment/balance",
            data:this.imageMessage,
            method:'post'
        }).then(function(res){
            let data = res.data.body
             console.log(res);
             alert(res.data);
            //  _this.$router.push({path:"/zbExpResult"});
        })
      // this.$router.push({path:"/zbExpResult"});
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
  position: relative;
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
  /* justify-content: space-between; */
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
.resutBtn{
  float:right;
  cursor: pointer;;
}
#infoBox1{
  display: none;
}
.infoBoxMes{
      box-sizing: border-box;
    height: 0.54rem;
    line-height: 0.54rem;
    font-size: 0.24rem;
    font-weight: bold;
    color: #0090ff;
}
</style>
