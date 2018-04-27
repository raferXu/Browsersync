<template>
  <div class="manageIndexBox">
    <h3 class="modelTitle pageTitle">{{title}}</h3>
    <div class="contentBox">
      <h4>基本信息</h4>
      <div class="row">
        <span class="name">模板名称: <i>{{info.name}}</i></span>
        <span class="page">字段数: <i>{{info.page}}</i></span>
      </div>
      <div class="row">
        <span class="date">创建时间: <i>{{info.date}}</i></span>
        <span class="state">
          状态: 
          <i class="tipsWrap">
            <i class="stateTxt">{{statement}}></i>
            <div class="tipsBox">
              <h5 style="font-size:18px;color:#333333;">状态详情</h5>
              <p :class="{'tipsBoxDone':info.state>0,'tipsBoxDoing':info.state==0}">需求审批中</p>
              <p :class="{'tipsBoxDone':info.state>1,'tipsBoxDoing':info.state==1}">需求审批通过，请上传样本</p>
              <p :class="{'tipsBoxDone':info.state>2,'tipsBoxDoing':info.state==2}">审核样本中</p>
              <p :class="{'tipsBoxDone':info.state>3,'tipsBoxDoing':info.state==3}">样本审核通过，请缴纳训练费用</p>
              <p :class="{'tipsBoxDone':info.state>4,'tipsBoxDoing':info.state==4}">模板开发中 (7个工作日)</p>
              <p :class="{'tipsBoxDone':info.state>5,'tipsBoxDoing':info.state==5}">开发完毕，请试用</p>
            </div>
          </i>
        </span>
        <span v-if="info.fee">训练费用: <i>{{info.fee}}</i> 元</span>
      </div>
      <div class="row">
        <p class="desc">模板描述: <i>{{info.desc}}</i></p>
      </div>
      <div class="row">
        <span class="num">预计月调用次数: <i>{{info.num}}</i></span>
        <span class="month">预计调用时长: <i>{{info.month}}</i>月</span>
      </div>
      <div class="row">
        <span class="max">预计调用峰值: <i>{{info.max}}字段/小时</i></span>
        <span class="add">时效性: <i>{{info.add}}</i></span>
      </div>
    </div>
    <div class="annotationBox">
      <h5>字段标注</h5>
      <p></p>
    </div>
    <div class="uploadBox" v-if="info.state==1">
      <span><i style="color:red;">*</i> 本地上传</span>
      <i class="tipsWrap issueIcon">
        i
        <div class="tipsBox issueTips">
          <p style="font-size:18px;color:#333333;">
            请压缩上传不少于3000份清晰、具有代表性的样本文件，样本图片规格：每张图片不大于5Mb，格式可以为JPEG\PNG
          </p>
        </div>
      </i>
      <div class="proofInputBox">
        <div class="fileNameBox">{{proofFileName}}</div>
        <div class="fileInputBox">
          <input class="urlBtn" type="button" value="本地上传">
          <input ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
        </div>
      </div>
    </div>
    <div class="developedBox" v-if="info.state==5">
      <div class="developedShowBox">
        <div class="showBox show1Box"></div>
        <div class="showBox show2Box"></div>
      </div>
      <p>剩余可用次数: xx次</p>
      <p><i style="color: red;">*</i> 若对此次OCR开发效果需要进一步优化，可联系0755-xxxxxxxx咨询精度优化方案。</p>
    </div>
    <div class="btnGBox">
      <div class="btn" @click="reviseModel">修改模板</div>
      <div class="btn" v-if="info.state!=3">撤销项目</div>
      <div class="btn" v-if="info.state==3" @click="open">立即开通</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      proofFileName: '',
      statementArr: ['需求审批中','需求审批通过，请上传样本','审核样本中','样本审核通过，请缴纳训练费用','模板开发中 (7个工作日)','开发完毕，请试用'],
      tipsBoxShow: false,
      title: '项目概览>我的自定义模板2',
      info: {
        name: '我的自定义模板2',
        page: 'xxxxx',
        date: '2018年5月12日 12:39',
        state: 1,
        desc: '模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述模板描述',
        num: '1-1000',
        month: '10',
        max: '100',
        add: 'T+1'
      }
    }
  },
  computed: {
    statement(){
      return this.statementArr[this.info.state];
    }
  },
  components: {
  },
  methods: {
    fileUpload(){},
    reviseModel(){
      this.$router.push('/OCRmodel');
    },
    open(){
      console.log('立即开通')
      this.$router.push('/orderPay')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  padding: 40px;
  border: 1px solid #f0f0f0;
}
.contentBox{
  box-sizing: border-box;
  width: 1400px;
  padding: 80px;
}
.contentBox h4{
  margin-bottom: 40px;
  font-size: 24px;
  color: #323232;
}
.row{
  margin-bottom: 20px;
  font-size: 14px;
  color: #828282;
}
.row span{
  display: inline-block;
  width: 380px;
}
.row i{
  color: #333333;
}
.state{
  position: relative;
}
.tipsBox{
  display: none;
}
.tipsWrap:hover .stateTxt{
  color: #0090ff;
}
.tipsWrap:hover .tipsBox{
  display: block;
}
.tipsBox{
  position: absolute;
  left: 0;
  top: 40px;
  min-width: 350px;
  padding: 20px;
  background: #ffffff;
  line-height: 2;
  border: 1px solid #333333;
}
.tipsBox::before{
  content: '';
  position: absolute;
  top: -2em;
  left: 4em;
  width: 0;
  height: 0;
  border: 1em solid transparent;
  border-bottom-color: #333333;
}
.tipsBox::after{
  content: '';
  position: absolute;
  top: -1.9em;
  left: 4em;
  width: 0;
  height: 0;
  border: 1em solid transparent;
  border-bottom-color: #ffffff;
}
.tipsBox p{
  font-size:14px;
  color:#828282;
}
.tipsBox .tipsBoxDone{
  color:#333333;
}
.tipsBox .tipsBoxDoing{
  color:#00c800;
}
.tipsBox .tipsBoxFail{
  color:#ff3b30;
}
.desc{
  padding-bottom: 40px;
}
.btnGBox{
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 1400px;
  padding-top: 160px;
  padding-bottom: 160px;
}
.btn{
  display: inline-block;
  text-align: center;
  height: 54px;
  line-height: 54px;
  padding: 0 20px;
  color: #ffffff;
  font-size: 24px;
  background: #0090ff;
  cursor: pointer;
}
.btn:not(:last-child){
  margin-right: 80px;
}
.btn:active{
  background: #68bdff;
}
.uploadBox{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 1400px;
  padding: 80px;
}
.issueIcon{
  position: relative;
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  margin-right: 30px;
  text-align: center;
  border: 1px solid #68bdff;
  border-radius: 15px;
  color: #68bdff;
  font-size: 20px;
}
.issueTips{
  left: -4.3em;
  top: 3em;
  font-size: 18px;
  text-align: left;
  color: #828282;
}
.proofInputBox{
  display: flex;
  flex: 1;
}
.fileNameBox{
  box-sizing: border-box;
  flex: 1;
  height: 54px;
  line-height: 54px;
  padding-left: 10px;
  border: 1px solid #aadaff;
  border-right: none;
}
.fileInputBox{
  position: relative;
  width: 130px;
  height: 54px;
  overflow: hidden;
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
.fileUploadBtn{
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 54px;
  opacity: 0;
}
.developedBox{
  padding-left: 80px;
}
.developedShowBox{
  display: flex;
  margin-bottom: 40px;
} 
.showBox{
  width: 825px;
  height: 395px;
  background: #f0f0f0;
}
.showBox:first-child{
  margin-right: 20px;
}
.developedBox p{
  line-height: 2;
}
.annotationBox{
  padding-left: 80px;
}
.annotationBox h5{
  margin-bottom: 40px;
}
.annotationBox p{
  width: 500px;
  height: 300px;
  background: #f0f0f0;
}
</style>
